import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { db } from "@/lib/db"

// Stripe SDK direto (sem proxy) para o webhook
function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-04-22.dahlia",
  })
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Configuração de webhook inválida" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch {
    return NextResponse.json({ error: "Webhook signature inválida" }, { status: 400 })
  }

  try {
    switch (event.type) {
      // ── Checkout concluído → virou PRO ──────────────────────────────────────
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId

        if (!userId || session.mode !== "subscription") break

        const subscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id

        if (!subscriptionId) break

        const subscription = await getStripe().subscriptions.retrieve(
          subscriptionId,
          { expand: ["latest_invoice"] }
        )

        const invoice = subscription.latest_invoice as Stripe.Invoice | null
        const periodEnd = invoice?.period_end
          ? new Date(invoice.period_end * 1000)
          : null

        await db.user.update({
          where: { id: userId },
          data: {
            plan: "PRO",
            stripeCustomerId: subscription.customer as string,
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0]?.price.id,
            stripeCurrentPeriodEnd: periodEnd,
          },
        })
        break
      }

      // ── Fatura paga → renova período ────────────────────────────────────────
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice

        // Pega o subscriptionId via parent.subscription_details (SDK v20+)
        const subscriptionId = (invoice as unknown as {
          parent?: { subscription_details?: { subscription?: string } }
        })?.parent?.subscription_details?.subscription ?? null

        if (!subscriptionId) break

        const subscription = await getStripe().subscriptions.retrieve(subscriptionId)

        await db.user.updateMany({
          where: { stripeSubscriptionId: subscriptionId },
          data: {
            plan: "PRO",
            stripePriceId: subscription.items.data[0]?.price.id,
            stripeCurrentPeriodEnd: invoice.period_end
              ? new Date(invoice.period_end * 1000)
              : null,
          },
        })
        break
      }

      // ── Assinatura atualizada ────────────────────────────────────────────────
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        const invoice = await getStripe().invoices.list({
          subscription: subscription.id,
          limit: 1,
        })

        const periodEnd = invoice.data[0]?.period_end
          ? new Date(invoice.data[0].period_end * 1000)
          : null

        await db.user.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            stripePriceId: subscription.items.data[0]?.price.id,
            stripeCurrentPeriodEnd: periodEnd,
          },
        })
        break
      }

      // ── Assinatura cancelada → volta para FREE ───────────────────────────────
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription

        await db.user.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            plan: "FREE",
            stripeSubscriptionId: null,
            stripePriceId: null,
            stripeCurrentPeriodEnd: null,
          },
        })
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Erro interno no webhook" }, { status: 500 })
  }
}

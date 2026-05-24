import Stripe from "stripe"

// ─── Lazy init — evita crash no build sem STRIPE_SECRET_KEY ──────────────────

let _stripe: Stripe | null = null

function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY não configurada")
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-04-22.dahlia",
    })
  }
  return _stripe
}

// Proxy: só inicializa na primeira chamada em runtime
export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return getStripe()[prop as keyof Stripe]
  },
})

// ─── Checkout Session (sem trial — cobra imediatamente) ───────────────────────

export async function createCheckoutSession({
  userId,
  userEmail,
  stripeCustomerId,
}: {
  userId: string
  userEmail: string
  stripeCustomerId?: string | null
}) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

  const session = await getStripe().checkout.sessions.create({
    mode: "subscription",
    customer: stripeCustomerId ?? undefined,
    customer_email: stripeCustomerId ? undefined : userEmail,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID_PRO!,
        quantity: 1,
      },
    ],
    // SEM trial_period_days → cobra imediatamente (upgrade durante trial)
    success_url: `${appUrl}/settings/billing?success=true`,
    cancel_url: `${appUrl}/settings/billing?canceled=true`,
    metadata: { userId },
  })

  return session
}

// ─── Customer Portal (gerenciar/cancelar assinatura) ─────────────────────────

export async function createCustomerPortalSession(stripeCustomerId: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

  const session = await getStripe().billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${appUrl}/settings/billing`,
  })

  return session
}

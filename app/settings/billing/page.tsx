import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { hasAccess, isSubscribed, isTrialActive, daysLeftInTrial } from "@/lib/subscription"
import { createCheckoutSession, createCustomerPortalSession } from "@/lib/stripe"

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; canceled?: string }>
}) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const params = await searchParams
  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user) redirect("/login")

  const active = hasAccess(user)
  const subscribed = isSubscribed(user)
  const trialActive = isTrialActive(user)
  const daysLeft = daysLeftInTrial(user)

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-1">Assinatura</h1>
        <p className="text-muted-foreground mb-8">
          Gerencie seu plano e pagamentos
        </p>

        {/* Feedback de sucesso/cancelamento */}
        {params.success && (
          <div className="mb-6 p-4 bg-primary/10 text-primary rounded-xl text-sm font-medium">
            🎉 Bem-vindo ao PRO! Seu acesso completo está ativo.
          </div>
        )}
        {params.canceled && (
          <div className="mb-6 p-4 bg-muted text-muted-foreground rounded-xl text-sm">
            Checkout cancelado. Você pode fazer upgrade quando quiser.
          </div>
        )}

        {/* Status atual */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Plano atual</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {subscribed ? "PRO" : trialActive ? `Trial (${daysLeft}d restantes)` : "FREE"}
              </p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                subscribed
                  ? "bg-primary/10 text-primary"
                  : trialActive
                  ? "bg-accent/30 text-accent-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {subscribed ? "Ativo" : trialActive ? "Trial" : "Expirado"}
            </div>
          </div>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className={active ? "text-foreground" : ""}>
              {active ? "✅" : "❌"} Álbuns ilimitados
            </li>
            <li className={active ? "text-foreground" : ""}>
              {active ? "✅" : "❌"} Exportar e imprimir álbuns
            </li>
            <li className={active ? "text-foreground" : ""}>
              {active ? "✅" : "❌"} Layouts customizados
            </li>
            <li className="text-foreground">✅ 1 álbum gratuito sempre</li>
          </ul>
        </div>

        {/* CTA */}
        {!subscribed && (
          <div className="bg-card border border-primary/20 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-1">
              Plano PRO — R$ 49/mês
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Álbuns ilimitados, exportação, layouts customizados e muito mais.
            </p>
            <form
              action={async () => {
                "use server"
                const checkoutSession = await createCheckoutSession({
                  userId: user.id,
                  userEmail: user.email!,
                  stripeCustomerId: user.stripeCustomerId,
                })
                redirect(checkoutSession.url!)
              }}
            >
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-medium py-3 px-4 rounded-xl hover:opacity-90 transition-opacity"
              >
                {trialActive ? "Fazer upgrade agora (sem perder o trial)" : "Assinar PRO"}
              </button>
            </form>
          </div>
        )}

        {/* Portal do cliente Stripe */}
        {subscribed && user.stripeCustomerId && (
          <form
            action={async () => {
              "use server"
              const portalSession = await createCustomerPortalSession(user.stripeCustomerId!)
              redirect(portalSession.url)
            }}
          >
            <button
              type="submit"
              className="w-full border border-border text-foreground font-medium py-3 px-4 rounded-xl hover:bg-muted transition-colors"
            >
              Gerenciar assinatura (cancelar, mudar cartão...)
            </button>
          </form>
        )}
      </div>
    </main>
  )
}

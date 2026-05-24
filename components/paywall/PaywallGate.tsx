"use client"

import Link from "next/link"

interface PaywallGateProps {
  children: React.ReactNode
  /** Se false, exibe o bloqueio em vez do conteúdo */
  hasAccess: boolean
  feature?: string
}

export function PaywallGate({
  children,
  hasAccess,
  feature = "este recurso",
}: PaywallGateProps) {
  if (hasAccess) return <>{children}</>

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center rounded-2xl border border-border bg-card">
      <div className="text-4xl mb-4">🔒</div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Faça upgrade para acessar
      </h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        {feature === "este recurso"
          ? "Este recurso está disponível no plano PRO."
          : `Para usar ${feature}, você precisa do plano PRO.`}
      </p>
      <Link
        href="/settings/billing"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium py-3 px-6 rounded-xl hover:opacity-90 transition-opacity"
      >
        Ver planos — R$ 49/mês
      </Link>
      <p className="text-xs text-muted-foreground mt-4">
        Cancele quando quiser. Sem multa.
      </p>
    </div>
  )
}

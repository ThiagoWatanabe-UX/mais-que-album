import type { User } from "@prisma/client"

// ─── Helpers de Assinatura ───────────────────────────────────────────────────

/** Trial ainda válido: plan === TRIAL e data não expirou */
export function isTrialActive(user: Pick<User, "plan" | "trialEndsAt">): boolean {
  if (user.plan !== "TRIAL") return false
  if (!user.trialEndsAt) return false
  return new Date(user.trialEndsAt) > new Date()
}

/** Assinante PRO com período corrente válido */
export function isSubscribed(
  user: Pick<User, "plan" | "stripeCurrentPeriodEnd">
): boolean {
  if (user.plan !== "PRO") return false
  if (!user.stripeCurrentPeriodEnd) return false
  return new Date(user.stripeCurrentPeriodEnd) > new Date()
}

/** Tem acesso: trial ativo OU assinante PRO */
export function hasAccess(
  user: Pick<User, "plan" | "trialEndsAt" | "stripeCurrentPeriodEnd">
): boolean {
  return isTrialActive(user) || isSubscribed(user)
}

/** Dias restantes no trial (0 se expirado ou não em trial) */
export function daysLeftInTrial(
  user: Pick<User, "plan" | "trialEndsAt">
): number {
  if (!isTrialActive(user) || !user.trialEndsAt) return 0
  const diff = new Date(user.trialEndsAt).getTime() - Date.now()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

// ─── Limites por plano ────────────────────────────────────────────────────────

export const PLAN_LIMITS = {
  FREE: {
    albums: 1,
    photosPerAlbum: Infinity,
    canExport: false,
  },
  TRIAL: {
    albums: Infinity,
    photosPerAlbum: Infinity,
    canExport: true,
  },
  PRO: {
    albums: Infinity,
    photosPerAlbum: Infinity,
    canExport: true,
  },
} as const

export type PlanLimit = (typeof PLAN_LIMITS)[keyof typeof PLAN_LIMITS]

/** Verifica se usuário atingiu o limite de um recurso */
export function checkUsageLimit(
  user: Pick<User, "plan" | "trialEndsAt" | "stripeCurrentPeriodEnd">,
  resource: keyof Omit<PlanLimit, "canExport">,
  currentUsage: number
): { allowed: boolean; limit: number } {
  const plan = hasAccess(user) ? user.plan : "FREE"
  const limits = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS] ?? PLAN_LIMITS.FREE
  const limit = limits[resource] as number

  return {
    allowed: currentUsage < limit,
    limit,
  }
}

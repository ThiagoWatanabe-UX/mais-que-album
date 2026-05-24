"use client"

import Link from "next/link"

interface TrialBannerProps {
  daysLeft: number
}

export function TrialBanner({ daysLeft }: TrialBannerProps) {
  if (daysLeft <= 0) return null

  const isUrgent = daysLeft <= 3

  return (
    <div
      className={`w-full py-2.5 px-4 flex items-center justify-center gap-3 text-sm ${
        isUrgent
          ? "bg-destructive text-destructive-foreground"
          : "bg-secondary text-secondary-foreground border-b border-border"
      }`}
    >
      <span>
        {isUrgent ? "⚠️" : "✨"}{" "}
        <strong>
          {daysLeft === 1
            ? "Último dia"
            : `${daysLeft} dias restantes`}
        </strong>{" "}
        no seu período gratuito.
      </span>
      <Link
        href="/settings/billing"
        className={`font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity ${
          isUrgent ? "text-destructive-foreground" : "text-primary"
        }`}
      >
        Fazer upgrade →
      </Link>
    </div>
  )
}

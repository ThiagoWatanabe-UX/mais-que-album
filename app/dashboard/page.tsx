import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { daysLeftInTrial, hasAccess, isTrialActive } from "@/lib/subscription"
import { TrialBanner } from "@/components/paywall/TrialBanner"
import { AlbumsList } from "@/components/albums/AlbumsList"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user) redirect("/login")

  const daysLeft = daysLeftInTrial(user)
  const trialActive = isTrialActive(user)
  const access = hasAccess(user)

  return (
    <div className="min-h-screen bg-background">
      {trialActive && <TrialBanner daysLeft={daysLeft} />}

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Meus Álbuns
            </h1>
            <p className="text-muted-foreground mt-1">
              Olá, {user.name?.split(" ")[0]} 👋 Transforme momentos em memórias.
            </p>
          </div>
        </div>

        <AlbumsList hasAccess={access} userId={user.id} />
      </main>
    </div>
  )
}

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { daysLeftInTrial, hasAccess, isTrialActive } from "@/lib/subscription"
import { TrialBanner } from "@/components/paywall/TrialBanner"
import { AlbumsList } from "@/components/albums/AlbumsList"
import { UserMenu } from "@/components/dashboard/UserMenu"
import { BookHeart } from "lucide-react"
import Link from "next/link"

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

      {/* Header do dashboard */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-foreground">
            <BookHeart className="w-5 h-5 text-primary" />
            <span className="text-sm">Mais que Album</span>
          </Link>
          <UserMenu
            name={user.name}
            email={user.email}
            image={user.image}
          />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Meus Álbuns</h1>
          <p className="text-muted-foreground mt-1">
            Olá, {user.name?.split(" ")[0]} 👋 Transforme momentos em memórias.
          </p>
        </div>

        <AlbumsList hasAccess={access} userId={user.id} />
      </main>
    </div>
  )
}

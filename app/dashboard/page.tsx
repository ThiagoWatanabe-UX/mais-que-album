import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) redirect("/login")

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Olá, {session.user.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-muted-foreground mb-8">
          Bem-vindo ao Mais que Album
        </p>

        <div className="bg-card border border-border rounded-2xl p-6">
          <p className="text-sm text-muted-foreground">
            Plano atual:{" "}
            <span className="text-primary font-semibold">
              {session.user.plan}
            </span>
          </p>
        </div>
      </div>
    </main>
  )
}

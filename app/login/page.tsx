import { signIn } from "@/lib/auth"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>
}) {
  const session = await auth()
  const params = await searchParams

  if (session?.user) {
    redirect(params.callbackUrl || "/dashboard")
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-primary">Mais que Album</h1>
          <p className="text-muted-foreground mt-2">
            Transforme momentos em memórias
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-2 text-center">
            Entrar na sua conta
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-8">
            Tradições com propósito
          </p>

          {params.error && (
            <div className="mb-6 p-3 bg-destructive/10 text-destructive text-sm rounded-lg text-center">
              Erro ao entrar. Tente novamente.
            </div>
          )}

          {/* Google OAuth */}
          <form
            action={async () => {
              "use server"
              await signIn("google", {
                redirectTo: params.callbackUrl || "/dashboard",
              })
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-white border border-border text-foreground font-medium py-3 px-4 rounded-xl hover:bg-secondary transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuar com Google
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">ou</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Magic Link */}
          <form
            action={async (formData: FormData) => {
              "use server"
              const email = formData.get("email") as string
              await signIn("resend", {
                email,
                redirectTo: params.callbackUrl || "/dashboard",
              })
            }}
          >
            <div className="mb-3">
              <input
                name="email"
                type="email"
                placeholder="seu@email.com"
                required
                className="w-full border border-input bg-background text-foreground placeholder:text-muted-foreground py-3 px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-medium py-3 px-4 rounded-xl hover:opacity-90 transition-opacity"
            >
              Enviar link mágico
            </button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Ao entrar, você concorda com nossos{" "}
            <a href="/terms" className="underline hover:text-foreground">
              Termos de Uso
            </a>
          </p>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Primeiro acesso? Ganhe{" "}
          <span className="text-primary font-semibold">14 dias grátis</span> ✨
        </p>
      </div>
    </main>
  )
}

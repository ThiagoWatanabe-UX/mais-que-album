import Link from "next/link"
import { BookHeart } from "lucide-react"

export function LandingFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
              <BookHeart className="w-5 h-5 text-primary" />
              Mais que Album
            </Link>
            <p className="text-xs text-muted-foreground">
              Transforme momentos em memórias físicas.
            </p>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/login" className="hover:text-foreground transition-colors">
              Entrar
            </Link>
            <a href="#precos" className="hover:text-foreground transition-colors">
              Preços
            </a>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacidade
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Termos
            </Link>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {year} Mais que Album. Feito com carinho no Brasil. 🌷
        </div>
      </div>
    </footer>
  )
}

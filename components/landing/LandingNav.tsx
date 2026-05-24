import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookHeart } from "lucide-react"

export function LandingNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-semibold text-foreground">
          <BookHeart className="w-6 h-6 text-primary" />
          <span className="text-base">Mais que Album</span>
        </Link>

        {/* Links centrais */}
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#recursos" className="hover:text-foreground transition-colors">Recursos</a>
          <a href="#como-funciona" className="hover:text-foreground transition-colors">Como funciona</a>
          <a href="#precos" className="hover:text-foreground transition-colors">Preços</a>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-sm">
              Entrar
            </Button>
          </Link>
          <Link href="/login">
            <Button size="sm" className="text-sm gap-1.5">
              Começar grátis
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}

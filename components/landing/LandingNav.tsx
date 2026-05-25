import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookHeart } from "lucide-react"

export function LandingNav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-semibold text-white">
          <BookHeart className="w-6 h-6 text-primary" />
          <span className="text-base">Mais que Album</span>
        </Link>

        {/* Links centrais */}
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#recursos" className="hover:text-white transition-colors">Recursos</a>
          <a href="#como-funciona" className="hover:text-white transition-colors">Como funciona</a>
          <a href="#precos" className="hover:text-white transition-colors">Preços</a>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-sm text-white/70 hover:text-white hover:bg-white/10">
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

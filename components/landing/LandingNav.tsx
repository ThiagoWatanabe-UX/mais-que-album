"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookHeart, Menu, X } from "lucide-react"

export function LandingNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-semibold text-white">
          <BookHeart className="w-6 h-6 text-primary" />
          <span className="text-base">Mais que Album</span>
        </Link>

        {/* Links centrais — só desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#recursos"       className="hover:text-white transition-colors">Recursos</a>
          <a href="#como-funciona"  className="hover:text-white transition-colors">Como funciona</a>
          <a href="#precos"         className="hover:text-white transition-colors">Preços</a>
        </div>

        {/* CTAs — só desktop */}
        <div className="hidden md:flex items-center gap-3">
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

        {/* Hambúrguer — só mobile */}
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white hover:bg-white/10 transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Menu mobile — slide-down */}
      {open && (
        <div className="md:hidden absolute top-16 left-0 right-0 border-t border-white/10 bg-[#080305]/96 backdrop-blur-xl px-6 py-4 flex flex-col">
          {[
            { href: "#recursos",      label: "Recursos" },
            { href: "#como-funciona", label: "Como funciona" },
            { href: "#precos",        label: "Preços" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3.5 text-sm text-white/70 hover:text-white transition-colors border-b border-white/5 last:border-0"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-4 flex flex-col gap-2.5">
            <Link href="/login" onClick={() => setOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full text-sm text-white/70 hover:text-white hover:bg-white/10">
                Entrar
              </Button>
            </Link>
            <Link href="/login" onClick={() => setOpen(false)}>
              <Button size="sm" className="w-full text-sm">
                Começar grátis
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

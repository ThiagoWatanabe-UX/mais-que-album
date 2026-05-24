"use client"

import { useState, useRef, useEffect } from "react"
import { LogOut, ChevronDown, User } from "lucide-react"

interface UserMenuProps {
  name: string | null | undefined
  email: string | null | undefined
  image: string | null | undefined
}

export function UserMenu({ name, email, image }: UserMenuProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  /* Fecha ao clicar fora */
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  const initials = name
    ? name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "?"

  return (
    <div ref={menuRef} className="relative">
      {/* Botão do avatar */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
      >
        {/* Avatar */}
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={name ?? ""} className="w-6 h-6 rounded-full object-cover" />
        ) : (
          <span className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold">
            {initials}
          </span>
        )}
        <span className="hidden sm:block max-w-28 truncate">{name ?? email}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-card shadow-lg shadow-black/10 py-1 z-50">
          {/* Info do usuário */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2.5">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt="" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <span className="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold">
                  {initials}
                </span>
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{name}</p>
                <p className="text-xs text-muted-foreground truncate">{email}</p>
              </div>
            </div>
          </div>

          {/* Perfil */}
          <div className="py-1">
            <a
              href="/settings/billing"
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
              onClick={() => setOpen(false)}
            >
              <User className="w-4 h-4 text-muted-foreground" />
              Minha assinatura
            </a>
          </div>

          {/* Logout */}
          <div className="border-t border-border py-1">
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-destructive hover:bg-destructive/8 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sair da conta
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

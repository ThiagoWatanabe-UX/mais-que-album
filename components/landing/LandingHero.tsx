"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

/* ─── Fotos de memórias que flutuam no fundo ─────────────────────────────── */
const MEMORIES = [
  { id: 10, seed: "travel1",  w: 220, h: 280, x: "8%",   y: "12%", rotate: -8,  depth: 0.04, delay: 0 },
  { id: 11, seed: "family2",  w: 180, h: 240, x: "78%",  y: "6%",  rotate: 6,   depth: 0.06, delay: 200 },
  { id: 12, seed: "beach3",   w: 200, h: 260, x: "85%",  y: "55%", rotate: -4,  depth: 0.03, delay: 400 },
  { id: 13, seed: "paris4",   w: 160, h: 200, x: "2%",   y: "60%", rotate: 9,   depth: 0.07, delay: 100 },
  { id: 14, seed: "nature5",  w: 190, h: 250, x: "60%",  y: "72%", rotate: -6,  depth: 0.05, delay: 300 },
  { id: 15, seed: "kids6",    w: 170, h: 220, x: "22%",  y: "74%", rotate: 5,   depth: 0.04, delay: 500 },
]

export function LandingHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  /* Fade-in on mount */
  useEffect(() => { setTimeout(() => setVisible(true), 100) }, [])

  /* Rastrear posição do mouse (0–1) */
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect()
      setMouse({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }

    el.addEventListener("mousemove", onMove)
    return () => el.removeEventListener("mousemove", onMove)
  }, [])

  const spotX = `${mouse.x * 100}%`
  const spotY = `${mouse.y * 100}%`

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden select-none"
      style={{
        background: "linear-gradient(160deg, #0f0608 0%, #1a0a10 40%, #0d0408 100%)",
      }}
    >
      {/* ── Spotlight que segue o mouse ──────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0.3,
          background: `radial-gradient(ellipse 600px 500px at ${spotX} ${spotY},
            rgba(200,82,119,0.18) 0%,
            rgba(255,184,160,0.06) 40%,
            transparent 70%)`,
        }}
      />

      {/* ── Grade sutil de fundo ─────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,82,119,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(200,82,119,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Fotos de memórias flutuantes ─────────────────────────────────── */}
      {MEMORIES.map((m) => {
        const offsetX = (mouse.x - 0.5) * 80 * m.depth * (hovered ? 1 : 0)
        const offsetY = (mouse.y - 0.5) * 60 * m.depth * (hovered ? 1 : 0)
        return (
          <div
            key={m.id}
            className="absolute rounded-xl overflow-hidden shadow-2xl border border-white/10"
            style={{
              left: m.x,
              top: m.y,
              width: m.w,
              height: m.h,
              transform: `rotate(${m.rotate}deg) translate(${offsetX}px, ${offsetY}px)`,
              transition: `transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94),
                           opacity 0.8s ease ${m.delay}ms`,
              opacity: hovered ? 1 : 0,
              willChange: "transform, opacity",
              zIndex: 1,
            }}
          >
            {/* Overlay gradiente sobre a foto */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <Image
              src={`https://picsum.photos/seed/${m.seed}/${m.w}/${m.h}`}
              alt="Memória"
              fill
              className="object-cover"
              sizes={`${m.w}px`}
              unoptimized
            />
          </div>
        )
      })}

      {/* ── Brilho de linha horizontal ───────────────────────────────────── */}
      <div
        className="pointer-events-none absolute left-0 right-0 h-px"
        style={{
          top: `${mouse.y * 100}%`,
          background: `linear-gradient(90deg, transparent 0%, rgba(200,82,119,${hovered ? 0.4 : 0.1}) 50%, transparent 100%)`,
          transition: "top 0.1s linear, opacity 0.3s ease",
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* ── Conteúdo principal ───────────────────────────────────────────── */}
      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
        }}
      >
        {/* Badge */}
        <div className="mb-7 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Crie álbuns físicos em minutos
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
          <span className="text-white">Seus momentos</span>
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #C85277 0%, #FFB8A0 50%, #C85277 100%)",
              backgroundSize: "200% auto",
              animation: "gradientShift 4s ease infinite",
            }}
          >
            merecem mais
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="text-lg md:text-xl text-white/50 max-w-xl mx-auto leading-relaxed mb-10">
          Organize fotos por dia e momento, monte páginas com layouts bonitos
          e peça a impressão do seu álbum físico.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/login">
            <Button
              size="lg"
              className="h-13 px-8 text-base gap-2 font-semibold"
              style={{
                background: "linear-gradient(135deg, #C85277 0%, #e8698a 100%)",
                boxShadow: "0 0 32px rgba(200,82,119,0.4), 0 4px 16px rgba(0,0,0,0.3)",
                border: "1px solid rgba(200,82,119,0.5)",
              }}
            >
              Criar meu álbum grátis
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <a href="#como-funciona">
            <Button
              variant="ghost"
              size="lg"
              className="h-13 px-8 text-base text-white/60 hover:text-white hover:bg-white/5"
            >
              Ver como funciona
            </Button>
          </a>
        </div>

        {/* Prova social */}
        <p className="mt-6 text-sm text-white/30">
          Sem cartão de crédito · 1 álbum grátis para sempre
        </p>

        {/* Dica de interação */}
        <p
          className="mt-8 text-xs text-white/20 tracking-widest uppercase"
          style={{
            opacity: hovered ? 0 : 1,
            transition: "opacity 0.4s ease",
          }}
        >
          ✦ passe o mouse para ver as memórias ✦
        </p>
      </div>

      {/* ── Gradiente de rodapé ──────────────────────────────────────────── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* ── Animação CSS ─────────────────────────────────────────────────── */}
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% center; }
          50%  { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
      `}</style>
    </section>
  )
}

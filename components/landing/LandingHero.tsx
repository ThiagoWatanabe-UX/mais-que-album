"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

/* ─── Config do efeito ────────────────────────────────────────────────────── */
const REVEAL_RADIUS  = 300    // px — raio de revelação ao redor do cursor
const TRAIL_HOLD_MS  = 1000   // ms — quanto tempo a foto fica acesa após o cursor sair
const TRAIL_FADE_MS  = 2000   // ms — quanto tempo para sumir completamente
const LERP_IN        = 0.14   // velocidade de aparecer
const LERP_OUT       = 0.0525 // velocidade de sumir (50% mais rápido)

/* ─── Gerador determinístico (mesmo resultado em SSR e client) ────────────── */
function makeLCG(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0
    return s / 0x100000000
  }
}

const rng = makeLCG(2024)

/* ─── Grade densa de fotos: 10 colunas × 8 linhas = 80 fotos ─────────────── */
const COLS = 10
const ROWS = 8

type Img = {
  id: number
  seed: string
  leftPct: number
  topPct: number
  w: number
  h: number
  rotate: number
}

const IMAGES: Img[] = Array.from({ length: COLS * ROWS }, (_, i) => ({
  id: i,
  seed: `r${(i * 17 + 3).toString(36)}`,
  leftPct: (i % COLS) * (100 / COLS) + (rng() - 0.5) * 6,
  topPct:  Math.floor(i / COLS) * (100 / ROWS) + (rng() - 0.5) * 7,
  w:       160 + Math.round(rng() * 90),
  h:       200 + Math.round(rng() * 110),
  rotate:  (rng() - 0.5) * 24,
}))

/* ─── Componente ──────────────────────────────────────────────────────────── */
export function LandingHero() {
  const containerRef    = useRef<HTMLDivElement>(null)
  const imgRefs         = useRef<(HTMLDivElement | null)[]>([])
  const opacities       = useRef(new Float32Array(IMAGES.length))
  const lastNear        = useRef(new Float32Array(IMAGES.length))
  const mouseRef        = useRef({ x: -9999, y: -9999 })
  const rectRef         = useRef({ left: 0, top: 0, w: 1, h: 1 })
  const rafRef           = useRef<number>(0)
  const hintRef          = useRef<HTMLParagraphElement>(null)
  const everMoved        = useRef(false)
  /* Opacidade mínima por imagem — usada no mobile para fotos estáticas */
  const mobileFloor      = useRef(new Float32Array(IMAGES.length))
  /* Container das fotos — no mobile, a opacidade dele cai ao scrollar */
  const photoLayerRef    = useRef<HTMLDivElement>(null)

  /* Atualizar rect do container */
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => {
      const r = el.getBoundingClientRect()
      rectRef.current = { left: r.left, top: r.top, w: r.width, h: r.height }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  /* Mobile: fotos estáticas + scroll fade ─────────────────────────────────── */
  useEffect(() => {
    const isTouch = navigator.maxTouchPoints > 0 || "ontouchstart" in window
    if (!isTouch) return

    /* Esconde dica de mouse no mobile */
    if (hintRef.current) hintRef.current.style.display = "none"

    /* Pré-revela ~65% das fotos espalhadas pela grade com opacidades variadas */
    IMAGES.forEach((_, i) => {
      if (i % 3 === 2) return // pula ~33% das fotos para criar respiros
      const baseOp = 0.28 + ((i * 11 + 3) % 14) * 0.030 // 0.28 → 0.67
      mobileFloor.current[i] = baseOp
      opacities.current[i]   = baseOp
      if (imgRefs.current[i]) {
        imgRefs.current[i]!.style.opacity = baseOp.toFixed(3)
      }
    })

    /* Scroll: fade do layer de fotos conforme o usuário desce */
    const photoLayer = photoLayerRef.current
    const hero       = containerRef.current
    if (!photoLayer || !hero) return

    const onScroll = () => {
      const heroH    = hero.offsetHeight
      // Começa o fade a partir de 5% do hero, conclui em 55%
      const progress = Math.max(0, Math.min(1, (window.scrollY - heroH * 0.05) / (heroH * 0.50)))
      photoLayer.style.opacity = (1 - progress).toFixed(3)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* Rastrear mouse — desktop apenas (filtra touch/pen via pointerType) ────── */
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return   // ignora touch e caneta
      const { left, top } = rectRef.current
      mouseRef.current = { x: e.clientX - left, y: e.clientY - top }
      if (!everMoved.current) {
        everMoved.current = true
        if (hintRef.current) hintRef.current.style.opacity = "0"
      }
    }
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      mouseRef.current = { x: -9999, y: -9999 }
    }

    el.addEventListener("pointermove",  onMove)
    el.addEventListener("pointerleave", onLeave)
    return () => {
      el.removeEventListener("pointermove",  onMove)
      el.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  /* Loop de animação (desktop: mouse-driven / mobile: mantém mobileFloor) ── */
  useEffect(() => {
    const loop = () => {
      const now = performance.now()
      const { x: mx, y: my } = mouseRef.current
      const { w: cw, h: ch } = rectRef.current

      IMAGES.forEach((img, i) => {
        const el = imgRefs.current[i]
        if (!el) return

        const cx = (img.leftPct / 100) * cw + img.w / 2
        const cy = (img.topPct  / 100) * ch + img.h / 2
        const dist = Math.hypot(mx - cx, my - cy)

        let target = 0

        if (dist < REVEAL_RADIUS) {
          target = 1
          lastNear.current[i] = now
        } else if (dist < REVEAL_RADIUS * 1.6) {
          const t = 1 - (dist - REVEAL_RADIUS) / (REVEAL_RADIUS * 0.6)
          target = t
          if (target > 0.4) lastNear.current[i] = now
        }

        if (target < 0.01 && lastNear.current[i] > 0) {
          const elapsed = now - lastNear.current[i]
          if (elapsed < TRAIL_HOLD_MS) {
            target = 0.9
          } else if (elapsed < TRAIL_HOLD_MS + TRAIL_FADE_MS) {
            const t = 1 - (elapsed - TRAIL_HOLD_MS) / TRAIL_FADE_MS
            target = 0.9 * t
          }
        }

        /* No mobile, fotos nunca somem abaixo do piso pré-revelado */
        const effectiveTarget = Math.max(target, mobileFloor.current[i])

        const curr  = opacities.current[i]
        const speed = effectiveTarget > curr ? LERP_IN : LERP_OUT
        const next  = curr + (effectiveTarget - curr) * speed
        opacities.current[i] = next

        if (Math.abs(next - curr) > 0.001) {
          el.style.opacity = next.toFixed(3)
        }
      })

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[94vh] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#080305" }}
    >
      {/* Grade de fotos — opacidade controlada pelo scroll no mobile */}
      <div
        ref={photoLayerRef}
        className="absolute inset-0 pointer-events-none"
        style={{ transition: "opacity 0.15s ease" }}
        aria-hidden
      >
        {IMAGES.map((img, i) => (
          <div
            key={img.id}
            ref={(el) => { imgRefs.current[i] = el }}
            className="absolute rounded-lg overflow-hidden shadow-2xl"
            style={{
              left:       `${img.leftPct}%`,
              top:        `${img.topPct}%`,
              width:      img.w,
              height:     img.h,
              transform:  `rotate(${img.rotate}deg)`,
              opacity:    0,
              willChange: "opacity",
              zIndex:     Math.round((1 / img.w) * 1000),
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/${img.seed}/${img.w}/${img.h}`}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
          </div>
        ))}
      </div>

      {/* Overlay escuro base — garante legibilidade do texto */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(8,3,5,0.45)", zIndex: 20 }}
      />

      {/* Conteúdo */}
      <div className="relative text-center px-6 max-w-4xl mx-auto" style={{ zIndex: 30 }}>
        {/* Badge */}
        <div className="mb-7 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs sm:text-sm font-medium text-white/80 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
            Crie álbuns físicos em minutos
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
          <span className="text-white">Eternize seus momentos</span>
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #C85277 0%, #FFB8A0 50%, #C85277 100%)",
              backgroundSize:  "200% auto",
              animation:       "gradShift 4s ease infinite",
            }}
          >
            para sempre
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="text-base sm:text-lg md:text-xl text-white/50 max-w-xl mx-auto leading-relaxed mb-10">
          Organize fotos por dia e momento, monte páginas com layouts bonitos
          e peça a impressão do seu álbum físico.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/login" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto h-13 px-8 text-base gap-2 font-semibold"
              style={{
                background: "linear-gradient(135deg, #C85277 0%, #e8698a 100%)",
                boxShadow:  "0 0 32px rgba(200,82,119,0.45), 0 4px 16px rgba(0,0,0,0.4)",
                border:     "1px solid rgba(200,82,119,0.5)",
              }}
            >
              Criar meu álbum grátis
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <a href="#como-funciona" className="w-full sm:w-auto">
            <Button
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto h-13 px-8 text-base text-white/60 hover:text-white hover:bg-white/5 backdrop-blur-sm"
            >
              Ver como funciona
            </Button>
          </a>
        </div>

        <p className="mt-6 text-xs sm:text-sm text-white/30">
          Sem cartão de crédito · 1 álbum grátis para sempre
        </p>

        {/* Dica de mouse — visível apenas no desktop */}
        <p
          ref={hintRef}
          className="mt-10 text-xs text-white/25 tracking-[0.2em] uppercase"
          style={{ transition: "opacity 0.6s ease" }}
        >
          ✦ mova o mouse para revelar as memórias ✦
        </p>
      </div>

      {/* Gradiente de transição para a próxima seção */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, var(--background) 100%)",
          zIndex: 35,
        }}
      />

      <style>{`
        @keyframes gradShift {
          0%   { background-position: 0% center; }
          50%  { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
      `}</style>
    </section>
  )
}

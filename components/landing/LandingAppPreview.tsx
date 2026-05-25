"use client"

import { useState } from "react"
import { BookOpen, Images, LayoutGrid } from "lucide-react"

const SCREENS = [
  {
    id: "dashboard",
    label: "Seus álbuns",
    icon: BookOpen,
    description: "Todos os seus projetos em um lugar",
    mockup: <DashboardMockup />,
  },
  {
    id: "photos",
    label: "Adicionar fotos",
    icon: Images,
    description: "Upload com drag & drop, organize por momento",
    mockup: <PhotosMockup />,
  },
  {
    id: "pages",
    label: "Montar páginas",
    icon: LayoutGrid,
    description: "Escolha layouts e posicione suas fotos",
    mockup: <PagesMockup />,
  },
]

export function LandingAppPreview() {
  const [active, setActive] = useState("dashboard")
  const screen = SCREENS.find((s) => s.id === active)!

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho */}
        <div className="text-center mb-10 md:mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            O app
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            Simples assim
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Uma experiência pensada para quem não tem tempo a perder.
          </p>
        </div>

        {/* Tabs de navegação */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {SCREENS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                active === s.id
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
            >
              <s.icon className="w-3.5 h-3.5 shrink-0" />
              {s.label}
            </button>
          ))}
        </div>

        {/* Mockup — browser window */}
        <div className="relative mx-auto max-w-4xl">
          <div className="rounded-xl sm:rounded-2xl border border-border/60 shadow-2xl shadow-black/10 overflow-hidden bg-card">
            {/* Barra de título */}
            <div className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 sm:py-3 bg-muted/60 border-b border-border/60">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400/60 shrink-0" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400/60 shrink-0" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400/60 shrink-0" />
              <div className="ml-3 flex-1 h-4 sm:h-5 rounded-full bg-border/60 max-w-[200px] sm:max-w-xs flex items-center px-2 sm:px-3 overflow-hidden">
                <span className="text-[9px] sm:text-[10px] text-muted-foreground truncate">
                  maisquealbum.com.br/dashboard
                </span>
              </div>
            </div>

            {/* Tela do app */}
            <div
              key={active}
              className="w-full"
              style={{ animation: "fadeSlide 0.3s ease" }}
            >
              {screen.mockup}
            </div>
          </div>

          {/* Legenda */}
          <p className="text-center text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4">
            {screen.description}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

/* ─── Mockup 1: Dashboard de álbuns ──────────────────────────────────────── */
function DashboardMockup() {
  const albums = [
    {
      title: "Viagem para Lisboa 2024",
      photos: 47, pages: 12, status: "Pronto",
      seeds: [10, 11, 14, 19],
    },
    {
      title: "Nascimento da Isabela",
      photos: 83, pages: 20, status: "Rascunho",
      seeds: [64, 433, 338, 334],
    },
    {
      title: "Natal em Família",
      photos: 32, pages: 8, status: "Rascunho",
      seeds: [30, 431, 17, 28],
    },
  ]

  return (
    <div className="p-4 sm:p-6 bg-background">
      {/* Topbar */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <div className="text-xs sm:text-base font-semibold text-foreground">Meus álbuns</div>
          <div className="text-[10px] sm:text-xs text-muted-foreground">3 álbuns · plano PRO</div>
        </div>
        <div className="h-7 sm:h-8 rounded-lg bg-primary px-2.5 sm:px-4 flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-medium text-primary-foreground shrink-0">
          <span>+</span>
          <span className="hidden sm:inline">Novo álbum</span>
          <span className="sm:hidden">Novo</span>
        </div>
      </div>

      {/* Cards — 1 col mobile, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {albums.map((a, i) => (
          /* No mobile, esconde o 3º álbum para não ficar comprido demais */
          <div
            key={i}
            className={`rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-shadow ${i === 2 ? "hidden sm:block" : ""}`}
          >
            {/* Thumbnail 2×2 */}
            <div className="w-full h-24 sm:h-28 grid grid-cols-2 gap-px bg-border/40">
              {a.seeds.map((seed) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={seed}
                  src={`https://picsum.photos/seed/${seed}/200/120`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ))}
            </div>
            <div className="p-2.5 sm:p-3">
              <div className="text-[11px] sm:text-xs font-semibold text-foreground mb-1 line-clamp-1">
                {a.title}
              </div>
              <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-muted-foreground">
                <span>{a.photos} fotos</span>
                <span>·</span>
                <span>{a.pages} págs</span>
              </div>
              <div className={`mt-1.5 inline-flex items-center rounded-full px-2 py-0.5 text-[9px] sm:text-[10px] font-medium ${
                a.status === "Pronto"
                  ? "bg-green-100 text-green-700"
                  : "bg-muted text-muted-foreground"
              }`}>
                {a.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Mockup 2: Grid de fotos ────────────────────────────────────────────── */
function PhotosMockup() {
  const photos = [
    { seed: 10,  label: "Torre de Belém",     selected: true  },
    { seed: 11,  label: "Rio Tejo",            selected: false },
    { seed: 14,  label: "Alfama ao entardecer",selected: true  },
    { seed: 19,  label: "Pôr do sol",          selected: false },
    { seed: 22,  label: "Pastéis de Belém",    selected: false },
    { seed: 25,  label: "Tram 28",             selected: true  },
    { seed: 27,  label: "Castelo de São Jorge",selected: false },
    { seed: 29,  label: "Sintra",              selected: false },
  ]

  return (
    <div className="p-4 sm:p-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div>
          <div className="text-xs sm:text-sm font-semibold text-foreground">
            Viagem para Lisboa 2024
          </div>
          <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
            3 fotos selecionadas
          </div>
        </div>
        <div className="h-7 rounded-lg border border-dashed border-primary/50 px-2 sm:px-3 flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-primary shrink-0">
          <span>↑</span>
          <span className="hidden sm:inline">Adicionar fotos</span>
          <span className="sm:hidden">Adicionar</span>
        </div>
      </div>

      {/* Drop zone */}
      <div className="rounded-xl border-2 border-dashed border-primary/20 bg-primary/3 p-2.5 sm:p-3 mb-3 sm:mb-4 text-center text-[10px] sm:text-xs text-muted-foreground">
        Arraste suas fotos aqui ou clique para selecionar
      </div>

      {/* Grid — 2 col mobile, 4 col desktop. Mobile mostra só 4 fotos */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
        {photos.map((p, idx) => (
          <div
            key={p.seed}
            className={`aspect-square rounded-lg overflow-hidden relative group cursor-pointer ${idx >= 4 ? "hidden sm:block" : ""}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/${p.seed}/200/200`}
              alt={p.label}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Selecionada */}
            {p.selected && (
              <div className="absolute inset-0 bg-primary/30 flex items-start justify-end p-1 sm:p-1.5">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
            {/* Label hover */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-1 sm:p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-[8px] sm:text-[9px] text-white line-clamp-1">{p.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Mockup 3: Editor de páginas ────────────────────────────────────────── */
function PagesMockup() {
  return (
    <div className="p-4 sm:p-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="text-xs sm:text-sm font-semibold text-foreground">Montar páginas</div>
        {/* Botões de layout — no mobile mostra só 2 */}
        <div className="flex gap-1 sm:gap-1.5">
          {["1 foto", "2 fotos", "4 fotos", "Colagem"].map((l, i) => (
            <div
              key={l}
              className={`h-6 sm:h-7 rounded-lg px-1.5 sm:px-2.5 flex items-center text-[9px] sm:text-[11px] font-medium shrink-0 ${
                l === "2 fotos"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              } ${i >= 2 ? "hidden sm:flex" : ""}`}
            >
              + {l}
            </div>
          ))}
        </div>
      </div>

      {/* Páginas */}
      <div className="space-y-2.5 sm:space-y-3">
        {/* Página 1 — 1 foto */}
        <div className="rounded-xl border border-border bg-card p-2.5 sm:p-3">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[10px] sm:text-xs font-medium text-foreground">Página 1</span>
            <span className="text-[9px] sm:text-[10px] bg-muted px-1.5 sm:px-2 py-0.5 rounded-full text-muted-foreground">1 foto</span>
          </div>
          <div className="h-16 sm:h-24 rounded-lg overflow-hidden relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/seed/10/800/200"
              alt="Torre de Belém"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1.5 sm:p-2">
              <span className="text-[9px] sm:text-[10px] text-white/90 font-medium">Torre de Belém</span>
            </div>
          </div>
        </div>

        {/* Página 2 — 2 fotos */}
        <div className="rounded-xl border border-primary/30 bg-card p-2.5 sm:p-3 shadow-sm">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[10px] sm:text-xs font-medium text-foreground">Página 2</span>
            <span className="text-[9px] sm:text-[10px] bg-primary/10 text-primary px-1.5 sm:px-2 py-0.5 rounded-full">2 fotos</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <div className="h-16 sm:h-24 rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://picsum.photos/seed/14/400/200" alt="Alfama" className="w-full h-full object-cover" />
            </div>
            <div className="h-16 sm:h-24 rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://picsum.photos/seed/19/400/200" alt="Pôr do sol" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Página 3 — 4 fotos — escondida no mobile para não ficar comprido */}
        <div className="hidden sm:block rounded-xl border border-border bg-card p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-foreground">Página 3</span>
            <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">4 fotos</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[22, 25, 27, 29].map((seed) => (
              <div key={seed} className="h-20 rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${seed}/400/160`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

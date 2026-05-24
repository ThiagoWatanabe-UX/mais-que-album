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
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            O app
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simples assim
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Uma experiência pensada para quem não tem tempo a perder.
          </p>
        </div>

        {/* Tabs de navegação */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {SCREENS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === s.id
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
            >
              <s.icon className="w-3.5 h-3.5" />
              {s.label}
            </button>
          ))}
        </div>

        {/* Mockup */}
        <div className="relative mx-auto max-w-4xl">
          {/* Janela de browser */}
          <div className="rounded-2xl border border-border/60 shadow-2xl shadow-black/10 overflow-hidden bg-card">
            {/* Barra de título */}
            <div className="flex items-center gap-1.5 px-4 py-3 bg-muted/60 border-b border-border/60">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <div className="w-3 h-3 rounded-full bg-green-400/60" />
              <div className="ml-4 flex-1 h-5 rounded-full bg-border/60 max-w-xs flex items-center px-3">
                <span className="text-[10px] text-muted-foreground">maisquealbum.com.br/dashboard</span>
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
          <p className="text-center text-sm text-muted-foreground mt-4">
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
      photos: 47,
      pages: 12,
      status: "Pronto",
      seeds: [10, 11, 14, 19],
    },
    {
      title: "Nascimento da Isabela",
      photos: 83,
      pages: 20,
      status: "Rascunho",
      seeds: [64, 433, 338, 334],
    },
    {
      title: "Natal em Família",
      photos: 32,
      pages: 8,
      status: "Rascunho",
      seeds: [30, 431, 17, 28],
    },
  ]

  return (
    <div className="p-6 min-h-[420px] bg-background">
      {/* Topbar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-base font-semibold text-foreground">Meus álbuns</div>
          <div className="text-xs text-muted-foreground">3 álbuns · plano PRO</div>
        </div>
        <div className="h-8 rounded-lg bg-primary px-4 flex items-center gap-1.5 text-xs font-medium text-primary-foreground">
          <span>+</span> Novo álbum
        </div>
      </div>

      {/* Cards de álbuns */}
      <div className="grid grid-cols-3 gap-4">
        {albums.map((a, i) => (
          <div key={i} className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-shadow">
            {/* Thumbnail com grade 2×2 de fotos reais */}
            <div className="w-full h-28 grid grid-cols-2 gap-px bg-border/40">
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
            <div className="p-3">
              <div className="text-xs font-semibold text-foreground mb-1 line-clamp-1">{a.title}</div>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span>{a.photos} fotos</span>
                <span>·</span>
                <span>{a.pages} páginas</span>
              </div>
              <div className={`mt-2 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                a.status === "Pronto" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
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
    <div className="p-6 min-h-[420px] bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm font-semibold text-foreground">Viagem para Lisboa 2024</div>
          <div className="text-xs text-muted-foreground mt-0.5">3 fotos selecionadas</div>
        </div>
        <div className="h-7 rounded-lg border border-dashed border-primary/50 px-3 flex items-center gap-1.5 text-xs text-primary cursor-pointer hover:bg-primary/5 transition-colors">
          <span>↑</span> Adicionar fotos
        </div>
      </div>

      {/* Drop zone hint */}
      <div className="rounded-xl border-2 border-dashed border-primary/20 bg-primary/3 p-3 mb-4 text-center text-xs text-muted-foreground">
        Arraste suas fotos aqui ou clique para selecionar
      </div>

      {/* Grid de fotos */}
      <div className="grid grid-cols-4 gap-2">
        {photos.map((p) => (
          <div key={p.seed} className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/${p.seed}/200/200`}
              alt={p.label}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Overlay de seleção */}
            {p.selected && (
              <div className="absolute inset-0 bg-primary/30 flex items-start justify-end p-1.5">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
            {/* Label no hover */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-[9px] text-white line-clamp-1">{p.label}</p>
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
    <div className="p-6 min-h-[420px] bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-semibold text-foreground">Montar páginas</div>
        <div className="flex gap-1.5">
          {["1 foto", "2 fotos", "4 fotos", "Colagem"].map((l) => (
            <div
              key={l}
              className={`h-7 rounded-lg px-2.5 flex items-center text-[11px] font-medium ${
                l === "2 fotos"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              + {l}
            </div>
          ))}
        </div>
      </div>

      {/* Páginas */}
      <div className="space-y-3">
        {/* Página 1 — 1 foto destaque */}
        <div className="rounded-xl border border-border bg-card p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-foreground">Página 1</span>
            <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">1 foto</span>
          </div>
          <div className="h-24 rounded-lg overflow-hidden relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/seed/10/800/200"
              alt="Torre de Belém"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
              <span className="text-[10px] text-white/90 font-medium">Torre de Belém</span>
            </div>
          </div>
        </div>

        {/* Página 2 — 2 fotos */}
        <div className="rounded-xl border border-primary/30 bg-card p-3 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-foreground">Página 2</span>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">2 fotos</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-24 rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/14/400/200"
                alt="Alfama"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-24 rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/19/400/200"
                alt="Pôr do sol"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Página 3 — 4 fotos */}
        <div className="rounded-xl border border-border bg-card p-3">
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

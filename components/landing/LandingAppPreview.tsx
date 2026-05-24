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
    { title: "Viagem para Lisboa 2024", photos: 47, pages: 12, status: "Pronto" },
    { title: "Nascimento da Isabela", photos: 83, pages: 20, status: "Rascunho" },
    { title: "Natal em Família", photos: 32, pages: 8, status: "Rascunho" },
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
          <div key={i} className="rounded-xl border border-border bg-card p-4 hover:shadow-md transition-shadow">
            {/* Thumbnail simulado */}
            <div
              className="w-full h-24 rounded-lg mb-3 overflow-hidden"
              style={{
                background: i === 0
                  ? "linear-gradient(135deg, #C85277 0%, #FFB8A0 100%)"
                  : i === 1
                  ? "linear-gradient(135deg, #FFB8A0 0%, #FDE8EF 100%)"
                  : "linear-gradient(135deg, #FDE8EF 0%, #C85277 100%)",
              }}
            >
              {/* Mini fotos simuladas */}
              <div className="h-full grid grid-cols-2 gap-0.5 p-0.5">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="rounded-sm bg-white/20 backdrop-blur-sm" />
                ))}
              </div>
            </div>
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
        ))}
      </div>
    </div>
  )
}

/* ─── Mockup 2: Grid de fotos ────────────────────────────────────────────── */
function PhotosMockup() {
  const photos = [
    { label: "Manhã de sábado", color: "#C85277" },
    { label: "Torre de Belém", color: "#E07B9A" },
    { label: "Almoço na varanda", color: "#FFB8A0" },
    { label: "Pôr do sol", color: "#C85277" },
    { label: "Primeiro passo", color: "#FDE8EF" },
    { label: "Praia de Cascais", color: "#FFB8A0" },
    { label: "Café da manhã", color: "#E07B9A" },
    { label: "Vista do castelo", color: "#C85277" },
  ]

  return (
    <div className="p-6 min-h-[420px] bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-semibold text-foreground">Viagem para Lisboa 2024</div>
        <div className="h-7 rounded-lg border border-dashed border-primary/50 px-3 flex items-center gap-1.5 text-xs text-primary">
          <span>↑</span> Adicionar fotos
        </div>
      </div>

      {/* Drop zone hint */}
      <div className="rounded-xl border-2 border-dashed border-primary/20 bg-primary/3 p-3 mb-4 text-center text-xs text-muted-foreground">
        Arraste suas fotos aqui ou clique para selecionar
      </div>

      {/* Grid de fotos */}
      <div className="grid grid-cols-4 gap-2">
        {photos.map((p, i) => (
          <div key={i} className="aspect-square rounded-lg overflow-hidden relative group">
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(135deg, ${p.color} 0%, ${p.color}aa 100%)` }}
            />
            {/* Simulação de foto com padrão */}
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "radial-gradient(circle at 30% 40%, white 2px, transparent 2px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
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
            <div key={l} className={`h-7 rounded-lg px-2.5 flex items-center text-[11px] font-medium ${l === "2 fotos" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              + {l}
            </div>
          ))}
        </div>
      </div>

      {/* Páginas */}
      <div className="space-y-3">
        {/* Página 1 — 1 foto */}
        <div className="rounded-xl border border-border bg-card p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-foreground">Página 1</span>
            <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">1 foto</span>
          </div>
          <div className="h-20 rounded-lg overflow-hidden" style={{ background: "linear-gradient(135deg, #C85277 0%, #FFB8A0 100%)" }}>
            <div className="h-full flex items-end p-2">
              <span className="text-[10px] text-white/80">Torre de Belém</span>
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
            <div className="h-20 rounded-lg" style={{ background: "linear-gradient(135deg, #E07B9A 0%, #FDE8EF 100%)" }} />
            <div className="h-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center text-[11px] text-muted-foreground">
              + Foto
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
            {[
              "linear-gradient(135deg, #FFB8A0 0%, #C85277 100%)",
              "linear-gradient(135deg, #C85277 0%, #FDE8EF 100%)",
              "linear-gradient(135deg, #FDE8EF 0%, #FFB8A0 100%)",
              "linear-gradient(135deg, #E07B9A 0%, #C85277 100%)",
            ].map((bg, i) => (
              <div key={i} className="h-16 rounded-lg" style={{ background: bg }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

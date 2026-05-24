import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
      {/* Decoração de fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, #FFB8A022 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Badge de destaque */}
        <div className="mb-6 flex justify-center">
          <Badge
            variant="secondary"
            className="gap-1.5 px-3 py-1 text-sm font-medium border border-primary/20 bg-primary/5 text-primary"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Crie álbuns físicos em minutos
          </Badge>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
          Seus momentos merecem{" "}
          <span className="text-primary">mais que</span>
          <br className="hidden md:block" /> um rolo virtual
        </h1>

        {/* Subtítulo */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
          Organize fotos por dia e momento, monte páginas com layouts bonitos
          e peça a impressão do seu álbum físico — com carinho, do jeito certo.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/login">
            <Button size="lg" className="h-13 px-8 text-base gap-2 shadow-md shadow-primary/20">
              Criar meu álbum grátis
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <a href="#como-funciona">
            <Button variant="ghost" size="lg" className="h-13 px-8 text-base text-muted-foreground hover:text-foreground">
              Ver como funciona
            </Button>
          </a>
        </div>

        {/* Prova social */}
        <p className="mt-6 text-sm text-muted-foreground">
          Sem cartão de crédito · 1 álbum grátis para sempre
        </p>

        {/* Mockup do app */}
        <div className="mt-16 mx-auto max-w-4xl rounded-2xl border border-border/60 bg-card shadow-2xl shadow-black/10 overflow-hidden">
          {/* Barra de título do "browser" */}
          <div className="flex items-center gap-1.5 px-4 py-3 bg-muted/60 border-b border-border/60">
            <div className="w-3 h-3 rounded-full bg-border" />
            <div className="w-3 h-3 rounded-full bg-border" />
            <div className="w-3 h-3 rounded-full bg-border" />
            <div className="ml-4 flex-1 h-5 rounded-full bg-border/50 max-w-xs" />
          </div>
          {/* Placeholder da screenshot */}
          <div
            className="aspect-[16/9] flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #FFF8F5 0%, #FFE8DF 50%, #FFF0EC 100%)" }}
          >
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto">
                <span className="text-2xl">📷</span>
              </div>
              <p className="text-sm text-muted-foreground font-medium">Screenshot do app em breve</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

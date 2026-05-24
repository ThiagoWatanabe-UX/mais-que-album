import { Images, LayoutGrid, Heart, Shield } from "lucide-react"

const features = [
  {
    icon: Images,
    title: "Organize por momentos",
    description:
      "Adicione labels de dia e momento para cada foto — 'Manhã de sábado', 'Primeiro passo', 'Natal 2024'. Suas memórias com contexto.",
    color: "text-primary",
    bg: "bg-primary/8",
  },
  {
    icon: LayoutGrid,
    title: "Monte suas páginas",
    description:
      "Escolha entre layouts de 1, 2, 3 ou 4 fotos por página. Arraste, solte, reordene. O álbum do seu jeito.",
    color: "text-accent-foreground",
    bg: "bg-accent/20",
  },
  {
    icon: Heart,
    title: "Feito para memórias reais",
    description:
      "Álbuns de bebê, viagens em família, casamentos — o formato físico tem um peso que o digital não tem. Vale a pena.",
    color: "text-primary",
    bg: "bg-primary/8",
  },
  {
    icon: Shield,
    title: "Suas fotos em segurança",
    description:
      "Upload seguro com armazenamento em nuvem. Acesse de qualquer dispositivo, edite quando quiser, sem perder nada.",
    color: "text-muted-foreground",
    bg: "bg-muted",
  },
]

export function LandingFeatures() {
  return (
    <section id="recursos" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Recursos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tudo que você precisa para criar
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Simples de usar, poderoso o suficiente para criar álbuns que emocionam.
          </p>
        </div>

        {/* Grid de features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-card rounded-2xl p-6 border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-200"
            >
              <div className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                <f.icon className={`w-5 h-5 ${f.color}`} />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

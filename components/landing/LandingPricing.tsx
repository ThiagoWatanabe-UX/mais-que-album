import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

const plans = [
  {
    name: "Grátis",
    price: "R$ 0",
    period: "para sempre",
    description: "Ideal para experimentar e criar seu primeiro álbum.",
    cta: "Começar grátis",
    ctaVariant: "outline" as const,
    highlight: false,
    features: [
      { label: "1 álbum", included: true },
      { label: "Fotos ilimitadas por álbum", included: true },
      { label: "Organize por momentos e dias", included: true },
      { label: "Todos os layouts de página", included: true },
      { label: "Export PDF / impressão", included: false },
      { label: "Suporte prioritário", included: false },
    ],
  },
  {
    name: "PRO",
    price: "R$ 49",
    period: "por mês",
    description: "Para quem quer criar múltiplos álbuns e imprimir.",
    cta: "Assinar o PRO",
    ctaVariant: "default" as const,
    highlight: true,
    badge: "Mais popular",
    features: [
      { label: "Álbuns ilimitados", included: true },
      { label: "Fotos ilimitadas por álbum", included: true },
      { label: "Organize por momentos e dias", included: true },
      { label: "Todos os layouts de página", included: true },
      { label: "Export PDF / impressão", included: true },
      { label: "Suporte prioritário", included: true },
    ],
  },
]

export function LandingPricing() {
  return (
    <section id="precos" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Preços
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simples e transparente
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Comece grátis. Faça upgrade quando precisar de mais.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 border ${
                plan.highlight
                  ? "border-primary bg-card shadow-xl shadow-primary/10"
                  : "border-border bg-card"
              }`}
            >
              {/* Badge "Mais popular" */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="px-3 py-0.5 text-xs font-semibold shadow-sm">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              {/* Nome e preço */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              {/* CTA */}
              <Link href="/login" className="block mb-8">
                <Button
                  variant={plan.ctaVariant}
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Link>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.label} className="flex items-center gap-3 text-sm">
                    {feature.included ? (
                      <Check className="w-4 h-4 text-primary shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground/50 shrink-0" />
                    )}
                    <span
                      className={
                        feature.included ? "text-foreground" : "text-muted-foreground/60"
                      }
                    >
                      {feature.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

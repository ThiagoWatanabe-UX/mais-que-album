const steps = [
  {
    number: "01",
    title: "Crie seu álbum",
    description:
      "Dê um nome, escolha o tamanho (A4, A5, Quadrado) e a orientação. Em segundos, seu álbum está pronto para receber fotos.",
  },
  {
    number: "02",
    title: "Adicione e organize suas fotos",
    description:
      "Faça upload das fotos, adicione legendas e labels de momento. Arraste para reordenar. Suas memórias com contexto.",
  },
  {
    number: "03",
    title: "Monte as páginas",
    description:
      "Escolha layouts para cada página e posicione as fotos. Visualize como o álbum vai ficar antes de pedir a impressão.",
  },
]

export function LandingHowItWorks() {
  return (
    <section id="como-funciona" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Como funciona
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Do upload ao álbum em 3 passos
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Sem complicação. Sem curva de aprendizado.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Linha conectora (desktop) */}
          <div
            aria-hidden
            className="hidden md:block absolute top-10 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-transparent via-border to-transparent"
          />

          {steps.map((step) => (
            <div key={step.number} className="text-center relative">
              {/* Número */}
              <div className="w-20 h-20 rounded-2xl bg-primary/8 border-2 border-primary/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">{step.number}</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

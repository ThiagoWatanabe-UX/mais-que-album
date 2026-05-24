import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import tokens from '../../design-system/tokens'

/* ─── Componente auxiliar de visualização ─────────────────────────────────── */
function ColorSwatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-20 h-20 rounded-xl shadow-md border border-black/5"
        style={{ background: value }}
      />
      <div className="text-center">
        <p className="text-xs font-mono font-semibold text-foreground">{name}</p>
        <p className="text-[10px] font-mono text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}

function TokensPage() {
  return (
    <div className="p-8 space-y-12 bg-background min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Design Tokens</h1>
        <p className="text-muted-foreground text-sm">
          Fonte única de verdade — edite em{' '}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">
            design-system/tokens.ts
          </code>{' '}
          e rode <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">npm run tokens</code>.
        </p>
      </div>

      {/* Cores */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-6 pb-2 border-b border-border">
          Cores
        </h2>
        <div className="flex flex-wrap gap-6">
          {Object.entries(tokens.colors).map(([key, value]) => (
            <ColorSwatch key={key} name={key} value={value} />
          ))}
        </div>
      </section>

      {/* Radius */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-6 pb-2 border-b border-border">
          Border Radius
        </h2>
        <div className="flex items-end gap-8">
          {['0.25rem','0.5rem','0.75rem','1rem','1.5rem'].map((r) => (
            <div key={r} className="flex flex-col items-center gap-2">
              <div
                className="w-16 h-16 bg-primary/20 border-2 border-primary/40"
                style={{ borderRadius: r }}
              />
              <p className="text-xs font-mono text-muted-foreground">{r}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tipografia */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-6 pb-2 border-b border-border">
          Tipografia
        </h2>
        <div className="space-y-3">
          {[
            { label: 'text-7xl / 4.5rem', size: '4.5rem' },
            { label: 'text-5xl / 3rem',   size: '3rem' },
            { label: 'text-3xl / 1.875rem', size: '1.875rem' },
            { label: 'text-xl / 1.25rem', size: '1.25rem' },
            { label: 'text-base / 1rem',  size: '1rem' },
            { label: 'text-sm / 0.875rem',size: '0.875rem' },
            { label: 'text-xs / 0.75rem', size: '0.75rem' },
          ].map(({ label, size }) => (
            <div key={label} className="flex items-baseline gap-4">
              <p className="text-foreground font-semibold" style={{ fontSize: size }}>
                Mais que Album
              </p>
              <span className="text-xs font-mono text-muted-foreground shrink-0">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Espaçamentos */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-6 pb-2 border-b border-border">
          Espaçamento
        </h2>
        <div className="flex items-end gap-6">
          {Object.entries(tokens.spacing).map(([key, value]) => (
            <div key={key} className="flex flex-col items-center gap-2">
              <div
                className="bg-primary/30 border border-primary/50 w-4"
                style={{ height: value }}
              />
              <p className="text-[10px] font-mono text-muted-foreground">{key}</p>
              <p className="text-[10px] font-mono text-muted-foreground">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/* ─── Story config ────────────────────────────────────────────────────────── */
const meta: Meta = {
  title: 'Design System/Tokens',
  component: TokensPage,
  tags: ['ai-generated'],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof meta>
export const Tokens: Story = {}

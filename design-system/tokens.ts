// ─── Design Tokens — Mais que Album ─────────────────────────────────────────
// Single Source of Truth para todas as cores, espaçamentos e tipografia.
// Edite aqui → rode `npm run tokens` → mudanças refletem no produto e Storybook.

export interface DesignTokens {
  colors: Record<string, string>
  sidebar: Record<string, string>
  radius: string
  spacing: Record<string, string>
  typography: Record<string, string>
}

const tokens: DesignTokens = {
  colors: {
    // Backgrounds
    background: "#FFF8F5",       // creme suave
    foreground: "#3D1F1F",       // marrom-rosado escuro

    // Cards e Popovers
    card: "#FFFFFF",
    cardForeground: "#3D1F1F",
    popover: "#FFFFFF",
    popoverForeground: "#3D1F1F",

    // Primária — rose profundo
    primary: "#C85277",
    primaryForeground: "#FFFFFF",

    // Secundária — rose claro
    secondary: "#FDE8EF",
    secondaryForeground: "#C85277",

    // Muted — tons neutros rosados
    muted: "#F9EEF0",
    mutedForeground: "#9B6B72",

    // Accent — pêssego
    accent: "#FFB8A0",
    accentForeground: "#7C3020",

    // Destrutivo
    destructive: "#EF4444",
    destructiveForeground: "#FFFFFF",

    // Bordas e inputs
    border: "#F0D9DC",
    input: "#F0D9DC",
    ring: "#C85277",

    // Chart (para gráficos futuros)
    chart1: "#C85277",
    chart2: "#FFB8A0",
    chart3: "#F9A8D4",
    chart4: "#FECDD3",
    chart5: "#FDE8EF",
  },

  sidebar: {
    background: "#FFF0F3",
    foreground: "#3D1F1F",
    primary: "#C85277",
    primaryForeground: "#FFFFFF",
    accent: "#FDE8EF",
    accentForeground: "#C85277",
    border: "#F0D9DC",
    ring: "#C85277",
  },

  radius: "0.75rem",

  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },

  typography: {
    fontSans: "var(--font-geist-sans)",
    fontMono: "var(--font-geist-mono)",
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
  },
}

export default tokens

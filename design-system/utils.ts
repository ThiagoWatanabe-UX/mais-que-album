// ─── Design System Utils ─────────────────────────────────────────────────────

/**
 * Converte chave camelCase para CSS custom property.
 * Ex: "cardForeground" → "--card-foreground"
 * Ex: "chart1" → "--chart-1"  (números viram segmento separado)
 */
export function tokenKeyToCssVar(key: string): string {
  return (
    "--" +
    key
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/([a-zA-Z])(\d)/g, "$1-$2")
      .toLowerCase()
  )
}

/**
 * Converte chave de sidebar para CSS custom property.
 * Ex: "primary" → "--sidebar-primary"
 * Ex: "primaryForeground" → "--sidebar-primary-foreground"
 */
export function sidebarKeyToCssVar(key: string): string {
  return (
    "--sidebar-" +
    key
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/([a-zA-Z])(\d)/g, "$1-$2")
      .toLowerCase()
  )
}

#!/usr/bin/env tsx
// ─── CSS Generator ───────────────────────────────────────────────────────────
// Lê tokens.ts e gera as CSS custom properties em globals.css.
// Uso: npm run tokens          → gera/atualiza globals.css
//      npm run tokens:check    → verifica sincronização (CI)

import fs from "fs"
import path from "path"
import tokens from "./tokens"
import { tokenKeyToCssVar, sidebarKeyToCssVar } from "./utils"

const GLOBALS_PATH = path.resolve(__dirname, "../app/globals.css")
const START_MARKER = "/* DESIGN-TOKENS:START */"
const END_MARKER = "/* DESIGN-TOKENS:END */"

function generateRootBlock(): string {
  const lines: string[] = []

  lines.push(":root {")

  // Cores
  for (const [key, value] of Object.entries(tokens.colors)) {
    lines.push(`  ${tokenKeyToCssVar(key)}: ${value};`)
  }

  // Radius
  lines.push(`  --radius: ${tokens.radius};`)

  // Sidebar
  for (const [key, value] of Object.entries(tokens.sidebar)) {
    lines.push(`  ${sidebarKeyToCssVar(key)}: ${value};`)
  }

  lines.push("}")

  return lines.join("\n")
}

function run() {
  const isCheck = process.argv.includes("--check")

  if (!fs.existsSync(GLOBALS_PATH)) {
    console.error(`❌ globals.css não encontrado em: ${GLOBALS_PATH}`)
    process.exit(1)
  }

  const current = fs.readFileSync(GLOBALS_PATH, "utf-8")
  const newBlock = generateRootBlock()
  const replacement = `${START_MARKER}\n${newBlock}\n${END_MARKER}`

  let updated: string

  if (current.includes(START_MARKER)) {
    // Substitui bloco existente
    const startIdx = current.indexOf(START_MARKER)
    const endIdx = current.indexOf(END_MARKER) + END_MARKER.length
    updated = current.slice(0, startIdx) + replacement + current.slice(endIdx)
  } else {
    // Injeta antes do primeiro @layer
    const insertBefore = current.indexOf("@layer")
    if (insertBefore === -1) {
      updated = current + "\n\n" + replacement
    } else {
      updated =
        current.slice(0, insertBefore) +
        replacement +
        "\n\n" +
        current.slice(insertBefore)
    }
  }

  if (isCheck) {
    if (current === updated) {
      console.log("✅ globals.css está sincronizado com tokens.ts")
      process.exit(0)
    } else {
      console.error("❌ globals.css está desatualizado. Rode: npm run tokens")
      process.exit(1)
    }
  }

  fs.writeFileSync(GLOBALS_PATH, updated, "utf-8")
  console.log("✅ globals.css atualizado com os design tokens!")
}

run()

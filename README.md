# Mais que Album

> Crie álbuns de fotos físicos personalizados. Tradições com propósito.

Plataforma SaaS para montar e pedir álbuns físicos de memórias familiares.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 16 (App Router, TypeScript) |
| Estilização | Tailwind CSS 4 + shadcn/ui |
| Auth | Auth.js v5 (Google + Magic Link via Resend) |
| Banco de dados | PostgreSQL (Neon) + Prisma 6 |
| Upload de fotos | Vercel Blob (public) |
| Pagamentos | Stripe (Checkout + Portal + Webhooks) |
| Emails | Resend |
| Data fetching | TanStack Query v5 |

## Pré-requisitos

- Node.js 20+
- Conta no [Neon](https://neon.tech) (banco de dados)
- Conta no [Vercel](https://vercel.com) (deploy + blob storage)
- Conta no [Resend](https://resend.com) (emails)
- Conta no [Google Cloud](https://console.cloud.google.com) (OAuth)
- Conta no [Stripe](https://stripe.com) (pagamentos)

## Setup local

```bash
# 1. Clone e instale dependências
git clone https://github.com/ThiagoWatanabe-UX/mais-que-album.git
cd mais-que-album
npm install

# 2. Configure variáveis de ambiente
cp .env.example .env.local
# Preencha todas as variáveis em .env.local

# Crie também um .env só para o Prisma CLI:
echo 'DATABASE_URL="sua-url-neon"' > .env

# 3. Aplique as migrations
npx prisma migrate dev

# 4. Rode o servidor
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

Veja `.env.example` para todas as variáveis necessárias.

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | Connection string do Neon (com `?sslmode=require`) |
| `AUTH_SECRET` | Gerado com `openssl rand -base64 32` |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Credenciais OAuth do Google Cloud Console |
| `AUTH_RESEND_KEY` / `RESEND_API_KEY` | API key do Resend |
| `BLOB_READ_WRITE_TOKEN` | Token do Vercel Blob Store |
| `STRIPE_SECRET_KEY` | Chave secreta do Stripe |
| `STRIPE_WEBHOOK_SECRET` | Secret do webhook do Stripe |
| `STRIPE_PRICE_ID_PRO` | ID do preço PRO no Stripe (R$49/mês) |
| `NEXT_PUBLIC_APP_URL` | URL pública do app (ex: `https://maisquealbum.com.br`) |

## Design System

As cores e tokens do design system ficam em `design-system/tokens.ts`.

```bash
# Aplicar tokens ao globals.css
npm run tokens

# Verificar sincronização (usado no CI)
npm run tokens:check
```

**Nunca edite as cores diretamente em `globals.css`** — edite `tokens.ts` e rode `npm run tokens`.

## Planos

| Plano | Álbuns | Fotos | Export/Impressão | Preço |
|-------|--------|-------|-----------------|-------|
| FREE | 1 | Ilimitadas | Não | Grátis |
| TRIAL | Ilimitados | Ilimitadas | Sim | 14 dias grátis |
| PRO | Ilimitados | Ilimitadas | Sim | R$49/mês |

## Deploy

O projeto está conectado ao Vercel via GitHub. Cada push para `master` dispara um deploy automático.

```bash
# Deploy manual (se necessário)
vercel --prod
```

## Estrutura do projeto

```
app/
  page.tsx              # Landing page pública
  layout.tsx            # Root layout (Providers, metadata)
  dashboard/            # Área autenticada
  api/                  # API routes (albums, photos, pages, stripe, auth)
  login/                # Página de autenticação
  settings/billing/     # Gerenciamento de assinatura

components/
  landing/              # Componentes da landing page
  albums/               # Editor de álbuns, grid de fotos, editor de páginas
  paywall/              # TrialBanner, PaywallGate
  ui/                   # shadcn/ui components

design-system/
  tokens.ts             # Single source of truth das cores
  generate-css.ts       # Gera :root no globals.css
  utils.ts              # Helpers de conversão camelCase para CSS var

hooks/
  useAlbums.ts          # TanStack Query hooks para álbuns

lib/
  auth.ts               # Configuração do Auth.js
  db.ts                 # Prisma singleton
  stripe.ts             # Stripe lazy init
  subscription.ts       # Lógica de acesso por plano
  validations.ts        # Schemas Zod
  email.ts              # Welcome email via Resend

prisma/
  schema.prisma         # Schema do banco de dados
```

## Licença

Proprietário — todos os direitos reservados.

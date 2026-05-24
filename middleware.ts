// Middleware leve — NÃO importa Auth.js para não estourar o limite de 1MB do Vercel Edge.
// Checa o cookie de sessão diretamente.
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PROTECTED_PREFIXES = ["/dashboard", "/app", "/settings"]
const SESSION_COOKIE = "authjs.session-token"
const SECURE_SESSION_COOKIE = "__Secure-authjs.session-token"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  )

  if (!isProtected) return NextResponse.next()

  const sessionToken =
    request.cookies.get(SESSION_COOKIE)?.value ||
    request.cookies.get(SECURE_SESSION_COOKIE)?.value

  if (!sessionToken) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}

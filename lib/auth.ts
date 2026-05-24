import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import type { Plan } from "@prisma/client"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY!,
      from: "Mais que Album <noreply@maisquealbum.com.br>",
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        session.user.plan = (user as unknown as { plan: Plan }).plan
        session.user.trialEndsAt = (user as unknown as { trialEndsAt: Date | null }).trialEndsAt
      }
      return session
    },
  },

  events: {
    // Primeiro login → inicia trial de 14 dias
    async createUser({ user }) {
      const trialEndsAt = new Date()
      trialEndsAt.setDate(trialEndsAt.getDate() + 14)

      await db.user.update({
        where: { id: user.id },
        data: {
          plan: "TRIAL",
          trialEndsAt,
        },
      })
    },
  },
})

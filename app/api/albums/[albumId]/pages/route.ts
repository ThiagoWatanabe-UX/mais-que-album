import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { createPageSchema } from "@/lib/validations"

type Params = { params: Promise<{ albumId: string }> }

export async function POST(req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 })

  const { albumId } = await params

  const album = await db.album.findFirst({ where: { id: albumId, userId: session.user.id } })
  if (!album) return NextResponse.json({ error: "Álbum não encontrado" }, { status: 404 })

  const body = await req.json()
  const parsed = createPageSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const page = await db.albumPage.create({ data: parsed.data })

  return NextResponse.json(page, { status: 201 })
}

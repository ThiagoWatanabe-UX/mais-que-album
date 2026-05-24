import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

type Params = { params: Promise<{ albumId: string; pageId: string }> }

export async function POST(req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 })

  const { albumId, pageId } = await params

  const album = await db.album.findFirst({ where: { id: albumId, userId: session.user.id } })
  if (!album) return NextResponse.json({ error: "Álbum não encontrado" }, { status: 404 })

  const { photoId, position } = await req.json()

  // Se photoId vazio, remove a posição
  if (!photoId) {
    await db.photoOnPage.deleteMany({ where: { albumPageId: pageId, position } })
    return NextResponse.json({ success: true })
  }

  // Upsert — substitui se já existir nessa posição
  const result = await db.photoOnPage.upsert({
    where: { albumPageId_position: { albumPageId: pageId, position } },
    create: { albumPageId: pageId, photoId, position },
    update: { photoId },
  })

  return NextResponse.json(result, { status: 201 })
}

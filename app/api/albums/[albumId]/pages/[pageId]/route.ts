import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

type Params = { params: Promise<{ albumId: string; pageId: string }> }

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 })

  const { albumId, pageId } = await params

  const album = await db.album.findFirst({ where: { id: albumId, userId: session.user.id } })
  if (!album) return NextResponse.json({ error: "Álbum não encontrado" }, { status: 404 })

  await db.albumPage.deleteMany({ where: { id: pageId, albumId } })

  return NextResponse.json({ success: true })
}

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { updateAlbumSchema } from "@/lib/validations"

type Params = { params: Promise<{ albumId: string }> }

// GET /api/albums/:albumId
export async function GET(_req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 })

  const { albumId } = await params

  const album = await db.album.findFirst({
    where: { id: albumId, userId: session.user.id },
    include: {
      photos: { orderBy: { order: "asc" } },
      pages: {
        orderBy: { order: "asc" },
        include: { photosOnPages: { include: { photo: true } } },
      },
    },
  })

  if (!album) return NextResponse.json({ error: "Álbum não encontrado" }, { status: 404 })

  return NextResponse.json(album)
}

// PATCH /api/albums/:albumId
export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 })

  const { albumId } = await params
  const body = await req.json()
  const parsed = updateAlbumSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const album = await db.album.updateMany({
    where: { id: albumId, userId: session.user.id },
    data: parsed.data,
  })

  if (album.count === 0) return NextResponse.json({ error: "Álbum não encontrado" }, { status: 404 })

  return NextResponse.json({ success: true })
}

// DELETE /api/albums/:albumId
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 })

  const { albumId } = await params

  await db.album.deleteMany({ where: { id: albumId, userId: session.user.id } })

  return NextResponse.json({ success: true })
}

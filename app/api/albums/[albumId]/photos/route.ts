import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { put } from "@vercel/blob"

type Params = { params: Promise<{ albumId: string }> }

// GET /api/albums/:albumId/photos
export async function GET(_req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 })

  const { albumId } = await params

  const album = await db.album.findFirst({ where: { id: albumId, userId: session.user.id } })
  if (!album) return NextResponse.json({ error: "Álbum não encontrado" }, { status: 404 })

  const photos = await db.photo.findMany({
    where: { albumId },
    orderBy: { order: "asc" },
  })

  return NextResponse.json(photos)
}

// POST /api/albums/:albumId/photos — upload de fotos
export async function POST(req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 })

  const { albumId } = await params

  const album = await db.album.findFirst({ where: { id: albumId, userId: session.user.id } })
  if (!album) return NextResponse.json({ error: "Álbum não encontrado" }, { status: 404 })

  const formData = await req.formData()
  const files = formData.getAll("files") as File[]

  if (!files.length) return NextResponse.json({ error: "Nenhuma foto enviada" }, { status: 400 })

  // Conta fotos existentes para ordenação
  const existingCount = await db.photo.count({ where: { albumId } })

  const uploaded = await Promise.all(
    files.map(async (file, index) => {
      const ext = file.name.split(".").pop() ?? "jpg"
      const storageKey = `albums/${albumId}/${Date.now()}-${index}.${ext}`

      const blob = await put(storageKey, file, {
        access: "public",
        contentType: file.type,
      })

      return db.photo.create({
        data: {
          albumId,
          url: blob.url,
          storageKey: blob.pathname,
          order: existingCount + index,
        },
      })
    })
  )

  return NextResponse.json(uploaded, { status: 201 })
}

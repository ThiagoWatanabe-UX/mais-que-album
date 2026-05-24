import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { del } from "@vercel/blob"
import { updatePhotoSchema } from "@/lib/validations"

type Params = { params: Promise<{ albumId: string; photoId: string }> }

// PATCH /api/albums/:albumId/photos/:photoId
export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 })

  const { albumId, photoId } = await params

  const photo = await db.photo.findFirst({
    where: { id: photoId, albumId, album: { userId: session.user.id } },
  })
  if (!photo) return NextResponse.json({ error: "Foto não encontrada" }, { status: 404 })

  const body = await req.json()
  const parsed = updatePhotoSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const updated = await db.photo.update({ where: { id: photoId }, data: parsed.data })

  return NextResponse.json(updated)
}

// DELETE /api/albums/:albumId/photos/:photoId
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 })

  const { albumId, photoId } = await params

  const photo = await db.photo.findFirst({
    where: { id: photoId, albumId, album: { userId: session.user.id } },
  })
  if (!photo) return NextResponse.json({ error: "Foto não encontrada" }, { status: 404 })

  // Remove do Vercel Blob
  try {
    await del(photo.storageKey)
  } catch {
    // Continua mesmo se falhar no storage
  }

  await db.photo.delete({ where: { id: photoId } })

  return NextResponse.json({ success: true })
}

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { createAlbumSchema } from "@/lib/validations"
import { checkUsageLimit } from "@/lib/subscription"

// GET /api/albums — lista álbuns do usuário
export async function GET() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 })

  const albums = await db.album.findMany({
    where: { userId: session.user.id },
    include: {
      _count: { select: { photos: true, pages: true } },
    },
    orderBy: { updatedAt: "desc" },
  })

  return NextResponse.json(albums)
}

// POST /api/albums — cria novo álbum
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 })

  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })

  // Verifica limite de álbuns do plano
  const albumCount = await db.album.count({ where: { userId: user.id } })
  const { allowed, limit } = checkUsageLimit(user, "albums", albumCount)

  if (!allowed) {
    return NextResponse.json(
      { error: `Limite de ${limit} álbum(ns) atingido. Faça upgrade para criar mais.` },
      { status: 403 }
    )
  }

  const body = await req.json()
  const parsed = createAlbumSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const album = await db.album.create({
    data: {
      ...parsed.data,
      userId: session.user.id,
    },
  })

  return NextResponse.json(album, { status: 201 })
}

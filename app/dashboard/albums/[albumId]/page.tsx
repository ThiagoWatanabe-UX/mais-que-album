import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { AlbumEditor } from "@/components/albums/AlbumEditor"

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ albumId: string }>
}) {
  const session = await auth()
  if (!session?.user) redirect("/login")

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

  if (!album) redirect("/dashboard")

  return <AlbumEditor album={album} />
}

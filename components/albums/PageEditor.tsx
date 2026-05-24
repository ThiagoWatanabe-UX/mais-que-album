"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import type { Album, Photo, AlbumPage, PhotoOnPage } from "@prisma/client"

type AlbumWithRelations = Album & {
  photos: Photo[]
  pages: (AlbumPage & {
    photosOnPages: (PhotoOnPage & { photo: Photo })[]
  })[]
}

const LAYOUT_LABELS: Record<string, string> = {
  SINGLE: "1 foto",
  GRID_2: "2 fotos",
  GRID_4: "4 fotos",
  COLLAGE: "Colagem",
  CUSTOM: "Automático",
}

const LAYOUT_SLOTS: Record<string, number> = {
  SINGLE: 1,
  GRID_2: 2,
  GRID_4: 4,
  COLLAGE: 3,
  CUSTOM: 4,
}

interface PageEditorProps {
  album: AlbumWithRelations
}

export function PageEditor({ album }: PageEditorProps) {
  const qc = useQueryClient()
  const [creating, setCreating] = useState(false)

  async function addPage(layoutType: string) {
    setCreating(true)
    try {
      const res = await fetch(`/api/albums/${album.id}/pages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          albumId: album.id,
          layoutType,
          order: album.pages.length,
        }),
      })
      if (!res.ok) throw new Error()
      qc.invalidateQueries({ queryKey: ["albums", album.id] })
      toast.success("Página adicionada!")
    } catch {
      toast.error("Erro ao criar página")
    } finally {
      setCreating(false)
    }
  }

  async function deletePage(pageId: string) {
    const res = await fetch(`/api/albums/${album.id}/pages/${pageId}`, { method: "DELETE" })
    if (res.ok) {
      qc.invalidateQueries({ queryKey: ["albums", album.id] })
      toast.success("Página removida")
    }
  }

  async function addPhotoToPage(pageId: string, photoId: string, position: number) {
    await fetch(`/api/albums/${album.id}/pages/${pageId}/photos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photoId, position }),
    })
    qc.invalidateQueries({ queryKey: ["albums", album.id] })
  }

  if (album.photos.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-lg">Adicione fotos primeiro para montar as páginas.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Adicionar página */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm text-muted-foreground">Adicionar página com layout:</span>
        {Object.entries(LAYOUT_LABELS).map(([key, label]) => (
          <Button
            key={key}
            variant="outline"
            size="sm"
            disabled={creating}
            onClick={() => addPage(key)}
            className="gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            {label}
          </Button>
        ))}
      </div>

      {album.pages.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-border rounded-2xl text-muted-foreground">
          <p>Nenhuma página ainda. Adicione uma acima!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {album.pages.map((page, pageIndex) => {
            const slots = LAYOUT_SLOTS[page.layoutType] ?? 2
            const placed = page.photosOnPages.sort((a, b) => a.position - b.position)

            return (
              <div key={page.id} className="border border-border rounded-2xl p-4 bg-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Página {pageIndex + 1}</span>
                    <Badge variant="secondary" className="text-xs">
                      {LAYOUT_LABELS[page.layoutType]}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-7 h-7 text-destructive hover:text-destructive"
                    onClick={() => deletePage(page.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>

                {/* Grade de slots */}
                <div
                  className={`grid gap-2 ${
                    slots === 1 ? "grid-cols-1" :
                    slots === 2 ? "grid-cols-2" :
                    "grid-cols-2"
                  }`}
                >
                  {Array.from({ length: slots }).map((_, pos) => {
                    const placed_photo = placed.find((p) => p.position === pos)

                    return (
                      <div
                        key={pos}
                        className={`relative rounded-xl overflow-hidden bg-muted border-2 border-dashed border-border ${
                          slots === 1 ? "aspect-[3/2]" :
                          slots === 4 && pos < 2 ? "aspect-square" :
                          "aspect-square"
                        }`}
                      >
                        {placed_photo ? (
                          <>
                            <Image
                              src={placed_photo.photo.url}
                              alt={placed_photo.photo.caption ?? "Foto"}
                              fill
                              className="object-cover"
                              sizes="300px"
                            />
                            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                              <Button
                                size="icon"
                                variant="destructive"
                                className="w-8 h-8"
                                onClick={() => addPhotoToPage(page.id, "", pos)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </>
                        ) : (
                          <Select onValueChange={(photoId: string | null) => photoId && addPhotoToPage(page.id, photoId, pos)}>
                            <SelectTrigger className="absolute inset-0 border-0 bg-transparent h-full rounded-xl">
                              <SelectValue placeholder="+ Foto" />
                            </SelectTrigger>
                            <SelectContent>
                              {album.photos.map((photo) => (
                                <SelectItem key={photo.id} value={photo.id}>
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 relative rounded overflow-hidden shrink-0">
                                      <Image src={photo.url} alt="" fill className="object-cover" />
                                    </div>
                                    <span className="text-xs truncate max-w-32">
                                      {photo.dayLabel
                                        ? `${photo.dayLabel} ${photo.momentLabel ?? ""}`
                                        : photo.caption ?? `Foto ${album.photos.indexOf(photo) + 1}`}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

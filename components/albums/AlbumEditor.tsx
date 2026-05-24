"use client"

import { useState, useCallback } from "react"
import { useUploadPhotos, useDeletePhoto, useUpdateAlbum } from "@/hooks/useAlbums"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { PhotoGrid } from "@/components/albums/PhotoGrid"
import { PageEditor } from "@/components/albums/PageEditor"
import { ArrowLeft, Upload, BookOpen, Image } from "lucide-react"
import Link from "next/link"
import type { Album, Photo, AlbumPage, PhotoOnPage } from "@prisma/client"

type AlbumWithRelations = Album & {
  photos: Photo[]
  pages: (AlbumPage & {
    photosOnPages: (PhotoOnPage & { photo: Photo })[]
  })[]
}

interface AlbumEditorProps {
  album: AlbumWithRelations
}

export function AlbumEditor({ album }: AlbumEditorProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [editingTitle, setEditingTitle] = useState(false)
  const [title, setTitle] = useState(album.title)

  const uploadPhotos = useUploadPhotos(album.id)
  const deletePhoto = useDeletePhoto(album.id)
  const updateAlbum = useUpdateAlbum(album.id)

  const handleFiles = useCallback(
    async (files: File[]) => {
      const images = files.filter((f) => f.type.startsWith("image/"))
      if (images.length) await uploadPhotos.mutateAsync(images)
    },
    [uploadPhotos]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const files = Array.from(e.dataTransfer.files)
      handleFiles(files)
    },
    [handleFiles]
  )

  const handleTitleSave = () => {
    if (title.trim() && title !== album.title) {
      updateAlbum.mutate({ title: title.trim() })
    }
    setEditingTitle(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>
          <div className="flex-1">
            {editingTitle ? (
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={(e) => e.key === "Enter" && handleTitleSave()}
                className="text-lg font-semibold h-8 border-0 border-b rounded-none focus-visible:ring-0 px-0"
                autoFocus
              />
            ) : (
              <h1
                className="text-lg font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
                onClick={() => setEditingTitle(true)}
              >
                {album.title}
              </h1>
            )}
            <div className="flex gap-2 mt-0.5">
              <Badge variant="secondary" className="text-xs">
                {album.size}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {album.orientation === "PORTRAIT" ? "Retrato" : "Paisagem"}
              </Badge>
            </div>
          </div>

          {/* Upload rápido */}
          <label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="sr-only"
              onChange={(e) => handleFiles(Array.from(e.target.files ?? []))}
            />
            <Button
              variant="outline"
              size="sm"
              className="gap-2 cursor-pointer"
              disabled={uploadPhotos.isPending}
            >
              <Upload className="w-4 h-4" />
              {uploadPhotos.isPending ? "Enviando..." : "Adicionar fotos"}
            </Button>
          </label>
        </div>
      </div>

      {/* Drag & Drop zone */}
      <div
        className="max-w-6xl mx-auto px-6"
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {isDragging && (
          <div className="fixed inset-0 z-50 bg-primary/10 border-4 border-dashed border-primary flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <Upload className="w-16 h-16 text-primary mx-auto mb-3" />
              <p className="text-xl font-semibold text-primary">Solte as fotos aqui</p>
            </div>
          </div>
        )}

        <Tabs defaultValue="photos" className="py-6">
          <TabsList className="mb-6">
            <TabsTrigger value="photos" className="gap-2">
              <Image className="w-4 h-4" />
              Fotos ({album.photos.length})
            </TabsTrigger>
            <TabsTrigger value="pages" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Páginas ({album.pages.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="photos">
            <PhotoGrid
              photos={album.photos}
              albumId={album.id}
              onDelete={(id) => deletePhoto.mutate(id)}
              onUpload={handleFiles}
            />
          </TabsContent>

          <TabsContent value="pages">
            <PageEditor album={album} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

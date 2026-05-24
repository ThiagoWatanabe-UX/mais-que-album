"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Tag, Upload } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
import type { Photo } from "@prisma/client"

interface PhotoGridProps {
  photos: Photo[]
  albumId: string
  onDelete: (id: string) => void
  onUpload: (files: File[]) => void
}

export function PhotoGrid({ photos, albumId, onDelete, onUpload }: PhotoGridProps) {
  const [selected, setSelected] = useState<Photo | null>(null)
  const [dayLabel, setDayLabel] = useState("")
  const [momentLabel, setMomentLabel] = useState("")
  const [caption, setCaption] = useState("")

  function openPhoto(photo: Photo) {
    setSelected(photo)
    setDayLabel(photo.dayLabel ?? "")
    setMomentLabel(photo.momentLabel ?? "")
    setCaption(photo.caption ?? "")
  }

  async function saveLabels() {
    if (!selected) return
    const res = await fetch(`/api/albums/${albumId}/photos/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dayLabel, momentLabel, caption }),
    })
    if (res.ok) {
      toast.success("Etiquetas salvas!")
      setSelected(null)
    } else {
      toast.error("Erro ao salvar")
    }
  }

  if (photos.length === 0) {
    return (
      <label className="block">
        <input
          type="file"
          multiple
          accept="image/*"
          className="sr-only"
          onChange={(e) => onUpload(Array.from(e.target.files ?? []))}
        />
        <div className="border-2 border-dashed border-border rounded-2xl p-16 text-center cursor-pointer hover:border-primary hover:bg-secondary/30 transition-colors">
          <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground">Adicione suas primeiras fotos</p>
          <p className="text-sm text-muted-foreground mt-1">
            Arraste e solte ou clique para selecionar
          </p>
        </div>
      </label>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative group aspect-square rounded-xl overflow-hidden bg-muted cursor-pointer"
            onClick={() => openPhoto(photo)}
          >
            <Image
              src={photo.url}
              alt={photo.caption ?? "Foto"}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
            {/* Labels */}
            {(photo.dayLabel || photo.momentLabel) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-2">
                {photo.dayLabel && (
                  <Badge variant="secondary" className="text-xs mb-0.5">
                    {photo.dayLabel}
                  </Badge>
                )}
                {photo.momentLabel && (
                  <p className="text-white text-xs truncate">{photo.momentLabel}</p>
                )}
              </div>
            )}
            {/* Actions */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <Button
                size="icon"
                variant="secondary"
                className="w-7 h-7"
                onClick={(e) => { e.stopPropagation(); openPhoto(photo) }}
              >
                <Tag className="w-3.5 h-3.5" />
              </Button>
              <Button
                size="icon"
                variant="destructive"
                className="w-7 h-7"
                onClick={(e) => {
                  e.stopPropagation()
                  if (confirm("Remover esta foto?")) onDelete(photo.id)
                }}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}

        {/* Botão adicionar mais */}
        <label className="aspect-square rounded-xl border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary hover:bg-secondary/30 transition-colors">
          <input
            type="file"
            multiple
            accept="image/*"
            className="sr-only"
            onChange={(e) => onUpload(Array.from(e.target.files ?? []))}
          />
          <Upload className="w-6 h-6 text-muted-foreground" />
        </label>
      </div>

      {/* Dialog de labels */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Organizar foto</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="aspect-video relative rounded-xl overflow-hidden bg-muted">
                <Image src={selected.url} alt="Foto" fill className="object-contain" />
              </div>
              <div className="space-y-2">
                <Label>Dia da viagem</Label>
                <Input
                  placeholder="Ex: Dia 1, Dia 2..."
                  value={dayLabel}
                  onChange={(e) => setDayLabel(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Momento</Label>
                <Input
                  placeholder="Ex: Café da manhã, Pôr do sol..."
                  value={momentLabel}
                  onChange={(e) => setMomentLabel(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Legenda</Label>
                <Input
                  placeholder="Uma descrição curta..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={saveLabels}>
                Salvar
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

"use client"

import { useAlbums, useCreateAlbum, useDeleteAlbum } from "@/hooks/useAlbums"
import { PaywallGate } from "@/components/paywall/PaywallGate"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, BookOpen, Image, Trash2, Pencil } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface AlbumsListProps {
  hasAccess: boolean
  userId: string
}

export function AlbumsList({ hasAccess }: AlbumsListProps) {
  const { data: albums = [], isLoading } = useAlbums()
  const createAlbum = useCreateAlbum()
  const deleteAlbum = useDeleteAlbum()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [size, setSize] = useState<"A4" | "A5" | "SQUARE_20" | "SQUARE_30">("A4")
  const [orientation, setOrientation] = useState<"PORTRAIT" | "LANDSCAPE">("PORTRAIT")

  const atLimit = albums.length >= 1 && !hasAccess

  async function handleCreate() {
    if (!title.trim()) return
    await createAlbum.mutateAsync({ title, size, orientation })
    setOpen(false)
    setTitle("")
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div>
      {/* Botão criar */}
      <div className="mb-6">
        {atLimit ? (
          <PaywallGate hasAccess={false} feature="criar mais álbuns">{null}</PaywallGate>
        ) : (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Novo álbum
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar novo álbum</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Nome do álbum</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Viagem para Paris 2024"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tamanho</Label>
                  <Select value={size} onValueChange={(v) => setSize(v as typeof size)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A4">A4 (21×29,7cm)</SelectItem>
                      <SelectItem value="A5">A5 (14,8×21cm)</SelectItem>
                      <SelectItem value="SQUARE_20">Quadrado 20×20cm</SelectItem>
                      <SelectItem value="SQUARE_30">Quadrado 30×30cm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Orientação</Label>
                  <Select
                    value={orientation}
                    onValueChange={(v) => setOrientation(v as typeof orientation)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PORTRAIT">Retrato (vertical)</SelectItem>
                      <SelectItem value="LANDSCAPE">Paisagem (horizontal)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  className="w-full"
                  onClick={handleCreate}
                  disabled={createAlbum.isPending || !title.trim()}
                >
                  {createAlbum.isPending ? "Criando..." : "Criar álbum"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Lista de álbuns */}
      {albums.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">Nenhum álbum ainda</p>
          <p className="text-sm mt-1">Crie seu primeiro álbum de memórias!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album: {
            id: string
            title: string
            status: string
            size: string
            orientation: string
            _count: { photos: number; pages: number }
          }) => (
            <Card key={album.id} className="hover:shadow-md transition-shadow group">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base line-clamp-1">{album.title}</CardTitle>
                  <Badge
                    variant={album.status === "READY" ? "default" : "secondary"}
                    className="text-xs shrink-0"
                  >
                    {album.status === "DRAFT" ? "Rascunho" : album.status === "READY" ? "Pronto" : "Pedido"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {album.size} · {album.orientation === "PORTRAIT" ? "Retrato" : "Paisagem"}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Image className="w-3.5 h-3.5" />
                    {album._count.photos} foto(s)
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {album._count.pages} página(s)
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Link href={`/dashboard/albums/${album.id}`} className="flex-1">
                  <Button variant="default" size="sm" className="w-full gap-1">
                    <Pencil className="w-3.5 h-3.5" />
                    Editar
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => {
                    if (confirm("Remover este álbum?")) deleteAlbum.mutate(album.id)
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

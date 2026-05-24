import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { CreateAlbumInput, UpdateAlbumInput } from "@/lib/validations"

// ─── Fetch helpers ────────────────────────────────────────────────────────────

async function fetchAlbums() {
  const res = await fetch("/api/albums")
  if (!res.ok) throw new Error("Erro ao buscar álbuns")
  return res.json()
}

async function fetchAlbum(albumId: string) {
  const res = await fetch(`/api/albums/${albumId}`)
  if (!res.ok) throw new Error("Álbum não encontrado")
  return res.json()
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useAlbums() {
  return useQuery({ queryKey: ["albums"], queryFn: fetchAlbums })
}

export function useAlbum(albumId: string) {
  return useQuery({
    queryKey: ["albums", albumId],
    queryFn: () => fetchAlbum(albumId),
    enabled: !!albumId,
  })
}

export function useCreateAlbum() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (data: CreateAlbumInput) => {
      const res = await fetch("/api/albums", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Erro ao criar álbum")
      }
      return res.json()
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["albums"] })
      toast.success("Álbum criado!")
    },
    onError: (err: Error) => toast.error(err.message),
  })
}

export function useUpdateAlbum(albumId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (data: UpdateAlbumInput) => {
      const res = await fetch(`/api/albums/${albumId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Erro ao atualizar álbum")
      return res.json()
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["albums", albumId] })
      qc.invalidateQueries({ queryKey: ["albums"] })
      toast.success("Álbum atualizado!")
    },
    onError: (err: Error) => toast.error(err.message),
  })
}

export function useDeleteAlbum() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (albumId: string) => {
      const res = await fetch(`/api/albums/${albumId}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Erro ao deletar álbum")
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["albums"] })
      toast.success("Álbum removido")
    },
    onError: (err: Error) => toast.error(err.message),
  })
}

export function useUploadPhotos(albumId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData()
      files.forEach((f) => formData.append("files", f))
      const res = await fetch(`/api/albums/${albumId}/photos`, {
        method: "POST",
        body: formData,
      })
      if (!res.ok) throw new Error("Erro ao fazer upload")
      return res.json()
    },
    onSuccess: (data: unknown[]) => {
      qc.invalidateQueries({ queryKey: ["albums", albumId] })
      toast.success(`${data.length} foto(s) adicionada(s)!`)
    },
    onError: (err: Error) => toast.error(err.message),
  })
}

export function useDeletePhoto(albumId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (photoId: string) => {
      const res = await fetch(`/api/albums/${albumId}/photos/${photoId}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Erro ao remover foto")
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["albums", albumId] })
      toast.success("Foto removida")
    },
    onError: (err: Error) => toast.error(err.message),
  })
}

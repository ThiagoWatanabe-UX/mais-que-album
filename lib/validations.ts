import { z } from "zod"

// ─── Álbum ───────────────────────────────────────────────────────────────────

export const createAlbumSchema = z.object({
  title: z.string().min(1, "Título obrigatório").max(100, "Máximo 100 caracteres"),
  description: z.string().max(500).optional(),
  size: z.enum(["A4", "A5", "SQUARE_20", "SQUARE_30"]).default("A4"),
  orientation: z.enum(["PORTRAIT", "LANDSCAPE"]).default("PORTRAIT"),
})

export const updateAlbumSchema = createAlbumSchema.partial()

export type CreateAlbumInput = z.infer<typeof createAlbumSchema>
export type UpdateAlbumInput = z.infer<typeof updateAlbumSchema>

// ─── Foto ────────────────────────────────────────────────────────────────────

export const updatePhotoSchema = z.object({
  caption: z.string().max(200).optional(),
  dayLabel: z.string().max(50).optional(),
  momentLabel: z.string().max(50).optional(),
  order: z.number().int().min(0).optional(),
})

export type UpdatePhotoInput = z.infer<typeof updatePhotoSchema>

// ─── Página ──────────────────────────────────────────────────────────────────

export const createPageSchema = z.object({
  albumId: z.string().cuid(),
  layoutType: z.enum(["SINGLE", "GRID_2", "GRID_4", "COLLAGE", "CUSTOM"]).default("GRID_2"),
  order: z.number().int().min(0),
})

export const updatePageSchema = z.object({
  layoutType: z.enum(["SINGLE", "GRID_2", "GRID_4", "COLLAGE", "CUSTOM"]).optional(),
  order: z.number().int().min(0).optional(),
  photoPositions: z
    .array(
      z.object({
        photoId: z.string().cuid(),
        position: z.number().int().min(0),
        scale: z.number().min(0.1).max(3).default(1),
        rotation: z.number().default(0),
      })
    )
    .optional(),
})

export type CreatePageInput = z.infer<typeof createPageSchema>
export type UpdatePageInput = z.infer<typeof updatePageSchema>

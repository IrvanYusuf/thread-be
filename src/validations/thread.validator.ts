import { z } from "zod";

export const createThreadSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .trim()
    .max(255, "Title must be less than 255 characters"),
  content: z.string().min(1, "Content is required").trim(),
  categoryId: z.string().min(1, "Category ID is required").trim(),
});

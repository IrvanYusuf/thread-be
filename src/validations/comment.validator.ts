import { z } from "zod";

export const createCommentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Content is required")
    .max(255, "Content must be at most 255 characters"),
  threadId: z.string().min(1, "Post ID is required"),
});

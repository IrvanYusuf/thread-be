import { z } from "zod";

export const likeThreadSchema = z.object({
  threadId: z.string().min(1, "Thread ID is required").trim(),
});

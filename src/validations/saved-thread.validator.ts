import { z } from "zod";

export const SavedThreadValidatorSchema = z.object({
  threadId: z.string().min(1, "Thread ID is required").trim().optional(),
});

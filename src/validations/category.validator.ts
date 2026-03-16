import { z } from "zod";

export const CategoryValidatorSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
});

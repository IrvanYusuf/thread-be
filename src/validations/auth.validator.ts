import { z } from "zod";

export const LoginValidatorSchema = z.object({
  email: z
    .string()
    .min(4, "Email is required")
    .trim()
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .trim(),
});

export const RegisterValidatorSchema = z.object({
  name: z
    .string()
    .min(3, "Name is required")
    .trim()
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .min(4, "Email is required")
    .trim()
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .trim(),
});

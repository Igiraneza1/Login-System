import { z } from "zod";

export const UserCreationValidation = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  gender: z.enum(["male", "female", "other"]),
});

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(18),
});

export const updateUserSchema = z.object({
  name: z.string(),
  defaultShippingAddress: z.number().nullable(),
  defaultBillingAddress: z.number().nullable(),
});

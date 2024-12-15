import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),

  description: z.string().min(30),

  price: z.number(),

  tags: z.string().optional().array(),
});

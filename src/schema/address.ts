import { z } from "zod";

export const addressSchema = z.object({
  lineOne: z.string(),
  lineTwo: z.string().nullable(),
  city: z.string(),
  country: z.string(),
  pincode: z.string().length(4),
  userId: z.number(),
});

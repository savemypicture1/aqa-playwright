import * as z from "zod";

export const createdCarSchema = z.object({
  id: z.number().int().positive(),
  carBrandId: z.number().int().positive(),
  carModelId: z.number().int().positive(),
  initialMileage: z.number().int().nonnegative(),
  updatedMileageAt: z.string().datetime(),
  mileage: z.number().int().nonnegative(),
  brand: z.string(),
  model: z.string(),
  logo: z.string(),
});

export const createdCarResponseSchema = z.object({
  status: z.literal("ok"),
  data: createdCarSchema,
});

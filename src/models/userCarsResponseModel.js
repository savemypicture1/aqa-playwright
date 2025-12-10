import * as z from "zod";

export const userCarSchema = z.object({
  id: z.number().int().positive(),
  carBrandId: z.number().int().positive(),
  carModelId: z.number().int().positive(),
  initialMileage: z.number().int().nonnegative(),
  updatedMileageAt: z.string().datetime(),
  mileage: z.number().int().nonnegative(),
  brand: z.string().min(1),
  model: z.string().min(1),
  logo: z.string().min(1),
});

export const userCarsResponseSchema = z.object({
  status: z.literal("ok"),
  data: z.array(userCarSchema),
});

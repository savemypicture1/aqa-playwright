import * as z from "zod";

export const carSchema = z.object({
  id: z.number().int().positive(),
  carBrandId: z.number().int().positive(),
  title: z.string().min(1),
});

export const carModelsResponseSchema = z.object({
  status: z.literal("ok"),
  data: z.array(carSchema),
});

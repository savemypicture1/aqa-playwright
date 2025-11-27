import * as z from "zod";

export const SignupResponseModel = z.object({
  status: z.string().min(1),
  data: z.object({
    userId: z.number().positive(),
    photoFilename: z.string().min(1),
    distanceUnits: z.string().min(1),
    currency: z.string().min(1),
  }),
});

import { z } from "zod";

export const PreviewRequestParamSchema = z.object({
  contentType: z.enum(["recipe", "article"]),
  id: z.string().refine((val) => /^\d+$/.test(val), "ID must be a number"),
  secret: z.string(),
});

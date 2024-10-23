import { z } from "zod"

export const summarizeFormSchema = z.object({
  level: z.enum(["strong", "medium", "small"]),
  text: z.string()
})

export type SummarizeFormSchema = z.infer<typeof summarizeFormSchema>

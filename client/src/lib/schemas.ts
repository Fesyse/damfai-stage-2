import { z } from "zod"

const required_error = "Это поле обязательно для заполнения"

export const summarizeFormSchema = z.object({
  level: z.enum(["strong", "medium", "small"], {
    required_error
  }),
  text: z.string({ required_error })
})

export type SummarizeFormSchema = z.infer<typeof summarizeFormSchema>

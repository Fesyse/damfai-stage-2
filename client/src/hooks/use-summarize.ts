import { SummarizeFormSchema } from "@/lib/schemas"
import { summarizeService } from "@/services/summarize.service"
import { useMutation } from "@tanstack/react-query"

export function useSummarize() {
  return useMutation({
    mutationFn: ({ text, level }: SummarizeFormSchema) =>
      summarizeService.summarize(text, level)
  })
}

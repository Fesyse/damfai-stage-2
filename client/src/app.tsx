import { SummarizeForm } from "@/components/summarize-form"
import { Separator } from "@/components/ui/separator"
import { useSummarize } from "@/hooks/use-summarize"
import { SummarizeFormSchema } from "@/lib/schemas"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { SummarizedText } from "./components/summarized-text"

export function App() {
  const { data, isPending, mutate: summarize } = useSummarize()
  const [isSubmitted, setIsSubbmitted] = useState(false)

  const onSubmit = (data: SummarizeFormSchema) => {
    summarize(data)
    setIsSubbmitted(true)
  }

  return (
    <div className="flex h-screen items-center justify-center px-4">
      <main className="flex flex-col gap-5">
        <div className="text-center">
          <h1 className="mb-2 bg-gradient-to-b from-foreground/25 to-foreground bg-clip-text text-center text-5xl font-bold text-transparent dark:from-neutral-200 dark:to-neutral-600 md:text-7xl">
            Damfai
          </h1>
          <p className="text-sm text-foreground/50">
            Решение для 2 этапа проекта Сириус.ИИ от команды Damfai
          </p>
        </div>
        <motion.div className="flex gap-8 rounded-xl border border-border p-6 max-lg:flex-col md:p-10">
          <SummarizeForm
            className={cn({
              "lg:self-center": isSubmitted
            })}
            onSubmit={onSubmit}
          />
          <AnimatePresence>
            {isSubmitted ? (
              <>
                <Separator size={100} className="self-center" />
                <SummarizedText data={data} isPending={isPending} />
              </>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  )
}

import { SummarizeForm } from "@/components/summarize-form"
import { useSummarize } from "@/hooks/use-summarize"
import { SummarizeFormSchema } from "@/lib/schemas"
import { randomNumber } from "@/lib/utils"
import { CopyIcon } from "@radix-ui/react-icons"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "./components/ui/button"

export function App() {
  const { data, isPending, mutate: summarize } = useSummarize()
  const [isSubmitted, setIsSubbmitted] = useState(false)

  const onSubmit = (data: SummarizeFormSchema) => {
    summarize(data)
    setIsSubbmitted(true)
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <main className="flex flex-col gap-5">
        <div className="text-center">
          <h1 className="mb-2 bg-gradient-to-b from-foreground/25 to-foreground bg-clip-text text-center text-5xl font-bold text-transparent dark:from-neutral-200 dark:to-neutral-600 md:text-7xl">
            Damfai
          </h1>
          <p className="text-sm text-foreground/50">
            Решение для 2 этапа проекта Сириус.ИИ от команды Damfai
          </p>
        </div>
        <motion.div className="flex gap-8 rounded-xl border border-border p-10">
          <SummarizeForm onSubmit={onSubmit} />
          <AnimatePresence>
            {/* Separator */}
            {isSubmitted ? (
              <motion.div
                key="separator"
                initial={{ height: 0 }}
                animate={{ height: 100, transition: { delay: 0.5 } }}
                exit={{ height: 0 }}
                className="w-px self-center rounded bg-muted"
              ></motion.div>
            ) : null}

            {/* Summarized text */}
            {isSubmitted ? (
              <motion.div
                key="summarized-text"
                initial={{ width: 0 }}
                animate={{ width: 400 }}
                exit={{ width: 0 }}
              >
                {isPending || !data ? (
                  <SummarizeLoadingState />
                ) : (
                  <motion.div
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-full flex-col justify-between"
                  >
                    <div>
                      <h3 className="mb-2 text-sm text-foreground/50">
                        Суммаризированный текст:
                      </h3>
                      <p>{data.text}</p>
                    </div>
                    <Button
                      onClick={() => {
                        toast.success(
                          `Текст успешно скопирован в буфер обмена!`
                        )
                        navigator.clipboard.writeText(data?.text)
                      }}
                      variant="ghost"
                      className="self-end"
                    >
                      <CopyIcon /> Скопировать
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  )
}

function SummarizeLoadingState() {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "auto" }}
      exit={{ opacity: 0, width: 0 }}
      className="flex flex-wrap gap-2"
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          className="h-4 animate-pulse rounded-full bg-muted"
          initial={{ opacity: 0, width: 0 }}
          animate={{
            opacity: 1,
            width: randomNumber(40, 200),
            transition: { delay: 0.25 * i }
          }}
          exit={{ opacity: 0, width: 0 }}
          key={i}
        ></motion.div>
      ))}
    </motion.div>
  )
}

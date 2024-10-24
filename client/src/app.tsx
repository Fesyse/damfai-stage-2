import { SummarizeForm } from "@/components/summarize-form"
import { useSummarize } from "@/hooks/use-summarize"
import { SummarizeFormSchema } from "@/lib/schemas"
import { cn, randomNumber } from "@/lib/utils"
import { CopyIcon } from "@radix-ui/react-icons"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "./components/ui/button"
import { useMediaQuery } from "./hooks/use-media-query"

export function App() {
  const { data, isPending, mutate: summarize } = useSummarize()
  const [isSubmitted, setIsSubbmitted] = useState(false)

  const onSubmit = (data: SummarizeFormSchema) => {
    summarize(data)
    setIsSubbmitted(true)
  }

  return (
    <div className="flex h-screen items-center justify-center px-2">
      <main className="flex flex-col gap-5">
        <div className="text-center">
          <h1 className="mb-2 bg-gradient-to-b from-foreground/25 to-foreground bg-clip-text text-center text-5xl font-bold text-transparent dark:from-neutral-200 dark:to-neutral-600 md:text-7xl">
            Damfai
          </h1>
          <p className="text-sm text-foreground/50">
            Решение для 2 этапа проекта Сириус.ИИ от команды Damfai
          </p>
        </div>
        <motion.div className="flex flex-col gap-8 rounded-xl border border-border p-6 md:p-10 min-[970px]:flex-row">
          <SummarizeForm onSubmit={onSubmit} />
          <AnimatePresence>
            {isSubmitted ? <Separator /> : null}

            {/* Summarized text */}
            {isSubmitted ? (
              <motion.div
                key="summarized-text"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ width: 0 }}
                className="max-w-[400px]"
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
                    <div className="mb-4">
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

function Separator() {
  const isSmallDevice = useMediaQuery("(max-width: 970px)")
  return (
    <motion.div
      key="separator"
      initial={{ [!isSmallDevice ? "height" : "width"]: 0 }}
      animate={{
        [!isSmallDevice ? "height" : "width"]: 100,
        transition: { delay: 0.5 }
      }}
      exit={{ [!isSmallDevice ? "height" : "width"]: 0 }}
      className={cn("self-center rounded bg-muted", {
        "w-px": !isSmallDevice,
        "h-px": isSmallDevice
      })}
    ></motion.div>
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

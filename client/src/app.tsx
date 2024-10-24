import { SummarizeForm } from "@/components/summarize-form"

export function App() {
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
        <SummarizeForm onSubmit={console.log} />
      </main>
    </div>
  )
}

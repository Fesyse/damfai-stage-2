import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { SummarizeFormSchema, summarizeFormSchema } from "./lib/schemas"

export function App() {
  const form = useForm<SummarizeFormSchema>({
    resolver: zodResolver(summarizeFormSchema)
  })

  const onSubmit = (data: SummarizeFormSchema) => {
    console.log(data)
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <main>
        <h1 className="mb-10 bg-gradient-to-b from-foreground/25 to-foreground bg-clip-text text-center text-5xl font-bold text-transparent dark:from-neutral-200 dark:to-neutral-600 md:text-7xl">
          Damfai
        </h1>
        <Form {...form}>
          <form
            className="flex flex-col gap-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="level"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Уровень сжатия</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите уровень сжатия" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="strong">Сильно</SelectItem>
                      <SelectItem value="medium">Средне</SelectItem>
                      <SelectItem value="small">Слабо</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Выберите насколько сильно нужно сжать/суммаризировать
                    введенный текст
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="text"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Текст</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Введите текст для суммаризации"
                      className="max-h-28 resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Введите найденный вами большой текст, дабы суммаризировать
                    его
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button>Суммаризировать</Button>
          </form>
        </Form>
      </main>
    </div>
  )
}

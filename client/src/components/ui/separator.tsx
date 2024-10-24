import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { type FC } from "react"

type SeparatorProps = {
  size: number
  className?: string
}

export const Separator: FC<SeparatorProps> = ({ size, className }) => {
  const isSmallDevice = useMediaQuery("(max-width: 1024px)")
  return isSmallDevice ? (
    <motion.div
      key="separator-small"
      initial={{ width: 0 }}
      animate={{
        width: size,
        transition: { delay: 0.5 }
      }}
      exit={{ width: 0 }}
      className={cn("h-px rounded bg-foreground/25", className)}
    ></motion.div>
  ) : (
    <motion.div
      key="separator-large"
      initial={{ height: 0 }}
      animate={{
        height: size,
        transition: { delay: 0.5 }
      }}
      exit={{ height: 0 }}
      className={cn("w-px rounded bg-foreground/25", className)}
    ></motion.div>
  )
}

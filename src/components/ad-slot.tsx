import { ReactNode } from "react"

import { cn } from "@/lib/utils"

type AdSlotProps = {
  className?: string
  children?: ReactNode
}

export function AdSlot({ className, children }: AdSlotProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-dashed border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5",
        className
      )}
    >
      {/* Reserved space for future advertisement placement */}
      {children ?? null}
    </div>
  )
}

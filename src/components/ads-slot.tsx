import { ReactNode } from 'react'

interface AdSlotProps {
  className?: string
  children?: ReactNode
}

export function AdSlot({ className, children }: AdSlotProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-100/70 p-4 shadow-inner ${className ?? ''}`.trim()}
    >
      {/* Reserved space for future advertisement placement */}
      {children ?? null}
    </div>
  )
}

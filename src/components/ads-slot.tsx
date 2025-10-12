import { ReactNode } from 'react'
interface AdSlotProps {
  label: string
  description?: string
  className?: string
  children?: ReactNode
}
export function AdSlot({ label, description, className, children }: AdSlotProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-100/70 p-4 text-center text-sm text-slate-600 shadow-inner ${className ?? ''}`.trim()}
    >
      <p className="font-semibold text-slate-700">広告枠：{label}</p>
      {description ? <p className="mt-1 text-xs text-slate-500">{description}</p> : null}
      {children}
    </div>
  )
}

import { cn } from "@/lib/utils"

type AdSlotProps = {
  label: string
  description: string
  className?: string
}

export function AdSlot({ label, description, className }: AdSlotProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-dashed border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5",
        className
      )}
    >
      <div className="space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</span>
        <p className="text-sm text-slate-500">{description}</p>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 py-8 text-center text-sm text-slate-400">
          広告がここに表示されます
        </div>
      </div>
    </div>
  )
}


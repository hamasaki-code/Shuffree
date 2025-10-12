type ToolHeaderProps = {
  title: string
  description: string
  badge?: string
}

export function ToolHeader({ title, description, badge }: ToolHeaderProps) {
  return (
    <div className="space-y-3">
      {badge ? (
        <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
          {badge}
        </span>
      ) : null}
      <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">{title}</h1>
      <p className="max-w-2xl text-base text-slate-500">{description}</p>
    </div>
  )
}

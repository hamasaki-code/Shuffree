"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-lg font-bold tracking-tight text-slate-900">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg">
            🎲
          </span>
          <span className="flex flex-col leading-none">
            <span>Shuffree</span>
            <span className="text-xs font-medium text-slate-500">{siteConfig.shortDescription}</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-2 text-sm font-semibold text-slate-500 md:flex">
          {siteConfig.navigation.map((item) => {
            const active = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 transition hover:text-slate-900",
                  active && "bg-slate-900 text-white shadow-md hover:text-white"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <Link
          href="/about"
          className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900 md:inline-flex"
        >
          このサイトについて
        </Link>
      </div>
    </header>
  )
}

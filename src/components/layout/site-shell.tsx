import type { ReactNode } from "react"

import Link from "next/link"

import { siteConfig } from "@/config/site"

import { SiteHeader } from "./site-header"

type SiteShellProps = {
  children: ReactNode
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="pointer-events-none absolute inset-x-0 top-[-120px] z-0 h-[320px] bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),_transparent_65%)]" />
      <SiteHeader />
      <div className="border-b border-slate-100 bg-white/70 backdrop-blur md:hidden">
        <div className="mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto px-6 py-3 text-sm font-semibold text-slate-500">
          {siteConfig.navigation.map((item) => {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-full border border-slate-200 px-3 py-1 hover:border-slate-300 hover:text-slate-900"
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-6 py-12">{children}</main>
      <footer className="border-t border-slate-100 bg-white/80">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-slate-900">Shuffree</span>
            <p className="max-w-xl text-slate-500">{siteConfig.description}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {siteConfig.footerLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-slate-900">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="bg-slate-950 px-6 py-4 text-center text-xs text-white/60">
          © {new Date().getFullYear()} Shuffree. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

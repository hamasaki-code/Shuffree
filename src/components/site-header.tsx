
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
const navLinks = [
    { href: '/', label: 'ホーム' },
    { href: '/pick', label: 'ランダムピッカー' },
    { href: '/order', label: '順番決め' },
    { href: '/team', label: 'チーム分け' },
    { href: '/tournament', label: 'トーナメント' },
    { href: '/round-robin', label: '総当たり戦' },
]
export function SiteHeader() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    return (
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-900">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-white shadow">🔄</span>
                    <span className="hidden text-xl sm:inline">Shuffree</span>
                </Link>
                <nav className="hidden items-center gap-1 text-sm font-semibold text-slate-600 md:flex">
                    {navLinks.map((link) => {
                        const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`rounded-full px-4 py-2 transition ${isActive ? 'bg-sky-100 text-sky-700' : 'hover:bg-slate-100'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>
                <div className="flex items-center gap-2 md:hidden">
                    <button
                        onClick={() => setOpen((prev) => !prev)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm"
                        aria-label="メニューを開く"
                    >
                        {open ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>
            {open ? (
                <div className="border-t border-slate-200 bg-white px-4 pb-4 pt-2 md:hidden">
                    <nav className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                        {navLinks.map((link) => {
                            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`rounded-xl px-3 py-2 ${isActive ? 'bg-sky-100 text-sky-700' : 'hover:bg-slate-100'
                                        }`}
                                    onClick={() => setOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            ) : null}
        </header>
    )
}

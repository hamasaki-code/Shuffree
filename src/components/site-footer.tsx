import Link from 'next/link'
import { Route } from 'next'

const footerLinks: Array<{ href: Route; label: string }> = [
    { href: '/about' as Route, label: 'Shuffreeについて' },
    { href: '/privacy' as Route, label: 'プライバシーポリシー' },
    { href: '/terms' as Route, label: '利用規約' },
]
export function SiteFooter() {
    const currentYear = new Date().getFullYear()
    return (
        <footer className="border-t border-slate-200 bg-white/90">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-slate-600 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                    <p className="text-base font-semibold text-slate-800">Shuffree</p>
                    <p className="max-w-xl text-sm leading-relaxed">
                        すべての「決めごと」を、無料で自由に。順番決め・抽選・チーム分けなどをワンクリックで。
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    {footerLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="hover:text-slate-900">
                            {link.label}
                        </Link>
                    ))}
                </div>
                <p className="text-xs text-slate-400">© {currentYear} Shuffree</p>
            </div>
        </footer>
    )
}

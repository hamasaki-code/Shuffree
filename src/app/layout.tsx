import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import { SiteHeader } from '../components/site-header'
import { SiteFooter } from '../components/site-footer'
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-app-sans',
  display: 'swap',
})
const siteName = 'Shuffree'
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shuffree.example.com'
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteName}｜決めごとをもっと自由に`,
    template: `%s｜${siteName}`,
  },
  description:
    '順番決め・チーム分け・トーナメント・総当たり戦・抽選をワンクリックで行える無料ツール。Cloudflare Pages対応で高速配信。',
  openGraph: {
    title: `${siteName}｜決めごとをもっと自由に`,
    description:
      'Shuffreeは学校・イベント・ゲームで使える無料のランダムツール集。抽選、チーム分け、トーナメントなどをブラウザだけで実現。',
    siteName,
    type: 'website',
    url: baseUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName}｜決めごとをもっと自由に`,
    description:
      '順番決め・抽選・トーナメントなどのランダムツールを無料で提供。',
  },
  alternates: {
    canonical: baseUrl,
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ja" className="bg-slate-50">
      <body className={`${nunito.variable} min-h-screen bg-slate-50 text-slate-900`}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-20 pt-10 sm:px-6 lg:px-8">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}

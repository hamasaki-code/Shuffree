import type { Route } from "next"
import Link from "next/link"

import { AdSlot } from "@/components/ad-slot"

type Feature = {
  title: string
  description: string
  href: Route
  badge?: string
}

type SellingPoint = {
  title: string
  description: string
}

const features: Feature[] = [
  {
    title: "ランダムピッカー",
    description: "名前や番号から1件を抽選。文化祭や配信でのくじ引きに便利です。",
    href: "/pick",
    badge: "NEW",
  },
  {
    title: "順番決め",
    description: "参加者をランダムに並べ替えて発表順や出演順を公平に決定します。",
    href: "/order",
  },
  {
    title: "チーム分け",
    description: "人数またはチーム数を指定するだけでバランス良くグループ化します。",
    href: "/team",
  },
  {
    title: "トーナメント",
    description: "最大16名の勝ち上がり表を自動生成。BYE処理にも対応しています。",
    href: "/tournament",
  },
  {
    title: "総当たり戦",
    description: "リーグ戦の全対戦カードを一括作成。奇数人数でもBYEを自動調整。",
    href: "/round-robin",
  },
]

const sellingPoints: SellingPoint[] = [
  {
    title: "無料・登録不要",
    description: "ブラウザがあればすぐに利用可能。アカウント作成や課金は一切不要です。",
  },
  {
    title: "Cloudflare Pages対応",
    description: "エッジで高速配信。世界中どこからでも快適にアクセスできます。",
  },
  {
    title: "教育・イベント現場で活躍",
    description: "授業・文化祭・大会運営など、多彩なシーンの「決めごと」をサポートします。",
  },
]

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="grid gap-10 rounded-3xl bg-gradient-to-br from-sky-100 via-white to-white p-10 shadow-sm sm:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-sky-200/70 px-3 py-1 text-xs font-semibold text-sky-700">
            Cloudflare Pages対応
          </span>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            すべての「決めごと」を、無料で自由に。
          </h1>
          <p className="text-lg leading-relaxed text-slate-700">
            Shuffreeは、順番決め・抽選・チーム分け・トーナメント・総当たり戦をワンクリックで生成できるランダムツール集です。教育・イベント・ゲームなど、あらゆるシーンの段取りをスマートにサポートします。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/pick"
              className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-sky-700"
            >
              まずは抽選モードを試す
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
            >
              コンセプトを見る
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-6">
          <AdSlot label="ホーム上部バナー" description="BuySellAds の300×250枠を想定した広告コンポーネント。" className="h-full" />
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">モード一覧</h2>
          <p className="text-slate-600">
            目的に合わせて5つのランダムツールから選択できます。入力内容はブラウザに保存され、次回アクセス時もすぐに呼び出せます。
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.href}
              className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="space-y-3">
                {feature.badge ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-sky-700">
                    {feature.badge}
                  </span>
                ) : null}
                <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
              </div>
              <Link
                href={feature.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 transition hover:text-sky-700"
              >
                ツールを開く →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl bg-white p-10 shadow-sm shadow-slate-900/5 md:grid-cols-3">
        {sellingPoints.map((point) => (
          <div key={point.title} className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">{point.title}</h3>
            <p className="text-sm leading-relaxed text-slate-600">{point.description}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-10 text-white shadow-lg sm:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">アクセスが増えるほど広告収益もアップ</h2>
          <p className="text-sm leading-relaxed text-slate-200">
            BuySellAdsの広告枠を標準搭載。Cloudflare Pagesの無料枠で運用できるため、初期費用ゼロで継続的な収益化が可能です。
          </p>
          <p className="text-sm leading-relaxed text-slate-200">
            結果画面・入力フォーム・ホームに自然な形で広告を配置しながら、ツール本来の使いやすさはそのまま。教育現場でも配慮したUIで運営できます。
          </p>
        </div>
        <AdSlot
          label="結果画面ネイティブ広告"
          description="結果生成後に表示される想定のネイティブ広告枠。スクロール追従やレスポンシブに対応予定。"
          className="bg-white/10 text-white"
        />
      </section>
    </div>
  )
}


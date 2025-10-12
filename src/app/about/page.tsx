import type { Metadata } from "next"

import { Card, CardContent } from "@/components/ui/card"
import { createOgImageUrl } from "@/lib/seo"

const ogImage = createOgImageUrl({ title: "Shuffreeについて", subtitle: "ブランドコンセプトと開発体制" })

export const metadata: Metadata = {
  title: "Shuffreeについて",
  description: "Shuffree のコンセプト・特徴・運用体制をご紹介します。",
  openGraph: {
    images: [ogImage],
  },
  twitter: {
    images: [ogImage],
  },
}

const values = [
  {
    title: "Free & Fair",
    description: "誰でも無料で公平に使える。個人情報を預からず、LocalStorageのみで完結。",
  },
  {
    title: "Fast & Reliable",
    description: "Cloudflare Pages と Edge Cache を活用し、世界中どこでも軽快に利用可能。",
  },
  {
    title: "Friendly UI",
    description: "白とパステルを基調とした親しみやすいUI。誰でも迷わず操作できます。",
  },
]

const roadmap = [
  { version: "v0.1", detail: "順番決めツール + 広告設置 + Cloudflareデプロイ" },
  { version: "v0.2", detail: "チーム分け機能追加" },
  { version: "v0.3", detail: "ランダムピッカー（抽選モード）追加" },
  { version: "v0.4", detail: "トーナメント作成モード" },
  { version: "v0.5", detail: "総当たり戦モード + OG画像生成" },
  { version: "v1.0", detail: "PWA対応・英語化" },
]

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
          About Shuffree
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">Shuffreeについて</h1>
        <p className="max-w-3xl text-base text-slate-600">
          Shuffree は、順番決め・チーム分け・トーナメント・総当たり戦・抽選をワンクリックで行えるオールインワンツールです。学校行事からイベント運営、ゲーム配信まで、あらゆる「決めごと」を気持ちよく進めていただくことを目指しています。
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {values.map((value) => (
          <Card key={value.title} className="border-slate-100 bg-white">
            <CardContent className="space-y-3 p-6">
              <h2 className="text-lg font-bold text-slate-900">{value.title}</h2>
              <p className="text-sm text-slate-600">{value.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="border-slate-100 bg-white">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-bold text-slate-900">運営ポリシー</h2>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>- 広告収益のみで運用し、ツール自体は完全無料。</li>
              <li>- ユーザーデータは保存せず、履歴はブラウザのみで管理。</li>
              <li>- 買い切りの課金やログイン機能は提供しません。</li>
              <li>- 機能改善リクエストは SNS / フィードバックフォームで随時受付。</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="border-slate-100 bg-white">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-bold text-slate-900">ロードマップ</h2>
            <ul className="space-y-2 text-sm text-slate-600">
              {roadmap.map((item) => (
                <li key={item.version} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-16 items-center justify-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-600">
                    {item.version}
                  </span>
                  <span>{item.detail}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-10 text-white shadow-xl">
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold">ブランドコンセプト</h2>
          <p className="text-sm text-white/80">
            Shuffle（混ぜる）と Free（自由・無料）を掛け合わせた Shuffree。軽快で親しみやすいUIと、サイコロアイコンをモチーフにしたロゴで「ランダム」を表現しています。
          </p>
          <p className="text-sm text-white/80">
            フォントは Nunito を中心に丸みと可読性を重視し、色は白とパステルカラーを基調にアクセントとしてインディゴ〜ピンクのグラデーションを採用しています。
          </p>
        </div>
      </section>
    </div>
  )
}

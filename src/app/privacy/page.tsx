import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'Shuffreeのプライバシーポリシー（BuySellAds対応）。',
}
const sections = [
  {
    title: '1. 収集する情報',
    content: [
      'Shuffreeは利用者の個人情報を直接収集しません。',
      'アクセス解析としてCloudflare AnalyticsおよびGoogle Analytics 4を利用し、IPアドレスやデバイス情報を匿名化した形で取得します。',
    ],
  },
  {
    title: '2. 広告配信について',
    content: [
      '当サイトではBuySellAds（BSA）による広告を掲載しています。',
      '広告配信事業者はCookieを使用して、ユーザーの興味に応じた広告を表示する場合があります。',
      'Cookieはブラウザの設定で無効化できますが、一部機能に制限が生じる場合があります。',
    ],
  },
  {
    title: '3. アクセス解析',
    content: [
      'サイト改善を目的にCloudflare AnalyticsおよびGoogle Analytics 4を利用しています。',
      '取得したデータは統計的な分析のみに使用し、第三者へ個人を特定できる形で提供することはありません。',
    ],
  },
  {
    title: '4. お問い合わせ',
    content: [
      'プライバシーに関するお問い合わせは shuffree@example.com までメールでご連絡ください。',
    ],
  },
]
export default function PrivacyPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <span className="badge">Privacy</span>
        <h1 className="text-3xl font-bold text-slate-900">プライバシーポリシー</h1>
        <p className="text-slate-600">
          Shuffreeはユーザーの安心・安全を最優先に、広告運用とアクセス解析を行っています。詳細を以下に記載します。
        </p>
      </header>
      <section className="card space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
              {section.content.map((paragraph) => (
                <li key={paragraph}>{paragraph}</li>
              ))}
            </ul>
          </div>
        ))}
        <p className="text-xs text-slate-400">制定日：2024年1月1日／最終更新日：2024年12月1日</p>
      </section>
    </div>
  )
}

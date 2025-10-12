import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: '利用規約',
  description: 'Shuffreeの利用規約です。',
}
const items = [
  {
    title: '第1条（適用）',
    content:
      '本規約は、利用者がShuffree（以下、本サービス）を利用する際の一切の行為に適用されます。利用者は本規約に同意した上でサービスを利用するものとします。',
  },
  {
    title: '第2条（利用上の禁止事項）',
    list: [
      '法令または公序良俗に反する行為',
      'サーバーに過度な負荷を与える行為',
      '本サービスで生成した結果を不正な目的で利用する行為',
    ],
  },
  {
    title: '第3条（免責事項）',
    content:
      '本サービスで生成される結果はランダム性を保証するものではなく、利用によって生じた損害について運営者は責任を負いません。',
  },
  {
    title: '第4条（サービスの変更・中断）',
    content:
      '運営者は、利用者への事前通知なく、本サービスの内容を変更・追加または中断・終了することができます。',
  },
  {
    title: '第5条（準拠法・管轄）',
    content:
      '本規約は日本法を準拠法とし、本サービスに関して紛争が生じた場合は運営者所在地を管轄する裁判所を第一審の専属的合意管轄とします。',
  },
]
export default function TermsPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <span className="badge">Terms</span>
        <h1 className="text-3xl font-bold text-slate-900">利用規約</h1>
        <p className="text-slate-600">
          Shuffreeをご利用いただく際の注意事項とルールをまとめています。ご利用前に必ずご確認ください。
        </p>
      </header>
      <section className="card space-y-6">
        {items.map((item) => (
          <div key={item.title} className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
            {item.content ? (
              <p className="text-sm leading-relaxed text-slate-600">{item.content}</p>
            ) : null}
            {item.list ? (
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
                {item.list.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
        <p className="text-xs text-slate-400">制定日：2024年1月1日／最終更新日：2024年12月1日</p>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'
import { OrderTool } from './order-tool'
export const metadata: Metadata = {
  title: '順番決め',
  description: '名簿をランダムに並び替えて公平な順番を作成する無料ツール。',
  openGraph: {
    title: '順番決め｜Shuffree',
    description: '学校やイベントの発表順を自動でシャッフル。',
  },
}
export default function Page() {
  return <OrderTool />
}

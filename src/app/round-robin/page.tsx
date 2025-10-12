import type { Metadata } from 'next'
import { RoundRobinTool } from '../round-robin/round-robin-tools'
export const metadata: Metadata = {
  title: '総当たり戦',
  description: 'リーグ戦の全対戦カードを自動生成する無料ツール。BYEも自動調整。',
  openGraph: {
    title: '総当たり戦｜Shuffree',
    description: '奇数人数にも対応した総当たり戦スケジュールをワンクリック生成。',
  },
}
export default function Page() {
  return <RoundRobinTool />
}

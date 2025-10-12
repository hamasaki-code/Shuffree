
import type { Metadata } from 'next'
import { TournamentTool } from './tournament-tool'
export const metadata: Metadata = {
  title: 'トーナメント',
  description: '勝ち上がり式トーナメント表をBYE込みで自動生成する無料ツール。',
  openGraph: {
    title: 'トーナメント｜Shuffree',
    description: '2〜16名対応の自動トーナメント表ジェネレーター。',
  },
}
export default function Page() {
  return <TournamentTool />
}

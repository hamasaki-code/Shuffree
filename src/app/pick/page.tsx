import type { Metadata } from 'next'
import { PickTool } from './pick-tool'
export const metadata: Metadata = {
  title: 'ランダムピッカー',
  description:
    '名前や数字を入力して1つだけ抽選できる無料ツール。配信や授業のくじ引きに最適です。',
  openGraph: {
    title: 'ランダムピッカー｜Shuffree',
    description:
      '文化祭やイベントで使える抽選機能。名前を入力するだけで1名をランダム選出。',
  },
}
export default function Page() {
  return <PickTool />
}

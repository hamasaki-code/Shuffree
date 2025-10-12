import type { Metadata } from 'next'
import { TeamTool } from './team-tool'
export const metadata: Metadata = {
  title: 'チーム分け',
  description: '人数とチーム数を指定して自動でグループ分けを行う無料ツール。',
  openGraph: {
    title: 'チーム分け｜Shuffree',
    description: '学校・イベントでの班決めにぴったりな自動チーム分けツール。',
  },
}
export default function Page() {
  return <TeamTool />
}

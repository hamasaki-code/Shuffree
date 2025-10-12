export const siteConfig = {
  name: 'Shuffree',
  shortDescription: 'すべての決めごとを、無料で自由に。',
  description:
    '順番決め・チーム分け・トーナメント・総当たり・抽選など、あらゆる「決めごと」をブラウザだけで完結できる無料ツール。',
  url: 'https://shuffree.app',
  twitter: '@shuffree_app',
  locale: 'ja_JP',
  keywords: [
    '抽選ツール',
    '順番決め',
    'チーム分け',
    'トーナメント作成',
    '総当たり表',
    'ランダムピッカー',
  ],
  contactEmail: 'hello@shuffree.app',
  navigation: [
    { href: '/pick', label: 'ランダムピッカー' },
    { href: '/order', label: '順番決め' },
    { href: '/team', label: 'チーム分け' },
    { href: '/tournament', label: 'トーナメント' },
    { href: '/round-robin', label: '総当たり戦' },
  ],
  footerLinks: [
    { href: '/about', label: 'Shuffreeについて' },
    { href: '/privacy', label: 'プライバシーポリシー' },
    { href: '/terms', label: '利用規約' },
  ],
}

export type ToolLink = {
  href: string
  label: string
  description: string
}

export const toolLinks: ToolLink[] = [
  {
    href: '/pick',
    label: 'ランダムピッカー（抽選）',
    description: '入力した名前や数字から1件をランダム抽選します。',
  },
  {
    href: '/order',
    label: '順番決め',
    description: 'メンバーをシャッフルしてランダムな順序を生成します。',
  },
  {
    href: '/team',
    label: 'チーム分け',
    description: 'チーム数または人数指定でバランス良くグルーピングします。',
  },
  {
    href: '/tournament',
    label: 'トーナメント',
    description: '勝ち上がりトーナメント表を自動で生成します。',
  },
  {
    href: '/round-robin',
    label: '総当たり戦',
    description: '全員と対戦できる総当たり表を作成します。',
  },
]

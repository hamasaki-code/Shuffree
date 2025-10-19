'use client'
import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AdSlot } from '../../components/ad-slot'
import { ShareButtons } from '../../components/share-buttons'
import { usePersistedText } from '../../hooks/use-persisted-text'
import { parseEntries, shuffleArray } from '../../lib/tools'
export function OrderTool() {
    const [input, setInput] = usePersistedText('shuffree-order', '')
    const [order, setOrder] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const [animationKey, setAnimationKey] = useState(0)
    const entries = useMemo(() => parseEntries(input), [input])
    const handleShuffle = () => {
        if (entries.length < 2) {
            setError('2名以上のメンバーを入力してください。')
            return
        }
        setError(null)
        const shuffled = shuffleArray(entries)
        setOrder(shuffled)
        setAnimationKey((key) => key + 1)
    }
    const canShuffle = entries.length >= 2
    return (
        <div className="space-y-10">
            <header className="space-y-4">
                <span className="badge">順番決め</span>
                <h1 className="text-3xl font-bold text-slate-900">メンバーをランダムに並び替える</h1>
                <p className="text-slate-600">
                    発表順や出場順をサッと決めたいときに便利なシャッフル機能です。名簿を貼り付けるだけで公平な順番が完成します。
                </p>
            </header>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
                <section className="card space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="order-input" className="text-sm font-semibold text-slate-700">
                            メンバー一覧
                        </label>
                        <textarea
                            id="order-input"
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            placeholder={'例)\n1年1組 田中\n1年1組 佐藤\n1年1組 鈴木'}
                            className="h-48 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm shadow-inner focus:border-sky-400 focus:outline-none"
                        />
                        <p className="text-xs text-slate-500">名簿をコピー＆ペーストすると便利です。重複行はそのまま抽選対象になります。</p>
                    </div>
                    <button
                        onClick={handleShuffle}
                        disabled={!canShuffle}
                        className="inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                        順番を決める
                    </button>
                    {error ? <p className="text-sm text-rose-600">{error}</p> : null}
                    {/* 広告枠（実際の広告を挿入する際に使用） */}
                    <AdSlot />
                </section>
                <aside className="space-y-6">
                    <div className="card space-y-4">
                        <h2 className="text-lg font-semibold text-slate-900">決定した順番</h2>
                        <div className="space-y-2">
                            <AnimatePresence mode="wait">
                                {order.length > 0 ? (
                                    <motion.ol
                                        key={animationKey}
                                        initial={{ y: 12, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4, ease: 'easeOut' }}
                                        className="space-y-2"
                                    >
                                        {order.map((member, index) => (
                                            <li
                                                key={`${member}-${index}`}
                                                className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-2 text-sm text-slate-700 shadow-inner"
                                            >
                                                <span className="font-semibold text-slate-500">{index + 1}位</span>
                                                <span className="text-slate-800">{member}</span>
                                            </li>
                                        ))}
                                    </motion.ol>
                                ) : (
                                    <motion.p
                                        key="placeholder"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-sm text-slate-500"
                                    >
                                        シャッフルすると並び順がこちらに表示されます。
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="card space-y-4">
                        <h3 className="text-sm font-semibold text-slate-800">結果をシェア</h3>
                        <ShareButtons title="順番決め" text="Shuffreeで順番を決めました！" />
                    </div>
                </aside>
            </div>
        </div>
    )
}

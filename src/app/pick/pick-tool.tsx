'use client'
import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AdSlot } from '../../components/ads-slot'
import { ShareButtons } from '../../components/share-buttons'
import { usePersistedText } from '../../hooks/use-persisted-text'
import { parseEntries } from '../../lib/tools'
export function PickTool() {
    const [input, setInput] = usePersistedText('shuffree-pick', '')
    const [result, setResult] = useState<string | null>(null)
    const [history, setHistory] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const [animationKey, setAnimationKey] = useState(0)
    const entries = useMemo(() => parseEntries(input), [input])
    const handlePick = () => {
        if (entries.length === 0) {
            setError('抽選対象を1つ以上入力してください。')
            return
        }
        setError(null)
        const chosen = entries[Math.floor(Math.random() * entries.length)]
        setResult(chosen)
        setHistory((prev) => [chosen, ...prev].slice(0, 5))
        setAnimationKey((key) => key + 1)
    }
    const canPick = entries.length > 0
    return (
        <div className="space-y-10">
            <header className="space-y-4">
                <span className="badge">抽選・ランダムピッカー</span>
                <h1 className="text-3xl font-bold text-slate-900">ランダムで1つだけ選ぶ抽選ツール</h1>
                <p className="text-slate-600">
                    名前や番号を改行区切りで入力すると、その中から1つをランダム抽選します。文化祭の出番決め、プレゼント企画の当選者選定などにご利用ください。
                </p>
            </header>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
                <section className="card space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="picker-input" className="text-sm font-semibold text-slate-700">
                            抽選対象（1行につき1名・1項目）
                        </label>
                        <textarea
                            id="picker-input"
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            placeholder={'例)\n赤組\n青組\n緑組'}
                            className="h-48 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm shadow-inner focus:border-sky-400 focus:outline-none"
                        />
                        <p className="text-xs text-slate-500">最後に入力した内容はブラウザに保存され、次回アクセス時に自動復元されます。</p>
                    </div>
                    <button
                        onClick={handlePick}
                        disabled={!canPick}
                        className="inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                        抽選する
                    </button>
                    {error ? <p className="text-sm text-rose-600">{error}</p> : null}
                    <AdSlot label="入力画面下部バナー" description="スクロール時に表示される小型バナー広告枠。" />
                </section>
                <aside className="space-y-6">
                    <div className="card space-y-4">
                        <h2 className="text-lg font-semibold text-slate-900">抽選結果</h2>
                        <div className="relative flex h-40 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-50 via-white to-white p-6 shadow-inner">
                            <AnimatePresence mode="wait">
                                {result ? (
                                    <motion.p
                                        key={animationKey}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.5, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: 'easeOut' }}
                                        className="text-center text-2xl font-bold text-sky-700"
                                    >
                                        {result}
                                    </motion.p>
                                ) : (
                                    <motion.p
                                        key="placeholder"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center text-sm text-slate-500"
                                    >
                                        抽選ボタンを押すと結果が表示されます。
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                        <AdSlot label="結果上部ネイティブ広告" description="抽選後に表示するネイティブ枠。" />
                    </div>
                    <div className="card space-y-4">
                        <h3 className="text-sm font-semibold text-slate-800">最近の抽選結果</h3>
                        {history.length > 0 ? (
                            <ol className="space-y-2 text-sm text-slate-600">
                                {history.map((item, index) => (
                                    <li key={`${item}-${index}`} className="flex items-center gap-2">
                                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold text-sky-700">
                                            {index + 1}
                                        </span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ol>
                        ) : (
                            <p className="text-sm text-slate-500">抽選履歴は最新5件まで表示されます。</p>
                        )}
                    </div>
                    <div className="card space-y-4">
                        <h3 className="text-sm font-semibold text-slate-800">結果をシェア</h3>
                        <ShareButtons title="ランダムピッカー" text="Shuffreeで抽選しました！" />
                    </div>
                </aside>
            </div>
        </div>
    )
}

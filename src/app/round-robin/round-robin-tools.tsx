'use client'
import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AdSlot } from '../../components/ad-slot'
import { ShareButtons } from '../../components/share-buttons'
import { usePersistedText } from '../../hooks/use-persisted-text'
import { createRoundRobin, parseEntries, RoundRobinRound } from '../../lib/tools'
export function RoundRobinTool() {
    const [input, setInput] = usePersistedText('shuffree-roundrobin', '')
    const [rounds, setRounds] = useState<RoundRobinRound[]>([])
    const [error, setError] = useState<string | null>(null)
    const [animationKey, setAnimationKey] = useState(0)
    const entries = useMemo(() => parseEntries(input), [input])
    const handleGenerate = () => {
        if (entries.length < 2) {
            setError('2名以上の参加者を入力してください。')
            return
        }
        if (entries.length > 20) {
            setError('参加者は最大20名までを推奨しています。')
            return
        }
        setError(null)
        const fixtures = createRoundRobin(entries)
        setRounds(fixtures)
        setAnimationKey((key) => key + 1)
    }
    const canGenerate = entries.length >= 2
    return (
        <div className="space-y-10">
            <header className="space-y-4">
                <span className="badge">総当たり戦</span>
                <h1 className="text-3xl font-bold text-slate-900">リーグ戦の対戦表を一括作成</h1>
                <p className="text-slate-600">
                    参加メンバーを入力するだけで、全員が公平に戦える総当たり戦のスケジュールを作成します。奇数人数の場合は自動的に休み（BYE）を設定します。
                </p>
            </header>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
                <section className="card space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="roundrobin-input" className="text-sm font-semibold text-slate-700">
                            参加者リスト
                        </label>
                        <textarea
                            id="roundrobin-input"
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            placeholder={'例)\n1年A組\n1年B組\n1年C組'}
                            className="h-48 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm shadow-inner focus:border-sky-400 focus:outline-none"
                        />
                        <p className="text-xs text-slate-500">奇数人数の場合は自動的にBYEが割り振られ、休みの回が表示されます。</p>
                    </div>
                    <button
                        onClick={handleGenerate}
                        disabled={!canGenerate}
                        className="inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                        対戦表を作成
                    </button>
                    {error ? <p className="text-sm text-rose-600">{error}</p> : null}
                    {/* 広告枠（実際の広告を挿入する際に使用） */}
                    <AdSlot />
                </section>
                <aside className="space-y-6">
                    <div className="card space-y-4">
                        <h2 className="text-lg font-semibold text-slate-900">総当たり戦スケジュール</h2>
                        <div className="overflow-x-auto">
                            <AnimatePresence mode="wait">
                                {rounds.length > 0 ? (
                                    <motion.div
                                        key={animationKey}
                                        initial={{ x: 24, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4, ease: 'easeOut' }}
                                        className="flex gap-6"
                                    >
                                        {rounds.map((round) => (
                                            <div key={round.name} className="min-w-[220px] rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-inner">
                                                <p className="text-sm font-semibold text-slate-700">{round.name}</p>
                                                <ul className="mt-3 space-y-3 text-sm text-slate-600">
                                                    {round.matches.map((match, index) => (
                                                        <li key={`${round.name}-${index}`} className="rounded-xl bg-white/80 p-3 shadow">
                                                            <p className="rounded-lg bg-slate-100 px-3 py-1 text-slate-800">
                                                                {match.home} vs {match.away}
                                                            </p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.p
                                        key="placeholder"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-sm text-slate-500"
                                    >
                                        参加者を入力して作成すると総当たり戦のスケジュールが表示されます。
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="card space-y-4">
                        <h3 className="text-sm font-semibold text-slate-800">結果をシェア</h3>
                        <ShareButtons title="総当たり戦" text="Shuffreeで総当たり戦を組みました！" />
                    </div>
                </aside>
            </div>
        </div>
    )
}

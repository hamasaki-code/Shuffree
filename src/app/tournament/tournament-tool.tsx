'use client'
import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AdSlot } from '../../components/ad-slot'
import { ShareButtons } from '../../components/share-buttons'
import { usePersistedText } from '../../hooks/use-persisted-text'
import { createTournament, parseEntries, BracketRound } from '../../lib/tools'
export function TournamentTool() {
    const [input, setInput] = usePersistedText('shuffree-tournament', '')
    const [rounds, setRounds] = useState<BracketRound[]>([])
    const [error, setError] = useState<string | null>(null)
    const [animationKey, setAnimationKey] = useState(0)
    const entries = useMemo(() => parseEntries(input), [input])
    const handleGenerate = () => {
        if (entries.length < 2) {
            setError('2名以上のエントリーが必要です。')
            return
        }
        if (entries.length > 16) {
            setError('参加者は最大16名まで対応しています。')
            return
        }
        setError(null)
        const bracket = createTournament(entries)
        setRounds(bracket)
        setAnimationKey((key) => key + 1)
    }
    const canGenerate = entries.length >= 2
    return (
        <div className="space-y-10">
            <header className="space-y-4">
                <span className="badge">トーナメント</span>
                <h1 className="text-3xl font-bold text-slate-900">勝ち上がり表を自動生成</h1>
                <p className="text-slate-600">
                    参加者を入力すると、BYE調整済みのトーナメント表を自動作成します。勝者欄にはラウンド名が表示され、進行が分かりやすくなります。
                </p>
            </header>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
                <section className="card space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="tournament-input" className="text-sm font-semibold text-slate-700">
                            参加者リスト
                        </label>
                        <textarea
                            id="tournament-input"
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            placeholder={'例)\nAチーム\nBチーム\nCチーム\nDチーム'}
                            className="h-48 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm shadow-inner focus:border-sky-400 focus:outline-none"
                        />
                        <p className="text-xs text-slate-500">最大16名まで登録可能です。17名以上の場合は事前に予選を行ってください。</p>
                    </div>
                    <button
                        onClick={handleGenerate}
                        disabled={!canGenerate}
                        className="inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                        トーナメント表を作成
                    </button>
                    {error ? <p className="text-sm text-rose-600">{error}</p> : null}
                    {/* 広告枠（実際の広告を挿入する際に使用） */}
                    <AdSlot />
                </section>
                <aside className="space-y-6">
                    <div className="card space-y-4">
                        <h2 className="text-lg font-semibold text-slate-900">トーナメント表</h2>
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
                                            <div key={round.name} className="min-w-[180px] rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-inner">
                                                <p className="text-sm font-semibold text-slate-700">{round.name}</p>
                                                <ul className="mt-3 space-y-3 text-sm text-slate-600">
                                                    {round.matches.map((match, index) => (
                                                        <li key={`${round.name}-${index}`} className="rounded-xl bg-white/80 p-3 shadow">
                                                            <div className="flex items-center justify-between">
                                                                <span className="font-semibold text-slate-500">{index + 1}試合目</span>
                                                            </div>
                                                            <div className="mt-2 space-y-1">
                                                                <p className="rounded-lg bg-slate-100 px-3 py-1 text-slate-800">{match.home}</p>
                                                                <p className="rounded-lg bg-slate-100 px-3 py-1 text-slate-800">{match.away}</p>
                                                            </div>
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
                                        参加者を入力して作成するとトーナメント表が表示されます。
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="card space-y-4">
                        <h3 className="text-sm font-semibold text-slate-800">結果をシェア</h3>
                        <ShareButtons title="トーナメント" text="Shuffreeでトーナメント表を作成しました！" />
                    </div>
                </aside>
            </div>
        </div>
    )
}

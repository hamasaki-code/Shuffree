'use client'
import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AdSlot } from '../../components/ad-slot'
import { ShareButtons } from '../../components/share-buttons'
import { usePersistedText } from '../../hooks/use-persisted-text'
import { createTeams, parseEntries, TeamResult } from '../../lib/tools'
type TeamMode = 'teamCount' | 'teamSize'
export function TeamTool() {
    const [input, setInput] = usePersistedText('shuffree-team', '')
    const [mode, setMode] = useState<TeamMode>('teamCount')
    const [value, setValue] = useState(2)
    const [teams, setTeams] = useState<TeamResult[]>([])
    const [error, setError] = useState<string | null>(null)
    const [animationKey, setAnimationKey] = useState(0)
    const entries = useMemo(() => parseEntries(input), [input])
    const handleTeamSplit = () => {
        if (entries.length < 2) {
            setError('2名以上のメンバーを入力してください。')
            return
        }
        if (!Number.isFinite(value) || value <= 0) {
            setError('チーム数または人数を正しく入力してください。')
            return
        }
        setError(null)
        const result = createTeams(entries, mode, value)
        setTeams(result)
        setAnimationKey((key) => key + 1)
    }
    const canGenerate = entries.length >= 2
    return (
        <div className="space-y-10">
            <header className="space-y-4">
                <span className="badge">チーム分け</span>
                <h1 className="text-3xl font-bold text-slate-900">人数・チーム数で自動グループ化</h1>
                <p className="text-slate-600">
                    メンバーを入力し、チーム数または1チームの人数を選ぶだけで、バランス良いグループを即時生成します。奇数人数にも対応しています。
                </p>
            </header>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
                <section className="card space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="team-input" className="text-sm font-semibold text-slate-700">
                            メンバー一覧
                        </label>
                        <textarea
                            id="team-input"
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            placeholder={'例)\n田中\n佐藤\n鈴木\n高橋\n伊藤\n渡辺'}
                            className="h-48 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm shadow-inner focus:border-sky-400 focus:outline-none"
                        />
                        <p className="text-xs text-slate-500">入力したメンバーは自動的にシャッフルされ、均等に配分されます。</p>
                    </div>
                    <div className="grid gap-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                        <div className="flex items-center gap-3">
                            <input
                                id="mode-count"
                                type="radio"
                                name="team-mode"
                                value="teamCount"
                                checked={mode === 'teamCount'}
                                onChange={() => setMode('teamCount')}
                                className="h-4 w-4"
                            />
                            <label htmlFor="mode-count" className="flex-1">
                                チーム数で分ける
                            </label>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                id="mode-size"
                                type="radio"
                                name="team-mode"
                                value="teamSize"
                                checked={mode === 'teamSize'}
                                onChange={() => setMode('teamSize')}
                                className="h-4 w-4"
                            />
                            <label htmlFor="mode-size" className="flex-1">
                                1チームの人数で分ける
                            </label>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="team-value" className="text-sm font-semibold text-slate-700">
                            {mode === 'teamCount' ? 'チーム数' : '1チームの人数'}
                        </label>
                        <input
                            id="team-value"
                            type="number"
                            min={1}
                            value={value}
                            onChange={(event) => setValue(Number(event.target.value))}
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-sky-400 focus:outline-none"
                        />
                        <p className="text-xs text-slate-500">最大8チームまで自動命名され、それ以上は「チーム9」などの番号になります。</p>
                    </div>
                    <button
                        onClick={handleTeamSplit}
                        disabled={!canGenerate}
                        className="inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                        チーム分けを実行
                    </button>
                    {error ? <p className="text-sm text-rose-600">{error}</p> : null}
                    <AdSlot label="入力画面下部バナー" description="スクロールに追従する広告枠。" />
                </section>
                <aside className="space-y-6">
                    <div className="card space-y-4">
                        <h2 className="text-lg font-semibold text-slate-900">チーム一覧</h2>
                        <AnimatePresence mode="wait">
                            {teams.length > 0 ? (
                                <motion.div
                                    key={animationKey}
                                    initial={{ y: 16, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4, ease: 'easeOut' }}
                                    className="space-y-4"
                                >
                                    {teams.map((team) => (
                                        <div key={team.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-inner">
                                            <p className="text-sm font-semibold text-slate-700">{team.name}</p>
                                            {team.members.length > 0 ? (
                                                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                                                    {team.members.map((member) => (
                                                        <li key={member} className="rounded-lg bg-white/70 px-3 py-1 shadow">
                                                            {member}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="mt-2 text-xs text-slate-400">メンバー未割り当て</p>
                                            )}
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
                                    チーム分けを実行するとここに結果が表示されます。
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="card space-y-4">
                        <h3 className="text-sm font-semibold text-slate-800">結果をシェア</h3>
                        <ShareButtons title="チーム分け" text="Shuffreeでチームを組みました！" />
                    </div>
                </aside>
            </div>
        </div>
    )
}

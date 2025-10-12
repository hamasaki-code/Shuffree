"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEntries } from "@/hooks/use-entries"
import { createRoundRobin, type RoundRobinRound } from "@/lib/round-robin"

const samplePlayers = ["Team A", "Team B", "Team C", "Team D", "Team E"].join("\n")

export function RoundRobinClient() {
  const { input, setInput, reset, entries } = useEntries("round-robin")
  const [rounds, setRounds] = useState<RoundRobinRound[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = () => {
    if (entries.length < 2) {
      setError("2名以上を入力してください。")
      return
    }
    const generated = createRoundRobin(entries)
    setRounds(generated)
    setError(null)
  }

  const handleSample = () => {
    setInput(samplePlayers)
    setError(null)
  }

  const handleReset = () => {
    reset()
    setRounds([])
    setError(null)
  }

  const totalMatches = useMemo(() => rounds.reduce((acc, round) => acc + round.matches.filter((match) => !match.isBye).length, 0), [rounds])

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="round-robin-input">参加者リスト</Label>
        <Textarea
          id="round-robin-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="例）\nチームA\nチームB\n..."
        />
        {error ? <p className="text-sm font-semibold text-red-500">{error}</p> : null}
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={handleGenerate}>総当たり表を作成</Button>
          <Button variant="secondary" onClick={handleSample}>
            サンプルを使う
          </Button>
          <Button variant="outline" onClick={handleReset}>
            入力をクリア
          </Button>
        </div>
      </div>

      <Card className="border-slate-100 bg-white">
        <CardHeader>
          <h2 className="text-xl font-bold text-slate-900">総当たり表</h2>
          <p className="text-sm text-slate-500">全ての組み合わせを自動で作成します。合計試合数：{totalMatches}試合</p>
        </CardHeader>
        <CardContent>
          {rounds.length === 0 ? (
            <p className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm font-semibold text-slate-400">
              総当たり表を作成するとここに表示されます。
            </p>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {rounds.map((round) => (
                  <motion.div
                    key={`round-${round.round}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-3 rounded-3xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <h3 className="text-sm font-semibold text-indigo-600">Round {round.round}</h3>
                    <ul className="space-y-2">
                      {round.matches.map((match, index) => (
                        <li
                          key={`round-${round.round}-match-${index}`}
                          className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
                        >
                          <span>
                            {match.home} vs {match.away}
                          </span>
                          {match.isBye ? (
                            <span className="text-xs font-semibold text-slate-400">BYE</span>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

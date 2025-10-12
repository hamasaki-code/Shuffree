"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEntries } from "@/hooks/use-entries"
import { createTournamentBracket, type BracketSlot } from "@/lib/tournament"

const sampleParticipants = [
  "Red Dragons",
  "Blue Sharks",
  "Green Owls",
  "Yellow Foxes",
  "Purple Wolves",
  "Orange Tigers",
  "Silver Hawks",
  "Black Bears",
].join("\n")

function renderSlot(slot: BracketSlot) {
  switch (slot.type) {
    case "participant":
      return slot.name
    case "bye":
      return "BYE（不戦勝）"
    case "winner":
      return `R${slot.round} 勝者（Match ${slot.match}）`
    default:
      return ""
  }
}

export function TournamentClient() {
  const { input, setInput, reset, entries } = useEntries("tournament")
  const [error, setError] = useState<string | null>(null)
  const [generated, setGenerated] = useState(() => createTournamentBracket([]))
  const participantCount = entries.length

  const handleGenerate = () => {
    if (participantCount < 2) {
      setError("2名以上を入力してください。")
      return
    }

    if (participantCount > 16) {
      setError("最大16名まで対応しています。")
      return
    }

    const bracket = createTournamentBracket(entries)
    setGenerated(bracket)
    setError(null)
  }

  const handleSample = () => {
    setInput(sampleParticipants)
    setError(null)
  }

  const handleReset = () => {
    reset()
    setGenerated(createTournamentBracket([]))
    setError(null)
  }

  const hasBye = useMemo(() => {
    return generated.rounds.some((round) =>
      round.some((match) => match.slots.some((slot) => slot.type === "bye"))
    )
  }, [generated.rounds])

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="tournament-input">参加者リスト（最大16名）</Label>
        <Textarea
          id="tournament-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="例）\nTeam A\nTeam B\n..."
        />
        {error ? <p className="text-sm font-semibold text-red-500">{error}</p> : null}
        <div className="text-xs text-slate-500">現在の参加者数：{participantCount}名</div>
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={handleGenerate}>トーナメントを作成</Button>
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
          <h2 className="text-xl font-bold text-slate-900">ブラケット</h2>
          <p className="text-sm text-slate-500">各ラウンドの勝者が次のマッチに進みます。</p>
        </CardHeader>
        <CardContent>
          {generated.rounds.length === 0 ? (
            <p className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm font-semibold text-slate-400">
              参加者を登録してトーナメントを生成するとここに表示されます。
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {generated.rounds.map((round, roundIndex) => (
                <div key={`round-${roundIndex}`} className="space-y-3 rounded-3xl border border-slate-100 bg-slate-50 p-4">
                  <h3 className="text-sm font-semibold text-indigo-600">Round {roundIndex + 1}</h3>
                  <ul className="space-y-2">
                    <AnimatePresence>
                      {round.map((match) => (
                        <motion.li
                          key={`round-${roundIndex}-match-${match.match}`}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.18 }}
                          className="space-y-1 rounded-2xl border border-slate-100 bg-white px-3 py-2"
                        >
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Match {match.match}
                          </p>
                          <div className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                            <span>① {renderSlot(match.slots[0])}</span>
                            <span>② {renderSlot(match.slots[1])}</span>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </div>
              ))}
            </div>
          )}
          {hasBye ? (
            <p className="mt-4 text-xs font-semibold text-slate-500">
              ※ 参加人数が2のべき乗でない場合は BYE（不戦勝）が自動で挿入されます。
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { UsersRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEntries } from "@/hooks/use-entries"
import { createTeams, type TeamOptions } from "@/lib/team"

const sampleMembers = [
  "Alice",
  "Bob",
  "Carlos",
  "Daisuke",
  "Emma",
  "Fumika",
  "George",
  "Hana",
  "Itsuki",
  "Jun",
  "Karen",
  "Leo",
].join("\n")

export function TeamClient() {
  const { input, setInput, reset, entries } = useEntries("team")
  const [mode, setMode] = useState<TeamOptions["mode"]>("teams")
  const [teamCount, setTeamCount] = useState(2)
  const [teamSize, setTeamSize] = useState(3)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<ReturnType<typeof createTeams>>([])

  const canGenerate = entries.length >= 2

  const handleGenerate = () => {
    if (!canGenerate) {
      setError("2名以上のメンバーを入力してください。")
      return
    }

    const option: TeamOptions =
      mode === "teams"
        ? { mode: "teams", teamCount: Math.max(1, Math.floor(teamCount)) }
        : { mode: "size", teamSize: Math.max(1, Math.floor(teamSize)) }

    const generated = createTeams(entries, option)
    setResults(generated)
    setError(null)
  }

  const handleSample = () => {
    setInput(sampleMembers)
    setError(null)
  }

  const handleReset = () => {
    reset()
    setResults([])
    setError(null)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="team-input">メンバーリスト</Label>
        <Textarea
          id="team-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="例）\n山田\n佐藤\n..."
        />
        {error ? <p className="text-sm font-semibold text-red-500">{error}</p> : null}
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={handleGenerate}>チームを作成</Button>
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
          <h2 className="text-xl font-bold text-slate-900">チーム設定</h2>
          <p className="text-sm text-slate-500">チーム数か人数で柔軟に分割できます。</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <button
              type="button"
              onClick={() => setMode("teams")}
              aria-pressed={mode === "teams"}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                mode === "teams"
                  ? "border-indigo-500 bg-indigo-50 text-indigo-600 shadow-sm"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              <UsersRound className="h-5 w-5" />
              <div>
                <p className="text-sm font-semibold">チーム数を指定</p>
                <p className="text-xs text-slate-500">例：4チームに分ける</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setMode("size")}
              aria-pressed={mode === "size"}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                mode === "size"
                  ? "border-indigo-500 bg-indigo-50 text-indigo-600 shadow-sm"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              <UsersRound className="h-5 w-5" />
              <div>
                <p className="text-sm font-semibold">1チームの人数を指定</p>
                <p className="text-xs text-slate-500">例：3人ずつに分ける</p>
              </div>
            </button>
          </div>
          {mode === "teams" ? (
            <div className="space-y-2">
              <Label htmlFor="team-count">チーム数</Label>
              <Input
                id="team-count"
                type="number"
                min={1}
                value={teamCount}
                onChange={(event) => setTeamCount(Number(event.target.value))}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="team-size">1チームの人数</Label>
              <Input
                id="team-size"
                type="number"
                min={1}
                value={teamSize}
                onChange={(event) => setTeamSize(Number(event.target.value))}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-slate-100 bg-white">
        <CardHeader>
          <h2 className="text-xl font-bold text-slate-900">チーム分け結果</h2>
          <p className="text-sm text-slate-500">各チームの人数バランスを自動調整します。</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {results.length === 0 ? (
            <p className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm font-semibold text-slate-400">
              チームを作成すると結果が表示されます。
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              <AnimatePresence>
                {results.map((team, index) => (
                  <motion.div
                    key={`${team.name}-${index}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.2, delay: index * 0.04 }}
                    className="space-y-3 rounded-3xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-indigo-600">{team.name}</p>
                      <span className="text-xs font-semibold text-slate-500">{team.members.length}人</span>
                    </div>
                    <ul className="space-y-2">
                      {team.members.map((member) => (
                        <li
                          key={member}
                          className="rounded-2xl border border-slate-100 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
                        >
                          {member}
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

"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEntries } from "@/hooks/use-entries"

const sampleParticipants = ["Alice", "Bob", "Carlos", "Daisuke", "Emma", "Fumika"].join("\n")

export function PickClient() {
  const { input, setInput, reset, entries } = useEntries("pick")
  const [result, setResult] = useState<string | null>(null)
  const [history, setHistory] = useState<string[]>([])
  const [drawCount, setDrawCount] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleDraw = () => {
    if (entries.length === 0) {
      setError("1件以上の名前または番号を入力してください。")
      return
    }

    const next = entries[Math.floor(Math.random() * entries.length)]
    setResult(next)
    setDrawCount((count) => count + 1)
    setHistory((prev) => [next, ...prev].slice(0, 5))
    setError(null)
  }

  const handleSample = () => {
    setInput(sampleParticipants)
    setError(null)
  }

  const handleReset = () => {
    reset()
    setResult(null)
    setHistory([])
    setError(null)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="pick-input">メンバーリスト（1行につき1名）</Label>
        <Textarea
          id="pick-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="例）\n山田太郎\n佐藤花子\n..."
        />
        {error ? <p className="text-sm font-semibold text-red-500">{error}</p> : null}
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={handleDraw}>抽選する</Button>
          <Button variant="secondary" onClick={handleSample}>
            サンプルを使う
          </Button>
          <Button variant="outline" onClick={handleReset}>
            入力をクリア
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden border-slate-100 bg-white">
        <CardHeader>
          <h2 className="text-xl font-bold text-slate-900">抽選結果</h2>
          <p className="text-sm text-slate-500">再抽選はいつでも可能です。履歴は直近5件を表示します。</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="min-h-[140px] rounded-3xl border border-dashed border-indigo-200 bg-indigo-50 px-6 py-10 text-center">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.p
                  key={`${result}-${drawCount}`}
                  initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 4 }}
                  transition={{ type: "spring", stiffness: 240, damping: 18 }}
                  className="text-3xl font-extrabold text-indigo-600"
                >
                  {result}
                </motion.p>
              ) : (
                <p className="text-sm font-semibold text-indigo-400">抽選ボタンを押して結果を表示します。</p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-500">抽選履歴（最新順）</h3>
            {history.length === 0 ? (
              <p className="text-sm text-slate-400">まだ抽選履歴がありません。</p>
            ) : (
              <ul className="space-y-2">
                {history.map((item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600"
                  >
                    <span>{item}</span>
                    <span className="text-xs font-medium text-slate-400">#{index + 1}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

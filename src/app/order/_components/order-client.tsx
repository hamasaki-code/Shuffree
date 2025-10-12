"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEntries } from "@/hooks/use-entries"
import { shuffleArray } from "@/lib/utils"

const sampleOrderList = ["前説チーム", "A班", "B班", "C班", "D班"].join("\n")

export function OrderClient() {
  const { input, setInput, reset, entries } = useEntries("order")
  const [result, setResult] = useState<string[]>([])
  const [shuffleCount, setShuffleCount] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleShuffle = () => {
    if (entries.length < 2) {
      setError("2件以上のメンバーを入力してください。")
      return
    }
    const next = shuffleArray(entries)
    setResult(next)
    setShuffleCount((count) => count + 1)
    setError(null)
  }

  const handleSample = () => {
    setInput(sampleOrderList)
    setError(null)
  }

  const handleReset = () => {
    reset()
    setResult([])
    setError(null)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="order-input">メンバー / グループ名</Label>
        <Textarea
          id="order-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="例）\n1年A組\n1年B組\n..."
        />
        {error ? <p className="text-sm font-semibold text-red-500">{error}</p> : null}
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={handleShuffle}>順番を決める</Button>
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
          <h2 className="text-xl font-bold text-slate-900">決定した順番</h2>
          <p className="text-sm text-slate-500">結果はいつでもシャッフルし直せます。上位から順に表示します。</p>
        </CardHeader>
        <CardContent>
          {result.length === 0 ? (
            <p className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm font-semibold text-slate-400">
              決定ボタンを押すとここに結果が表示されます。
            </p>
          ) : (
            <ol className="space-y-3">
              <AnimatePresence initial={false}>
                {result.map((item, index) => (
                  <motion.li
                    key={`${item}-${shuffleCount}-${index}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.18, delay: index * 0.04 }}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-5 py-3"
                  >
                    <span className="text-sm font-semibold text-slate-500">{index + 1}位</span>
                    <span className="text-base font-semibold text-slate-800">{item}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ol>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

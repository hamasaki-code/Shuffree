'use client'

import { useEffect, useState } from 'react'

import { parseEntries, type ToolMode } from '@/lib/utils'
import { useEntryStore } from '@/stores/input-store'

export function useEntries(mode: ToolMode) {
  const stored = useEntryStore((state) => state.entries[mode])
  const setEntries = useEntryStore((state) => state.setEntries)
  const clearEntries = useEntryStore((state) => state.clearEntries)

  const [input, setInput] = useState(stored)

  useEffect(() => {
    setInput(stored)
  }, [stored])

  const update = (value: string) => {
    setInput(value)
    setEntries(mode, value)
  }

  const reset = () => {
    setInput('')
    clearEntries(mode)
  }

  return {
    input,
    setInput: update,
    reset,
    entries: parseEntries(input),
  }
}

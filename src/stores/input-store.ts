'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import type { ToolMode } from '@/lib/utils'

type EntryState = {
  entries: Record<ToolMode, string>
  setEntries: (mode: ToolMode, value: string) => void
  clearEntries: (mode: ToolMode) => void
}

const defaultState: Record<ToolMode, string> = {
  pick: '',
  order: '',
  team: '',
  tournament: '',
  'round-robin': '',
}

export const useEntryStore = create<EntryState>()(
  persist(
    (set) => ({
      entries: defaultState,
      setEntries: (mode, value) =>
        set((state) => ({
          entries: {
            ...state.entries,
            [mode]: value,
          },
        })),
      clearEntries: (mode) =>
        set((state) => ({
          entries: {
            ...state.entries,
            [mode]: '',
          },
        })),
    }),
    {
      name: 'shuffree-inputs',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
)

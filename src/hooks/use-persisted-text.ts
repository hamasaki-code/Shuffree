'use client'
import { useEffect, useState } from 'react'
export function usePersistedText(key: string, initialValue = '') {
    const [value, setValue] = useState(initialValue)
    useEffect(() => {
        if (typeof window === 'undefined') return
        const stored = window.localStorage.getItem(key)
        if (stored) {
            setValue(stored)
        }
    }, [key])
    useEffect(() => {
        if (typeof window === 'undefined') return
        window.localStorage.setItem(key, value)
    }, [key, value])
    return [value, setValue] as const
}

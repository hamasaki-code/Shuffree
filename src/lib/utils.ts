export type ToolMode =
  | 'pick'
  | 'order'
  | 'team'
  | 'tournament'
  | 'round-robin'

export function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ')
}

export function parseEntries(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
}

export function shuffleArray<T>(items: T[], rng: () => number = Math.random): T[] {
  const clone = [...items]

  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1))
    ;[clone[i], clone[j]] = [clone[j], clone[i]]
  }

  return clone
}

export function formatOrdinal(index: number) {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const value = index + 1
  const remainder = value % 100

  if (remainder >= 11 && remainder <= 13) {
    return `${value}th`
  }

  const suffix = suffixes[value % 10] ?? 'th'
  return `${value}${suffix}`
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function generateTeamName(index: number) {
  if (index < alphabet.length) {
    return `Team ${alphabet[index]}`
  }

  const prefixIndex = Math.floor(index / alphabet.length) - 1
  const suffixIndex = index % alphabet.length
  return `Team ${alphabet[prefixIndex]}${alphabet[suffixIndex]}`
}

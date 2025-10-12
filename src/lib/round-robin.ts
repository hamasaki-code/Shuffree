import { shuffleArray } from '@/lib/utils'

export type RoundRobinMatch = {
  home: string
  away: string
  isBye: boolean
}

export type RoundRobinRound = {
  round: number
  matches: RoundRobinMatch[]
}

const BYE = 'BYE'

export function createRoundRobin(participants: string[]): RoundRobinRound[] {
  if (participants.length < 2) {
    return []
  }

  const randomized = shuffleArray(participants)
  if (randomized.length % 2 === 1) {
    randomized.push(BYE)
  }

  const working = [...randomized]
  const totalRounds = working.length - 1
  const rounds: RoundRobinRound[] = []

  for (let roundIndex = 0; roundIndex < totalRounds; roundIndex += 1) {
    const matches: RoundRobinMatch[] = []
    const half = working.length / 2

    for (let matchIndex = 0; matchIndex < half; matchIndex += 1) {
      const home = working[matchIndex] ?? BYE
      const away = working[working.length - 1 - matchIndex] ?? BYE
      matches.push({
        home,
        away,
        isBye: home === BYE || away === BYE,
      })
    }

    rounds.push({ round: roundIndex + 1, matches })

    const moved = working.splice(1, 1)[0]
    working.push(moved)
  }

  return rounds
}

import { shuffleArray } from '@/lib/utils'

export type BracketSlot =
  | { type: 'participant'; name: string }
  | { type: 'bye' }
  | { type: 'winner'; round: number; match: number }

export type TournamentMatch = {
  round: number
  match: number
  slots: [BracketSlot, BracketSlot]
}

export type TournamentBracket = {
  rounds: TournamentMatch[][]
}

const BYE_NAME = 'BYE'

function nextPowerOfTwo(value: number) {
  if (value < 2) {
    return 2
  }

  let power = 1
  while (power < value) {
    power *= 2
  }
  return power
}

function asSlot(name: string): BracketSlot {
  if (name === BYE_NAME) {
    return { type: 'bye' }
  }
  return { type: 'participant', name }
}

export function createTournamentBracket(participants: string[]): TournamentBracket {
  if (participants.length < 2) {
    return { rounds: [] }
  }

  const capped = participants.slice(0, 16)
  const randomized = shuffleArray(capped)
  const desiredSize = nextPowerOfTwo(randomized.length)

  while (randomized.length < desiredSize) {
    randomized.push(BYE_NAME)
  }

  const rounds: TournamentMatch[][] = []
  let currentSlots = randomized.map(asSlot)
  let round = 1

  while (currentSlots.length >= 2) {
    const matches: TournamentMatch[] = []

    for (let index = 0; index < currentSlots.length; index += 2) {
      const slots: [BracketSlot, BracketSlot] = [
        currentSlots[index] ?? { type: 'bye' },
        currentSlots[index + 1] ?? { type: 'bye' },
      ]
      matches.push({
        round,
        match: matches.length + 1,
        slots,
      })
    }

    rounds.push(matches)
    currentSlots = matches.map((match) => ({
      type: 'winner' as const,
      round: match.round,
      match: match.match,
    }))
    round += 1
  }

  return { rounds }
}

import { generateTeamName, shuffleArray } from '@/lib/utils'

export type TeamOptions =
  | { mode: 'teams'; teamCount: number }
  | { mode: 'size'; teamSize: number }

export type GeneratedTeam = {
  name: string
  members: string[]
}

export function createTeams(participants: string[], option: TeamOptions): GeneratedTeam[] {
  if (participants.length === 0) {
    return []
  }

  const randomized = shuffleArray(participants)

  const requestedTeams =
    option.mode === 'teams'
      ? Math.max(1, Math.floor(option.teamCount))
      : Math.max(1, Math.ceil(randomized.length / Math.max(1, option.teamSize)))

  const teamCount = Math.min(requestedTeams, randomized.length)

  const teams: GeneratedTeam[] = Array.from({ length: teamCount }, (_, index) => ({
    name: generateTeamName(index),
    members: [],
  }))

  randomized.forEach((participant, index) => {
    const teamIndex = index % teamCount
    teams[teamIndex]?.members.push(participant)
  })

  return teams
}

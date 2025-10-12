export function parseEntries(input: string) {
    return input
        .split(/\r?\n/)
        .map((entry) => entry.trim())
        .filter((entry) => entry.length > 0)
}
export function shuffleArray<T>(items: T[]) {
    const array = [...items]
    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}
export interface TeamResult {
    name: string
    members: string[]
}
type TeamMode = 'teamCount' | 'teamSize'
const defaultTeamNames = [
    'チームA',
    'チームB',
    'チームC',
    'チームD',
    'チームE',
    'チームF',
    'チームG',
    'チームH',
]
export function createTeams(entries: string[], mode: TeamMode, value: number): TeamResult[] {
    if (!Number.isFinite(value) || value <= 0) return []
    const shuffled = shuffleArray(entries)
    if (shuffled.length === 0) return []
    const teamCount =
        mode === 'teamCount' ? Math.min(value, shuffled.length) : Math.ceil(shuffled.length / value)
    const teams = Array.from({ length: teamCount }, (_, index) => ({
        name: defaultTeamNames[index] ?? `チーム${index + 1}`,
        members: [] as string[],
    }))
    let currentIndex = 0
    shuffled.forEach((member) => {
        teams[currentIndex].members.push(member)
        currentIndex = (currentIndex + 1) % teams.length
    })
    return teams
}
export interface BracketMatch {
    home: string
    away: string
}
export interface BracketRound {
    name: string
    matches: BracketMatch[]
}
function nextPowerOfTwo(value: number) {
    let power = 1
    while (power < value) {
        power *= 2
    }
    return power
}
function getRoundLabel(roundIndex: number, totalRounds: number) {
    const labels = ['決勝', '準決勝', '準々決勝', 'ベスト16', 'ベスト32', 'ベスト64']
    const reverseIndex = totalRounds - roundIndex - 1
    if (reverseIndex < labels.length) {
        return labels[reverseIndex]
    }
    return `第${roundIndex + 1}ラウンド`
}
export function createTournament(entries: string[]): BracketRound[] {
    if (entries.length < 2) return []
    const limited = entries.slice(0, 16)
    const shuffled = shuffleArray(limited)
    const size = nextPowerOfTwo(shuffled.length)
    const padded = [...shuffled]
    while (padded.length < size) {
        padded.push('BYE')
    }
    const rounds: BracketRound[] = []
    let current = padded
    const totalRounds = Math.log2(size)
    for (let roundIndex = 0; roundIndex < totalRounds; roundIndex += 1) {
        const matches: BracketMatch[] = []
        for (let i = 0; i < current.length; i += 2) {
            matches.push({ home: current[i], away: current[i + 1] })
        }
        const label = getRoundLabel(roundIndex, totalRounds)
        rounds.push({ name: label, matches })
        current = matches.map((_, matchIndex) => `${label} 第${matchIndex + 1}試合の勝者`)
    }
    return rounds
}
export interface RoundRobinRound {
    name: string
    matches: BracketMatch[]
}
export function createRoundRobin(entries: string[]): RoundRobinRound[] {
    if (entries.length < 2) return []
    const players = shuffleArray(entries)
    if (players.length % 2 !== 0) {
        players.push('BYE')
    }
    const rounds: RoundRobinRound[] = []
    const totalRounds = players.length - 1
    const half = players.length / 2
    for (let round = 0; round < totalRounds; round += 1) {
        const matches: BracketMatch[] = []
        for (let index = 0; index < half; index += 1) {
            const home = players[index]
            const away = players[players.length - 1 - index]
            if (home === 'BYE' || away === 'BYE') {
                const participant = home === 'BYE' ? away : home
                matches.push({ home: participant, away: '休み (BYE)' })
            } else {
                matches.push({ home, away })
            }
        }
        rounds.push({ name: `第${round + 1}節`, matches })
        const fixed = players[0]
        const rotated = [fixed, players[players.length - 1], ...players.slice(1, players.length - 1)]
        players.splice(0, players.length, ...rotated)
    }
    return rounds
}

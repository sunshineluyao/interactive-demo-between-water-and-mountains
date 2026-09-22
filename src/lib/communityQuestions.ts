export type QuestionLensId = 'movement' | 'continuity' | 'missing-voices'

export type QuestionLens = {
  id: QuestionLensId
  name: string
  nameZh: string
  purpose: string
  water: string
  mountain: string
  limit: string
  recommendedPatterns: [string, string]
}

export const communityQuestionLenses: QuestionLens[] = [
  {
    id: 'movement',
    name: 'Movement',
    nameZh: '流动',
    purpose: 'Trace routes and exchange without assuming that a visible pattern explains why people moved.',
    water: 'Who uses this waterway, and how might their routes change with the seasons?',
    mountain: 'What might a changing decoration pattern suggest about exchange?',
    limit: 'A mapped route and a pottery pattern offer different kinds of evidence. Neither tells us why people moved.',
    recommendedPatterns: ['Change parameters', 'Coordinate views'],
  },
  {
    id: 'continuity',
    name: 'Continuity',
    nameZh: '延续',
    purpose: 'Look for recurrence while keeping alternatives such as aggregation and incomplete observation visible.',
    water: 'What remains familiar to someone returning to the same canal?',
    mountain: 'Which reported decoration patterns recur across places or excavation levels?',
    limit: 'A recurring pattern might reflect continuity, aggregation, or incomplete observation. It needs another check.',
    recommendedPatterns: ['Select + highlight', 'Overview + detail'],
  },
  {
    id: 'missing-voices',
    name: 'Missing voices',
    nameZh: '缺席的声音',
    purpose: 'Use absence as a prompt for listening, consent, and a better evidence plan—not as a claim about a community.',
    water: 'Whose experience of this waterway is absent from the map?',
    mountain: 'What can a pottery record leave out about the people who made and used it?',
    limit: 'Public datasets carry partial views. People and communities can challenge the questions we bring to them.',
    recommendedPatterns: ['Details on demand', 'Author + annotate'],
  },
]

export function getQuestionLens(id: QuestionLensId) {
  return communityQuestionLenses.find((lens) => lens.id === id) ?? communityQuestionLenses[0]
}

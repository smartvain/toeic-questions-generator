export type ChoiceKey = 'A' | 'B' | 'C' | 'D'

export interface ToeicQuestion {
  question: string
  choices: Record<ChoiceKey, string>
  answer: ChoiceKey
  explanation: string
}

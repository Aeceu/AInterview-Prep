export type UserTypes = {
  id: number
  name: string
  email: string
  profileImage?: string
  role: string
  createdAt: Date
  updatedAt: Date
  refreshToken: string | null
}

export type QuestionTypes = {
  question: string
  choices: {
    letter: string
    text: string
  }[]
  correct: string
}

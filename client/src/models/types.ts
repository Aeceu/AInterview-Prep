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

export type QuizSessionsTypes = {
  id: number
  userId: number
  tags: string
  count: number
  difficulty: string
  score: number
  questions: QuestionAnswersTypes[]

  createdAt: Date
  updatedAt: Date
}

export type ChoicesTypes = {
  id: number
  letter: string
  questionId: number
  text: string
  createdAt: Date
  updatedAt: Date
}

export type QuestionAnswersTypes = {
  id: number
  correct: string
  question: string
  choices: ChoicesTypes[]
  quizSessionId: number
  questionAnswers: {
    id: number
    questionId: number
    quizSessionId: number
    selected: string
  }[]
  createdAt: Date
  updatedAt: Date
}

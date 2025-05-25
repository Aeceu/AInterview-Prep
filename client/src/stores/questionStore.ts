import type { QuestionTypes, QuizSessionsTypes } from '@/models/types'
import { defineStore } from 'pinia'

type Props = {
  questions: QuestionTypes[]
  answers: string[]
  currentIndex: number
  loading: boolean
  tags: string[]
  difficulty: string
  count: number

  quizSession: QuizSessionsTypes[]
  currentQuizSession: QuizSessionsTypes | null
  quizSessionLoading: boolean
}

export const useQuestionStore = defineStore('questionStore', {
  state: (): Props => ({
    questions: [],
    answers: [],
    currentIndex: 0,
    loading: false,
    tags: [],
    difficulty: '',
    count: 0,

    quizSession: [],
    currentQuizSession: null,
    quizSessionLoading: false,
  }),
  getters: {
    getQuestions: (state) => state.questions,
    getAnswers: (state) => state.answers,
    getCurrentIndex: (state) => state.currentIndex,
    getLoading: (state) => state.loading,
    getTags: (state) => state.tags,
    getDifficulty: (state) => state.difficulty,
    getCount: (state) => state.count,

    getQuizSession: (state) => state.quizSession,
    getCurrentQuizSession: (state) => state.currentQuizSession,
    getQuizSessionLoading: (state) => state.quizSessionLoading,
  },
  actions: {
    setQuestions(newValue: QuestionTypes[]) {
      this.questions = newValue
    },
    setAnswer(userAnswer: string) {
      this.answers.push(userAnswer)
    },
    setAnswers(answers: string[]) {
      this.answers = answers
    },
    setLoading(value: boolean) {
      this.loading = value
    },
    setQuizSessionLoading(value: boolean) {
      this.quizSessionLoading = value
    },
    setCurrentIndex(value: number) {
      this.currentIndex = value
    },
    setQuizSession(value: QuizSessionsTypes[]) {
      this.quizSession = value
    },
    setTags(value: string[]) {
      this.tags = value
    },
    setDifficulty(val: string) {
      this.difficulty = val
    },
    setCount(val: number) {
      this.count = val
    },
    setAddQuizSession(val: QuizSessionsTypes) {
      this.quizSession.push(val)
    },
    setCurrentQuizSession(val: QuizSessionsTypes | null) {
      if (val?.id === this.currentQuizSession?.id) {
        this.currentQuizSession = null
      } else {
        this.currentQuizSession = val
      }
    },
  },
})

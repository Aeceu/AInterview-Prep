import type { QuestionTypes } from '@/models/types'
import { defineStore } from 'pinia'

type Props = {
  questions: QuestionTypes[]
  answers: string[]
  currentIndex: number
  loading: boolean
}

export const useQuestionStore = defineStore('questionStore', {
  state: (): Props => ({
    questions: [],
    answers: [],
    currentIndex: 0,
    loading: false,
  }),
  getters: {
    getQuestions: (state) => state.questions,
    getAnswers: (state) => state.answers,
    getLoading: (state) => state.loading,
    getCurrentIndex: (state) => state.currentIndex,
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
    setCurrentIndex(value: number) {
      this.currentIndex = value
    },
  },
})

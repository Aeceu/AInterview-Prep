import type { UserTypes } from '@/models/types'
import { defineStore } from 'pinia'

type State = {
  user: UserTypes | null
  authLoading: boolean
  errorMessage: string
}

export const useUserStore = defineStore('userStore', {
  state: (): State => ({
    user: null,
    authLoading: false,
    errorMessage: '',
  }),
  getters: {
    getAuthLoading: (state) => state.authLoading,
    getErrorMessage: (state) => state.errorMessage,
    getUser: (state) => state.user,
  },
  actions: {
    setAuthLoading(value: boolean) {
      this.authLoading = value
    },
    setErrorMessage(msg: string) {
      this.errorMessage = msg
    },
    setUser(newUser: UserTypes | null) {
      this.user = newUser
    },
  },
})

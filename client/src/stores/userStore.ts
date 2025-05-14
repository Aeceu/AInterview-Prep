import type { UserTypes } from '@/models/types'
import { defineStore } from 'pinia'

type State = {
  user: UserTypes | null
  accessToken: string | null
  authLoading: boolean
  errorMessage: string
}

export const useUserStore = defineStore('useUserStore', {
  state: (): State => ({
    user: null,
    accessToken: null,
    authLoading: false,
    errorMessage: '',
  }),
  getters: {
    getAuthLoading: (state) => state.authLoading,
    getErrorMessage: (state) => state.errorMessage,
    getUser: (state) => state.user,
    getToken: (state) => state.accessToken,
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
    setToken(newToken: string | null) {
      this.accessToken = newToken
    },
  },
})

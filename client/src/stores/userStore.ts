import { defineStore } from 'pinia'

type State = {
  authLoading: boolean
  errorMessage: string
}

export const useUserStore = defineStore('useUserStore', {
  state: (): State => ({
    authLoading: false,
    errorMessage: '',
  }),
  getters: {
    getAuthLoading: (state) => state.authLoading,
    getErrorMessage: (state) => state.errorMessage,
  },
  actions: {
    setAuthLoading(value: boolean) {
      this.authLoading = value
    },
    setErrorMessage(msg: string) {
      this.errorMessage = msg
    },
  },
})

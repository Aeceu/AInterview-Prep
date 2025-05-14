import { useUserStore } from '@/stores/userStore'
import axios from '../axios'
import { AxiosError } from 'axios'
import { useNotif } from '@/composables/useElMessage'

export type CreateUserParams = {
  name: string
  email: string
  password: string
}

export const handleRegister = async (newUser: CreateUserParams) => {
  const userStore = useUserStore()
  const notif = useNotif()
  try {
    userStore.setAuthLoading(true)
    const res = await axios.post('/signup', newUser)
    console.log(res)
    notif.success('User created successfully!')
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      userStore.setErrorMessage(error.response?.data.message)
    }
    console.log(error)
  } finally {
    userStore.setAuthLoading(false)
  }
}

export type LoginParams = {
  email: string
  password: string
}

export const handleLogin = async (user: LoginParams) => {
  const userStore = useUserStore()
  try {
    userStore.setAuthLoading(true)
    const res = await axios.post('/login', user, {
      withCredentials: true,
    })
    console.log(res)
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log(error)
      userStore.setErrorMessage(error.response?.data.message)
    }
    console.log(error)
  } finally {
    userStore.setAuthLoading(false)
  }
}

export const handleRefresh = async () => {
  const store = useUserStore()
  try {
    store.setAuthLoading(true)
    const res = await axios.get('/refresh', {
      withCredentials: true,
    })
    console.log(res)
    store.setUser(res.data.user)
    store.setToken(res.data.accessToken)
  } catch (err) {
    console.log(err)
  } finally {
    store.setAuthLoading(false)
  }
}

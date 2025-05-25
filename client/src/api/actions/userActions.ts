import { useUserStore } from '@/stores/userStore'
import axios from '../axios'

export const handleRefresh = async () => {
  const store = useUserStore()
  try {
    store.setAuthLoading(true)
    const res = await axios.get('/auth/login/success', {
      withCredentials: true,
    })
    store.setUser(res.data.user)
    console.log(res.data)
  } catch (err) {
    console.log(err)
  } finally {
    store.setAuthLoading(false)
  }
}

export const handleLogout = async () => {
  const userStore = useUserStore()
  try {
    const res = await axios.get('/auth/logout', {
      withCredentials: true,
    })
    userStore.setUser(null)
    console.log(res)
  } catch (err) {
    console.log(err)
  }
}

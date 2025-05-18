import { useUserStore } from '@/stores/userStore'
import axios from '../axios'
import { useQuestionStore } from '@/stores/questionStore'

export const handleRefresh = async () => {
  const store = useUserStore()
  try {
    store.setAuthLoading(true)
    const res = await axios.get('/login/success', {
      withCredentials: true,
    })
    store.setUser(res.data.user)
  } catch (err) {
    console.log(err)
  } finally {
    store.setAuthLoading(false)
  }
}

export const handleGetQuestions = async (topics: string[], diffficulty: string, count: number) => {
  const questionStore = useQuestionStore()
  try {
    questionStore.setLoading(true)
    const allTopics = topics.join(',')
    const res = await axios.post('/test', {
      topics: allTopics,
      diffficulty,
      count,
    })
    console.log(res.data)
    questionStore.setQuestions(res.data)
    return res
  } catch (err) {
    console.log(err)
  } finally {
    questionStore.setLoading(false)
  }
}

export const handleLogout = async () => {
  const userStore = useUserStore()
  try {
    await axios.get('/logout', {
      withCredentials: true,
    })
    userStore.setUser(null)
  } catch (err) {
    console.log(err)
  }
}

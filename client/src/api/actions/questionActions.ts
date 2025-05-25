import { useQuestionStore } from '@/stores/questionStore'
import axios from '../axios'
import { useUserStore } from '@/stores/userStore'
import { useNotif } from '@/composables/useElMessage'

export const handleGetQuestions = async (topics: string[], diffficulty: string, count: number) => {
  const questionStore = useQuestionStore()
  const notif = useNotif()
  if (topics.length <= 0) {
    return notif.error('Please select a topic!')
  }
  try {
    questionStore.setLoading(true)
    const allTopics = topics.join(',  ')
    const res = await axios.post('/question/generate', {
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

type SaveQuestionParams = {
  answers: string[]
  userId: number
  score: number
  tags: string
  difficulty: string
  count: number
  questions: {
    question: string
    correct: string
    choices: {
      letter: string
      text: string
    }[]
  }[]
}
export const handleSaveQuestions = async (data: SaveQuestionParams) => {
  const questionStore = useQuestionStore()
  try {
    const res = await axios.post('/question/save', {
      ...data,
    })
    console.log(res)
    questionStore.setAddQuizSession(res.data)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const handleFetchQuizSessions = async () => {
  const userStore = useUserStore()
  const questionStore = useQuestionStore()
  try {
    if (!userStore.getUser) {
      console.log('No user is logged in!')
      return
    }
    questionStore.setQuizSessionLoading(true)
    const res = await axios.get(`/question/${userStore.getUser.id}`)
    console.log(res.data)
    questionStore.setQuizSession(res.data)
  } catch (error) {
    console.log(error)
  } finally {
    questionStore.setQuizSessionLoading(false)
  }
}

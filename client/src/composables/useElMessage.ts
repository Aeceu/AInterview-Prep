import { ElNotification } from 'element-plus'

export const useNotif = () => {
  const success = (message: string) => {
    ElNotification({
      title: message,
      type: 'success',
    })
  }
  const error = (message: string) => {
    ElNotification({
      title: message,
      type: 'error',
    })
  }
  return { success, error }
}

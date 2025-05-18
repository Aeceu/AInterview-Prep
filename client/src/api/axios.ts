import axios from 'axios'

const baseUrl = 'http://localhost:4200/api/auth'

export default axios.create({
  baseURL: baseUrl,
  withCredentials: true,
})

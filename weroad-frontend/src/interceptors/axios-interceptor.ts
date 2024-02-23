import baseAxios from 'axios'
import { store } from '@/store'

const axios = baseAxios.create({
  baseURL: import.meta.env.VITE_API_URL
})

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    // Exclude token for login endpoint
    if (config.url !== '/login' && token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status = 500 } = error.response || {}
    if (status === 401 || status === 403) {
      store.dispatch('logout')
    }
    return Promise.reject(error)
  }
)

export default axios

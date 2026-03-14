import axios from "axios"
import Cookies from "js-cookie"

const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY || "erp_token"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
})

// Attach token on every request
api.interceptors.request.use((config) => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove(TOKEN_KEY)
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default api

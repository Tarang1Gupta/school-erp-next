import api from "./api"
import Cookies from "js-cookie"

const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY || "erp_token"

export const authService = {
  login: async (email, password) => {
  // Temporary fake login — backend ready hone tak
  if (email === "admin@school.com" && password === "admin123") {
    const fakeToken = "fake-token-123"
    Cookies.set("erp_token", fakeToken, { expires: 7 })
    return { name: "Admin User", email: "admin@school.com" }
  }
  throw new Error("Invalid credentials")
},

  logout: () => {
    Cookies.remove(TOKEN_KEY)
    window.location.href = "/login"
  },

  forgotPassword: async (email) => {
    const { data } = await api.post("/auth/forgot-password", { email })
    return data
  },

  getMe: async () => {
    const { data } = await api.get("/auth/me")
    return data.data
  },
}

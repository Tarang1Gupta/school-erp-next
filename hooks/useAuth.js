import { useMutation } from "@tanstack/react-query"
import { authService } from "@/services/auth.service"
import { useAuthStore } from "@/store/auth.store"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export const useLogin = () => {
  const setUser = useAuthStore((s) => s.setUser)
  const router = useRouter()
  return useMutation({
    mutationFn: ({ email, password }) => authService.login(email, password),
    onSuccess: (user) => { setUser(user); router.push("/dashboard") },
    onError: (e) => toast.error(e?.response?.data?.message || "Invalid credentials"),
  })
}

export const useLogout = () => {
  const clearUser = useAuthStore((s) => s.clearUser)
  return () => { clearUser(); authService.logout() }
}

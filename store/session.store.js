import { create } from "zustand"
import { persist } from "zustand/middleware"
export const useSessionStore = create(
  persist(
    (set) => ({
      activeSession: "2024-25",
      setSession: (session) => set({ activeSession: session }),
    }),
    { name: "erp-session" }
  )
)

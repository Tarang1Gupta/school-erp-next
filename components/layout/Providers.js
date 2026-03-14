"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"
import { useState } from "react"
import { ThemeProvider } from "@/context/ThemeContext"

export default function Providers({ children }) {
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: { staleTime: 1000 * 60 * 5, retry: 1, refetchOnWindowFocus: false },
      },
    })
  )
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster position="top-right" toastOptions={{ duration: 3000, style: { fontSize: "13px" } }} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
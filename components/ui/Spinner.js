import { cn } from "@/lib/utils"
export default function Spinner({ className }) {
  return <div className={cn("w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin", className)} />
}

import { cn } from "@/lib/utils"

const variants = {
  primary:   "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
  danger:    "bg-red-600 hover:bg-red-700 text-white",
  outline:   "border border-gray-300 hover:bg-gray-50 text-gray-700",
  ghost:     "hover:bg-gray-100 text-gray-700",
}
const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
}

export default function Button({ children, variant = "primary", size = "md", className, disabled, ...props }) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "inline-flex items-center gap-2 font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant], sizes[size], className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

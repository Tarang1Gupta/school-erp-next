import { cn } from "@/lib/utils"
import { forwardRef } from "react"
const Select = forwardRef(({ label, error, children, className, ...props }, ref) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <select
      ref={ref}
      className={cn(
        "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition",
        error ? "border-red-400" : "border-gray-300",
        className
      )}
      {...props}
    >
      {children}
    </select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
))
Select.displayName = "Select"
export default Select

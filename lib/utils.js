import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs"

// Tailwind class merger
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Format date → "12 Jan 2025"
export function formatDate(date) {
  return dayjs(date).format("DD MMM YYYY")
}

// Format date → "12 Jan 2025, 10:30 AM"
export function formatDateTime(date) {
  return dayjs(date).format("DD MMM YYYY, hh:mm A")
}

// Format currency → "₹1,20,000"
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

// Truncate long text
export function truncate(str, n = 30) {
  return str?.length > n ? str.slice(0, n) + "…" : str
}

// Get initials from name → "Rahul Sharma" → "RS"
export function getInitials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

// Attendance % color
export function attendanceColor(percent) {
  if (percent >= 85) return "text-green-600"
  if (percent >= 75) return "text-yellow-600"
  return "text-red-600"
}

// Fee status badge style
export function feeStatusStyle(status) {
  const map = {
    paid:    "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    overdue: "bg-red-100 text-red-700",
  }
  return map[status] || "bg-gray-100 text-gray-700"
}

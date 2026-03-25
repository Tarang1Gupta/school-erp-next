// components/expenses/RowMenu.jsx
"use client"

import { useState, useRef, useEffect } from "react"

export default function RowMenu({ expenseId, onAction }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [])

  const act = (action) => { onAction(action, expenseId); setOpen(false) }

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-[#4c739a] hover:text-[#0d141b] dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="material-symbols-outlined text-lg">more_vert</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 bg-white dark:bg-[#1a2633] border border-[#e7edf3] dark:border-gray-700 rounded-xl shadow-lg py-1 w-44">
          <button onClick={() => act("approve")}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
            <span className="material-symbols-outlined text-base">check_circle</span> Approve
          </button>
          <button onClick={() => act("reject")}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors">
            <span className="material-symbols-outlined text-base">cancel</span> Reject
          </button>
          <div className="border-t border-[#e7edf3] dark:border-gray-700 my-1" />
          <button onClick={() => act("view")}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-[#4c739a] hover:bg-[#e7edf3] dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined text-base">visibility</span> View Details
          </button>
          <button onClick={() => act("delete")}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <span className="material-symbols-outlined text-base">delete</span> Delete
          </button>
        </div>
      )}
    </div>
  )
}

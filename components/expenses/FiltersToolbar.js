// components/expenses/FiltersToolbar.jsx
"use client"

import { useState } from "react"
import { CATEGORIES } from "@/lib/expenseData"

const inputCls = "w-full px-4 py-2 bg-[#f6f7f8] dark:bg-gray-800 border-none rounded-lg text-sm text-[#0d141b] dark:text-white focus:ring-2 focus:ring-primary placeholder:text-[#4c739a] outline-none"
const selectCls = "w-full pl-4 pr-10 py-2 bg-[#f6f7f8] dark:bg-gray-800 border-none rounded-lg text-sm text-[#0d141b] dark:text-white focus:ring-2 focus:ring-primary appearance-none cursor-pointer outline-none"

export default function FiltersToolbar({ onApply, onClear }) {
  const [date,   setDate]   = useState("")
  const [cat,    setCat]    = useState("")
  const [min,    setMin]    = useState("")
  const [max,    setMax]    = useState("")
  const [status, setStatus] = useState("")

  const handleApply = () => {
    onApply({
      category: cat,
      status,
      min:  min ? parseFloat(min) : 0,
      max:  max ? parseFloat(max) : Infinity,
    })
  }

  const handleClear = () => {
    setDate(""); setCat(""); setMin(""); setMax(""); setStatus("")
    onClear()
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 bg-white dark:bg-[#101922] rounded-xl border border-[#e7edf3] dark:border-gray-800 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 flex-1">

        {/* Date */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#4c739a] text-lg pointer-events-none">calendar_today</span>
          <input
            type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#f6f7f8] dark:bg-gray-800 border-none rounded-lg text-sm text-[#0d141b] dark:text-white focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        {/* Category */}
        <div className="relative">
          <select value={cat} onChange={(e) => setCat(e.target.value)} className={selectCls}>
            <option value="">Category</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#4c739a] text-lg pointer-events-none">expand_more</span>
        </div>

        {/* Amount range */}
        <div className="flex gap-2">
          <input type="number" placeholder="Min $" value={min} onChange={(e) => setMin(e.target.value)} className={inputCls} />
          <input type="number" placeholder="Max $" value={max} onChange={(e) => setMax(e.target.value)} className={inputCls} />
        </div>

        {/* Status */}
        <div className="relative">
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectCls}>
            <option value="">Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#4c739a] text-lg pointer-events-none">expand_more</span>
        </div>
      </div>

      <div className="flex gap-2 items-center justify-end lg:justify-start border-t lg:border-t-0 border-[#e7edf3] dark:border-gray-800 pt-3 lg:pt-0">
        <button onClick={handleApply}
          className="px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary rounded-lg text-sm font-bold hover:bg-primary/20 transition-colors">
          Apply
        </button>
        <button onClick={handleClear}
          className="px-4 py-2 text-[#4c739a] hover:text-[#0d141b] dark:hover:text-white text-sm font-medium transition-colors">
          Clear
        </button>
      </div>
    </div>
  )
}

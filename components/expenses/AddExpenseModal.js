// components/expenses/AddExpenseModal.jsx
"use client"

import { useState } from "react"
import { CATEGORIES, PAYMENT_METHODS } from "@/lib/expenseData"

const inputCls = "w-full px-3 py-2.5 bg-[#f6f7f8] dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg text-sm text-[#0d141b] dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
const labelCls = "block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"

const EMPTY = { date: "", category: "", desc: "", vendor: "", amount: "", payment: "Bank Transfer" }

export default function AddExpenseModal({ isOpen, onClose, onSave }) {
  const [form,       setForm]       = useState({ ...EMPTY, date: new Date().toISOString().split("T")[0] })
  const [error,      setError]      = useState("")
  const [submitting, setSubmitting] = useState(false)

  if (!isOpen) return null

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const reset = () => {
    setForm({ ...EMPTY, date: new Date().toISOString().split("T")[0] })
    setError("")
  }

  const handleClose = () => { reset(); onClose() }

  const handleSave = async () => {
    setError("")
    if (!form.date || !form.category || !form.desc.trim() || !form.amount || parseFloat(form.amount) <= 0) {
      setError("Please fill in all required fields with valid values.")
      return
    }
    setSubmitting(true)
    try {
      await onSave({
        date:     form.date,
        category: form.category,
        desc:     form.desc.trim(),
        vendor:   form.vendor.trim() || `${form.category} Dept`,
        payment:  form.payment,
        amount:   parseFloat(form.amount),
        status:   "Pending",
      })
      reset()
      onClose()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-white dark:bg-[#101922] rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">

        {/* Header */}
        <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
            </div>
            <div>
              <h2 className="text-[#0d141b] dark:text-white text-base font-bold">Add Expense</h2>
              <p className="text-slate-500 text-xs">Fill in the expense details below</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-[#4c739a]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Date *</label>
              <input type="date" value={form.date} onChange={set("date")} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Category *</label>
              <div className="relative">
                <select value={form.category} onChange={set("category")} className={inputCls + " appearance-none pr-9 cursor-pointer"}>
                  <option value="">Select…</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#4c739a] text-lg pointer-events-none">expand_more</span>
              </div>
            </div>
          </div>

          <div>
            <label className={labelCls}>Description *</label>
            <input type="text" value={form.desc} onChange={set("desc")} placeholder="e.g. Microscopes for Lab 3" className={inputCls} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Vendor / Dept</label>
              <input type="text" value={form.vendor} onChange={set("vendor")} placeholder="e.g. Thermo Fisher" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Amount ($) *</label>
              <input type="number" min="0" step="0.01" value={form.amount} onChange={set("amount")} placeholder="0.00" className={inputCls} />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className={labelCls}>Payment Method</label>
            <div className="grid grid-cols-3 gap-2">
              {PAYMENT_METHODS.map(({ value, label, icon }) => (
                <label key={value} className="cursor-pointer">
                  <input type="radio" name="modal-payment" value={value}
                    checked={form.payment === value} onChange={set("payment")} className="sr-only peer" />
                  <div className={`rounded-lg border p-3 text-center transition-all select-none ${
                    form.payment === value
                      ? "border-primary bg-primary/5 dark:bg-primary/10 text-primary"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}>
                    <span className="material-symbols-outlined text-xl block mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                    <span className="text-xs font-semibold">{label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">{error}</p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3 bg-slate-50/50 dark:bg-slate-800/20">
          <button onClick={handleClose}
            className="px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} disabled={submitting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-blue-600 transition-colors shadow-sm shadow-blue-200 dark:shadow-none disabled:opacity-60">
            <span className="material-symbols-outlined text-base">check</span>
            {submitting ? "Saving…" : "Save Expense"}
          </button>
        </div>

      </div>
    </div>
  )
}

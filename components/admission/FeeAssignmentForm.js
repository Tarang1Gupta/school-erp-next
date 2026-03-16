"use client"
import { useFormContext } from "react-hook-form"

// ─── Constants ─────────────────────────────────────────────────────────
const FEE_TEMPLATES = [
  "Standard Academic Fee",
  "Reduced Fee Structure",
  "Full Scholarship Template",
  "Management Quota Fee",
]

const INSTALLMENT_PLANS = [
  "Quarterly (4 Installments)",
  "Half-Yearly (2 Installments)",
  "Annual (1 Payment)",
  "Monthly (12 Installments)",
]

const DISCOUNT_REASONS = [
  "None",
  "Sibling Discount",
  "Staff Ward",
  "Merit Scholarship",
  "EWS / Financial Aid",
]

const FEE_BREAKDOWN = [
  { component: "Admission Fee (One-time)", frequency: "One-time",  amount: 500  },
  { component: "Tuition Fee",              frequency: "Quarterly", amount: 4800 },
  { component: "Lab & Library Fee",        frequency: "Annual",    amount: 150  },
  { component: "Transport Fee",            frequency: "Monthly",   amount: 850  },
  { component: "Development Fund",         frequency: "Annual",    amount: 200  },
  { component: "Sports & Activity Fee",    frequency: "Annual",    amount: 200  },
]

const GROSS = FEE_BREAKDOWN.reduce((sum, r) => sum + r.amount, 0)

// ─── Shared classes ─────────────────────────────────────────────────────
const selectCls =
  "border appearance-none w-full h-11 px-4 bg-white dark:bg-slate-800 dark:text-white border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-sm outline-none transition"
const selectErrCls =
  "border appearance-none w-full h-11 px-4 bg-white dark:bg-slate-800 dark:text-white border-red-400 rounded-lg focus:ring-2 focus:ring-red-200 text-sm outline-none transition"
const labelCls =
  "text-sm font-semibold text-slate-700 dark:text-slate-300"

function FieldError({ message }) {
  if (!message) return null
  return (
    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" className="shrink-0">
        <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2" />
        <path d="M12 8v4M12 16h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {message}
    </p>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────
export default function FeeAssignmentForm() {
  const { register, watch, formState: { errors } } = useFormContext()

  const discount   = watch("fee.discount")   || "None"
  const adjustment = parseFloat(watch("fee.adjustment")) || 0
  const installment = watch("fee.installment") || INSTALLMENT_PLANS[0]

  const TAX_RATE    = 0.05
  const tax         = Math.round(GROSS * TAX_RATE)
  const discountAmt = discount !== "None" ? Math.round(GROSS * 0.11) : 0
  const net         = GROSS + tax - discountAmt - adjustment

  const installmentCount =
    installment.includes("4") ? 4 :
    installment.includes("2") ? 2 :
    installment.includes("12") ? 12 : 1

  const firstPayment = (net / installmentCount).toFixed(2)

  return (
    <div className="bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">

      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-slate-900 dark:text-white text-lg font-bold">
          Step 6: Fee Assignment
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
          Review and assign the fee structure for this admission
        </p>
      </div>

      <div className="p-6 space-y-6">

        {/* ── Template & Installment ── */}
        <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700 rounded-xl p-5">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4">
            Fee Structure Settings
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>
                Fee Structure Template <span className="text-red-500">*</span>
              </label>
              <select
                {...register("fee.template")}
                className={errors.fee?.template ? selectErrCls : selectCls}
              >
                <option value="">Select Template</option>
                {FEE_TEMPLATES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <FieldError message={errors.fee?.template?.message} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>
                Installment Plan <span className="text-red-500">*</span>
              </label>
              <select
                {...register("fee.installment")}
                className={errors.fee?.installment ? selectErrCls : selectCls}
              >
                <option value="">Select Plan</option>
                {INSTALLMENT_PLANS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <FieldError message={errors.fee?.installment?.message} />
            </div>
          </div>
        </div>

        {/* ── Discount & Adjustment ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Discount Reason</label>
            <select {...register("fee.discount")} className={selectCls}>
              {DISCOUNT_REASONS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Manual Adjustment (₹)</label>
            <div className={`flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-300 border-slate-200 dark:border-slate-700`}>
              <span className="px-3 h-11 flex items-center bg-slate-50 dark:bg-slate-700 text-slate-400 text-sm border-r border-slate-200 dark:border-slate-600 shrink-0">
                ₹
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                {...register("fee.adjustment")}
                className="flex-1 h-11 px-3 text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* ── Fee Breakdown Table ── */}
        <div className="bg-white dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
            <p className="text-sm font-bold text-slate-800 dark:text-white">
              Fee Structure Breakdown
            </p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/40 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <th className="text-left px-5 py-3">Fee Component</th>
                <th className="text-left px-5 py-3">Frequency</th>
                <th className="text-right px-5 py-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {FEE_BREAKDOWN.map((row, i) => (
                <tr
                  key={i}
                  className="border-t border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-5 py-3 text-slate-700 dark:text-slate-300">{row.component}</td>
                  <td className="px-5 py-3 text-slate-400 text-xs">{row.frequency}</td>
                  <td className="px-5 py-3 text-right font-semibold text-slate-700 dark:text-slate-200">
                    ₹{row.amount.toLocaleString("en-IN")}.00
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Fee Summary ── */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-xl p-5">
          <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-4">
            Fee Summary
          </p>

          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Gross Total</span>
              <span className="font-semibold">₹{GROSS.toLocaleString("en-IN")}.00</span>
            </div>

            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Tax (5%)</span>
              <span className="font-semibold text-emerald-600">+₹{tax}.00</span>
            </div>

            {discountAmt > 0 && (
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Discount ({discount})</span>
                <span className="font-semibold text-red-500">-₹{discountAmt.toLocaleString("en-IN")}.00</span>
              </div>
            )}

            {adjustment > 0 && (
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Manual Adjustment</span>
                <span className="font-semibold text-red-500">-₹{adjustment.toFixed(2)}</span>
              </div>
            )}

            <div className="border-t border-blue-200 dark:border-blue-800 pt-3 flex justify-between items-center">
              <span className="font-bold text-slate-800 dark:text-white">Net Payable</span>
              <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                ₹{net.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* First installment info */}
          <div className="mt-4 bg-white dark:bg-slate-800/60 rounded-lg px-4 py-3 border border-blue-100 dark:border-blue-900/30 flex items-center justify-between">
            <p className="text-xs text-blue-600 dark:text-blue-400">
              First installment ({installmentCount > 1 ? `1 of ${installmentCount}` : "Full Payment"})
            </p>
            <p className="text-sm font-extrabold text-blue-700 dark:text-blue-300">
              ₹{parseFloat(firstPayment).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 rounded-xl px-5 py-4">
          <span className="text-amber-500 shrink-0 mt-0.5">⚠️</span>
          <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
            Fee amounts shown are indicative based on the selected template.
            Final fee may vary based on applicable concessions approved by the principal.
          </p>
        </div>

      </div>
    </div>
  )
}
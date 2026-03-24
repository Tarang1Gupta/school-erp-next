// components/expenses/AddExpenseForm.jsx
"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { expenseSchema } from "@/lib/validators"
import { DynamicFormLayout } from "@/components/forms/DynamicFormLayout"
import { expenseFields } from "@/config/expenseFields"
import Topbar from "@/components/layout/Topbar";
import {
  MdAccountBalance, MdCreditCard, MdPayments, MdCheck,
  MdReceiptLong, MdChevronRight,
} from "react-icons/md"
import { useRouter } from "next/navigation"

// ── style tokens (same as DailyAttendance) ───────────────────────────────────
const labelCls = "text-sm font-bold text-slate-700 dark:text-slate-300"

const paymentMethods = [
  { value: "transfer", label: "Bank Transfer", icon: MdAccountBalance },
  { value: "card",     label: "Card",          icon: MdCreditCard     },
  { value: "cash",     label: "Cash",          icon: MdPayments       },
]

export default function AddExpenseForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: { paymentMethod: "transfer" },
  })

  const selectedMethod = watch("paymentMethod")

  const onSubmit = async (data) => {
    try {
      console.log("Expense data:", data)
      // await createExpense(data)
      router.push("/expenses/list")
    } catch (err) {
      console.error(err)
    }
  }

  const topFields    = expenseFields.filter((f) => f.colSpan !== 2)
  const bottomFields = expenseFields.filter((f) => f.colSpan === 2)

  return (
    <>
    <Topbar title="Expense" subtitle="Mark and manage student attendance for the selected class and date." />
    <div className="p-4 md:p-6 space-y-6 bg-slate-50 dark:bg-[#101922] min-h-full">

      {/* ── Breadcrumb ── */}
      <div className="flex flex-wrap items-center gap-2">
        <Link href="/"        className="text-slate-500 text-sm font-medium hover:text-primary transition-colors">Home</Link>
        <MdChevronRight className="text-slate-400" size={16} />
        <Link href="/expenses" className="text-slate-500 text-sm font-medium hover:text-primary transition-colors">Finance</Link>
        <MdChevronRight className="text-slate-400" size={16} />
        <span className="text-primary text-sm font-semibold">Add Expense</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* ── CARD 1: Transaction Details ── */}
        <div className="bg-white dark:bg-[#101922] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">

          {/* Card Header — same pattern as DailyAttendance */}
          <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
              <MdReceiptLong size={18} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-[#0d141b] dark:text-white text-base font-bold">Transaction Details</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs">Fill in the core expense information</p>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            <DynamicFormLayout
              fields={topFields}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
          </div>
        </div>

        {/* ── CARD 2: Payment Method ── */}
        <div className="bg-white dark:bg-[#101922] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">

          <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-[#0d141b] dark:text-white text-base font-bold">Payment Method</h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-3 gap-3 max-w-sm">
              {paymentMethods.map(({ value, label, icon: Icon }) => {
                const isSelected = selectedMethod === value
                return (
                  <label key={value} className="cursor-pointer">
                    <input
                      type="radio"
                      value={value}
                      {...register("paymentMethod")}
                      className="peer sr-only"
                    />
                    <div className={`rounded-lg border p-3 text-center transition-all select-none
                      ${isSelected
                        ? "border-primary bg-primary/5 text-primary dark:bg-primary/10 dark:border-primary dark:text-primary shadow-sm shadow-primary/20"
                        : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                      }`}>
                      <Icon className="text-[22px] block mb-1.5 mx-auto" />
                      <span className="text-xs font-semibold">{label}</span>
                    </div>
                  </label>
                )
              })}
            </div>
            {errors.paymentMethod && (
              <p className="mt-2 text-xs text-red-500">{errors.paymentMethod.message}</p>
            )}
          </div>
        </div>

        {/* ── CARD 3: Documentation (colSpan 2 fields) ── */}
        {bottomFields.length > 0 && (
          <div className="bg-white dark:bg-[#101922] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">

            <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-[#0d141b] dark:text-white text-base font-bold">Documentation</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Additional notes for this expense</p>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 gap-5">
                <DynamicFormLayout
                  fields={bottomFields}
                  register={register}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                />
              </div>

              {/* Info Banner */}
              <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-xl px-5 py-4">
                <svg width="16" height="16" className="text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M12 8h.01M12 12v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                  <span className="font-semibold">Tax Deductible?</span> Remember to mention it in
                  the description for end-of-year reporting.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Action Buttons ── */}
        <div className="flex items-center justify-end gap-x-3 pt-2 pb-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg px-5 py-2.5 text-sm font-bold text-slate-600
              hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800
              border border-slate-200 dark:border-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white
              shadow-sm hover:bg-primary/90 disabled:opacity-60 transition-all
              flex items-center gap-2 shadow-primary/20"
          >
            <MdCheck className="text-[18px]" />
            {isSubmitting ? "Saving…" : "Save Expense"}
          </button>
        </div>

      </form>
    </div>
    </>
  )
}

"use client"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { DynamicFormLayout } from "@/components/forms/DynamicFormLayout"
import { presentAddressFields, getPermanentAddressFields } from "@/config/admissionFields"

export default function AddressDetailsForm() {
  const { register, setValue, watch, formState: { errors } } = useFormContext()
  const [sameAsPresent, setSameAsPresent] = useState(false)

  const handleToggle = (e) => {
    const checked = e.target.checked
    setSameAsPresent(checked)

    if (checked) {
      // Copy present address values into permanent address
      const present = watch("presentAddress") || {}
      setValue("permanentAddress.line1",   present.line1   || "")
      setValue("permanentAddress.line2",   present.line2   || "")
      setValue("permanentAddress.city",    present.city    || "")
      setValue("permanentAddress.state",   present.state   || "")
      setValue("permanentAddress.pincode", present.pincode || "")
      setValue("permanentAddress.country", present.country || "India")
    }
  }

  const permanentFields = getPermanentAddressFields(sameAsPresent)

  return (
    <div className="bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">

      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-slate-900 dark:text-white text-lg font-bold">
          Step 3: Address Details
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
          Provide current and permanent address of the student
        </p>
      </div>

      <div className="p-6 space-y-6">

        {/* ── Present Address ── */}
        <div className="rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-5 space-y-5">
          <div className="flex items-center gap-2">
            <span className="text-base">🏠</span>
            <p className="text-sm font-bold text-slate-800 dark:text-white">Present Address</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
            <DynamicFormLayout
              fields={presentAddressFields}
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
            />
          </div>
        </div>

        {/* ── Same as Present Toggle ── */}
        <div className="flex items-center gap-3 px-1">
          <input
            type="checkbox"
            id="sameAddr"
            checked={sameAsPresent}
            onChange={handleToggle}
            className="accent-blue-600 w-4 h-4 cursor-pointer"
          />
          <label
            htmlFor="sameAddr"
            className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none"
          >
            Permanent address is same as present address
          </label>
        </div>

        {/* ── Permanent Address ── */}
        <div className={`rounded-xl border p-5 space-y-5 transition-all ${
          sameAsPresent
            ? "border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/20 opacity-60"
            : "border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">📌</span>
              <p className="text-sm font-bold text-slate-800 dark:text-white">Permanent Address</p>
            </div>
            {sameAsPresent && (
              <span className="text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full">
                Auto-filled
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
            <DynamicFormLayout
              fields={permanentFields}
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
            />
          </div>
        </div>

        {/* Info Banner */}
        <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-xl px-5 py-4">
          <svg width="16" height="16" className="text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 8h.01M12 12v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
            Present address is where the student currently lives. Permanent address is the home address for official records.
            Toggle the checkbox above if both are the same.
          </p>
        </div>

      </div>
    </div>
  )
}
"use client"
import { useFormContext } from "react-hook-form"
import { DynamicFormLayout } from "@/components/forms/DynamicFormLayout"
import { previousSchoolFields } from "@/config/admissionFields"

export default function PreviousSchoolForm() {
  const { register, setValue, watch, formState: { errors } } = useFormContext()

  const tcAvailable = watch("school.tcAvailable")

  return (
    <div className="bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">

      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-slate-900 dark:text-white text-lg font-bold">
          Step 4: Previous School Details
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
          Provide the academic history from the previous institution
        </p>
      </div>

      <div className="p-6 space-y-6">

        {/* Section label */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🎓</span>
          <p className="text-sm font-bold text-slate-800 dark:text-white">School Information</p>
        </div>

        {/* Dynamic Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
          <DynamicFormLayout
            fields={previousSchoolFields}
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
          />
        </div>

        {/* TC Available Toggle */}
        <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700 rounded-xl px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Is Transfer Certificate (TC) Available?
            </p>
            <p className="text-xs text-slate-400 mt-0.5">Toggle to indicate TC submission status</p>
          </div>
          <div className="flex items-center gap-3 text-sm shrink-0">
            <span className={tcAvailable ? "text-slate-400" : "font-semibold text-slate-700 dark:text-slate-200"}>
              No (Pending)
            </span>
            <button
              type="button"
              onClick={() => setValue("school.tcAvailable", !tcAvailable)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                tcAvailable ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                  tcAvailable ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
            <span className={tcAvailable ? "font-semibold text-blue-600" : "text-slate-400"}>
              Yes
            </span>
          </div>
        </div>

        {/* TC uploaded badge */}
        {tcAvailable && (
          <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl px-5 py-3">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-emerald-500 shrink-0">
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.7" />
            </svg>
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              TC marked as available — please ensure the original is submitted at the front desk.
            </p>
          </div>
        )}

        {/* Warning Banner */}
        <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 rounded-xl px-5 py-4">
          <span className="text-amber-500 mt-0.5 shrink-0">⚠️</span>
          <div>
            <p className="text-sm font-bold text-amber-700 dark:text-amber-300">Verification Required</p>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
              Ensure the School Name matches exactly with the stamp on the Transfer Certificate.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
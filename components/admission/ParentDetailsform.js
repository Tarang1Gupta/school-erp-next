"use client"
import { useFormContext } from "react-hook-form"
import { DynamicFormLayout } from "@/components/forms/DynamicFormLayout"
import { fatherFields, motherFields, guardianFields } from "@/config/admissionFields"

// ─── Parent Section Wrapper ────────────────────────────────────────────
function ParentSection({ title, icon, colorClass, fields }) {
  const { register, setValue, watch, formState: { errors } } = useFormContext()

  return (
    <div className={`rounded-xl border p-6 space-y-5 ${colorClass}`}>

      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-base font-black text-slate-600 dark:text-slate-200 shrink-0">
          {icon}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800 dark:text-white">{title}</p>
          <p className="text-xs text-slate-400">Fill in the details below</p>
        </div>
      </div>

      {/* Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
        <DynamicFormLayout
          fields={fields}
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
        />
      </div>

    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────
export default function ParentDetailsForm() {
  return (
    <div className="bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">

      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-slate-900 dark:text-white text-lg font-bold">
          Step 2: Parent & Guardian Details
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
          Provide contact and professional information for each parent
        </p>
      </div>

      <div className="p-6 space-y-6">

        {/* Father */}
        <ParentSection
          title="Father's Details"
          icon="F"
          colorClass="bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30"
          fields={fatherFields}
        />

        {/* Mother */}
        <ParentSection
          title="Mother's Details"
          icon="M"
          colorClass="bg-pink-50 dark:bg-pink-900/10 border-pink-100 dark:border-pink-900/30"
          fields={motherFields}
        />

        {/* Guardian */}
        <ParentSection
          title="Guardian's Details"
          icon="G"
          colorClass="bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-700"
          fields={guardianFields}
        />

        {/* Info Banner */}
        <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-xl px-5 py-4">
          <svg width="16" height="16" className="text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 8h.01M12 12v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Note to Admin</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Father and Mother details are mandatory. Guardian section can be left blank if not applicable.
              Fields marked <span className="text-red-500 font-bold">*</span> are required.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
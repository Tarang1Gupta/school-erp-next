"use client"
import { DynamicFormLayout } from "@/components/forms/DynamicFormLayout"
import { fatherFields, motherFields, guardianFields } from "@/config/studentFields"

export default function ParentDetailsForm({ form }) {
  const { register, setValue, watch, formState: { errors } } = form

  return (
    <div className="space-y-6">

      {/* Father's Details */}
      <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
          <span className="text-blue-600 text-xl">👤</span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Father's Details</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <DynamicFormLayout
              fields={fatherFields}
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
            />
          </div>
        </div>
      </div>

      {/* Mother's Details */}
      <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
          <span className="text-pink-500 text-xl">👩</span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Mother's Details</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <DynamicFormLayout
              fields={motherFields}
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
            />
          </div>
        </div>
      </div>

      {/* Guardian's Details */}
      <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
          <span className="text-emerald-600 text-xl">🛡️</span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Guardian's Details</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <DynamicFormLayout
              fields={guardianFields}
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
            />
          </div>
        </div>
      </div>

    </div>
  )
}
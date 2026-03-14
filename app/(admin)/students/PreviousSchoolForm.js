"use client"
import { DynamicFormLayout } from "@/components/forms/DynamicFormLayout"
import { previousSchoolFields } from "@/config/studentFields"

export default function PreviousSchoolForm({ form }) {
  const { register, setValue, watch, formState: { errors } } = form

  return (
    <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center text-base">
          🏫
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Previous School Details
        </h2>
      </div>

      {/* Form */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DynamicFormLayout
            fields={previousSchoolFields}
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
          />
        </div>
      </div>

    </div>
  )
}
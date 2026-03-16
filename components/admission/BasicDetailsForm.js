"use client"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { DynamicFormLayout } from "@/components/forms/DynamicFormLayout"
import { basicDetailsFields } from "@/config/admissionFields"

export default function BasicDetailsForm() {
  // ✅ No { form } prop — pull directly from FormProvider context
  const { register, setValue, watch, formState: { errors } } = useFormContext()
  const [preview, setPreview] = useState(null)

  // Auto-calculate BMI
  const weight = watch("weight")
  const height = watch("height")
  if (weight && height) {
    const h = parseFloat(height) / 100
    const bmi = h > 0 ? (parseFloat(weight) / (h * h)).toFixed(1) : ""
    setValue("bmi", bmi)
  }

  const handlePhoto = (e) => {
    const file = e.target.files?.[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  return (
    <div className="bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">

      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-slate-900 dark:text-white text-lg font-bold">
          Step 1: Basic Information
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
          Fill in the student's personal and academic details
        </p>
      </div>

      <div className="p-8 space-y-8">

        {/* Photo Upload */}
        <div className="flex items-center gap-8">
          <div className="relative group cursor-pointer">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <div className="size-32 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center overflow-hidden">
                {preview ? (
                  <img src={preview} alt="Student" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <span className="text-3xl text-slate-400 group-hover:hidden">📷</span>
                    <p className="text-[10px] text-slate-400 font-medium group-hover:hidden px-2 text-center mt-1">
                      UPLOAD PHOTO
                    </p>
                    <div className="hidden group-hover:flex absolute inset-0 bg-blue-600/80 rounded-full items-center justify-center">
                      <span className="text-white text-2xl">⬆️</span>
                    </div>
                  </>
                )}
              </div>
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhoto}
            />
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
              Student Portrait
            </h3>
            <p className="text-xs text-slate-400 max-w-sm">
              Upload a high-quality portrait photo (JPEG/PNG, max 2MB).
              Used for the Student ID card.
            </p>
            <label
              htmlFor="photo-upload"
              className="mt-3 text-blue-600 text-sm font-bold hover:underline flex items-center gap-1 cursor-pointer w-fit"
            >
              📷 Choose Photo
            </label>
          </div>
        </div>

        <hr className="border-slate-100 dark:border-slate-700" />

        {/* Dynamic Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-5">
          <DynamicFormLayout
            fields={basicDetailsFields}
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
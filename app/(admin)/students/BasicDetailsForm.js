"use client"
import { useState } from "react"
import { DynamicFormLayout } from "@/components/forms/DynamicFormLayout"
import { basicDetailsFields } from "@/config/studentFields"

export default function BasicDetailsForm({ form }) {
  const { register, setValue, watch, formState: { errors } } = form
  const [preview, setPreview] = useState(null)

  const handlePhoto = (e) => {
    const file = e.target.files?.[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  return (
    <div className="bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">

      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-slate-900 dark:text-white text-lg font-bold">
          Step 1: Basic Information
        </h2>
      </div>

      <div className="p-8 space-y-8">

        {/* Photo Upload */}
        <div className="flex items-center gap-8">
          <div className="relative group cursor-pointer">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <div className="size-32 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center overflow-hidden">
                {preview ? (
                  <img
                    src={preview}
                    alt="Student"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <span className="text-3xl text-slate-400 group-hover:hidden">📷</span>
                    <p className="text-[10px] text-slate-400 font-medium group-hover:hidden px-2 text-center mt-1">
                      UPLOAD PHOTO
                    </p>
                    <div className="hidden group-hover:flex absolute inset-0 bg-blue-600/80 rounded-full items-center justify-center transition-all">
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
              This photo will be used for the Student ID card.
            </p>
            <label
              htmlFor="photo-upload"
              className="mt-3 text-blue-600 text-sm font-bold hover:underline flex items-center gap-1 cursor-pointer w-fit"
            >
              📷 Take Photo via Webcam
            </label>
          </div>
        </div>

        <hr className="border-slate-100 dark:border-slate-800" />

        {/* All Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-6">
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
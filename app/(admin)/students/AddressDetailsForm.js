"use client"
import { useState } from "react"
import { DynamicFormLayout } from "@/components/forms/DynamicFormLayout"
import { presentFields, getPermanentFields } from "@/config/studentFields"

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal",
].map((s) => ({ value: s, label: s }))


export default function AddressDetailsForm({ form }) {
  const { register, setValue, watch, formState: { errors } } = form
  const [sameAsPresent, setSameAsPresent] = useState(false)

  const handleSameAsPresent = (checked) => {
    setSameAsPresent(checked)
    if (checked) {
      setValue("permanentLine1",   watch("presentLine1")   || "")
      setValue("permanentLine2",   watch("presentLine2")   || "")
      setValue("permanentCity",    watch("presentCity")    || "")
      setValue("permanentState",   watch("presentState")   || "")
      setValue("permanentPincode", watch("presentPincode") || "")
    }
  }

  return (
    <div className="space-y-6">

      {/* Present Address */}
      <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center text-base">
            🏠
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Present Address</h2>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DynamicFormLayout
              fields={presentFields}
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
            />
            {/* Country — readonly */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Country</label>
              <input
                type="text"
                defaultValue="India"
                disabled
                className="w-full h-11 px-4 border rounded-lg text-sm bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Permanent Address */}
      <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center text-base">
              📍
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Permanent Address</h2>
          </div>

          {/* Same as Present Toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={sameAsPresent}
                onChange={(e) => handleSameAsPresent(e.target.checked)}
              />
              <div className={`w-11 h-6 rounded-full transition-colors ${sameAsPresent ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"}`}>
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${sameAsPresent ? "translate-x-5" : "translate-x-0"}`} />
              </div>
            </div>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Same as Present Address
            </span>
          </label>
        </div>

        <div className={`p-8 transition-opacity duration-300 ${sameAsPresent ? "opacity-60 pointer-events-none" : "opacity-100"}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DynamicFormLayout
              fields={getPermanentFields(sameAsPresent)}
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
            />
            {/* Country — readonly */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Country</label>
              <input
                type="text"
                defaultValue="India"
                disabled
                className="w-full h-11 px-4 border rounded-lg text-sm bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
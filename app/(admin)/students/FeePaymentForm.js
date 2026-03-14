"use client"
import { DynamicFormLayout } from "@/components/forms/DynamicFormLayout"
import { rightFields } from "@/config/studentFields"

const feeItems = [
  { label: "Registration Fee",          amount: 250,  color: "" },
  { label: "Processing & Admin Fee",    amount: 50,   color: "" },
  { label: "Early Bird Discount (10%)", amount: -30,  color: "text-red-500" },
]

const total = feeItems.reduce((sum, item) => sum + item.amount, 0)

export default function FeePaymentForm({ form }) {
  const { register, setValue, watch, formState: { errors } } = form

  return (
    <div className="flex flex-col lg:flex-row gap-6">

      {/* Left — Student Summary */}
      <div className="lg:w-1/3 bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-blue-600 text-xl">👤</span>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Student Summary</h2>
        </div>

        {/* Avatar + Name */}
        <div className="flex items-center gap-4 mb-8">
          <div className="size-16 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 overflow-hidden flex items-center justify-center">
            <span className="text-3xl">🎓</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {watch("studentName") || "Student Name"}
            </h3>
            <p className="text-blue-600 text-xs font-bold uppercase tracking-wider">
              {watch("registrationNo") || "REG-XXXX"}
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              Class: {watch("class") ? `Grade ${watch("class")}` : "—"}
              {watch("section") ? ` - Section ${watch("section")}` : ""}
            </p>
          </div>
        </div>

        {/* Info rows */}
        <div className="space-y-3">
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Father's Name</p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {watch("fatherName") || "—"}
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Contact Number</p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {watch("fatherMobile") || watch("mobileNo") || "—"}
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date of Birth</p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {watch("dob") || "—"}
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Gender</p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 capitalize">
              {watch("gender") || "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Right — Fee Breakdown + Payment */}
      <div className="lg:w-2/3 bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">

        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <span className="text-blue-600 text-xl">🧾</span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Fee Breakdown & Payment
          </h2>
        </div>

        <div className="p-8 space-y-6">

          {/* Fee Table */}
          <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left px-4 py-3 font-semibold text-slate-500 dark:text-slate-400">
                    Description
                  </th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-500 dark:text-slate-400">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {feeItems.map((item) => (
                  <tr key={item.label}>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400 font-medium">
                      {item.label}
                    </td>
                    <td className={`px-4 py-3 text-right font-bold ${item.color || "text-slate-900 dark:text-white"}`}>
                      {item.amount < 0
                        ? `-₹${Math.abs(item.amount)}`
                        : `₹${item.amount}`
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-200 dark:border-slate-700">
                  <td className="px-4 pt-4 pb-3 text-slate-900 dark:text-white font-bold text-base">
                    Net Payable
                  </td>
                  <td className="px-4 pt-4 pb-3 text-right text-blue-600 font-bold text-2xl">
                    ₹{total}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Payment Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DynamicFormLayout
              fields={rightFields}
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
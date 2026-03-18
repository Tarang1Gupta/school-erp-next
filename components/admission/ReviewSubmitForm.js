"use client"
import { useFormContext } from "react-hook-form"

// ─── Review Card ───────────────────────────────────────────────────────
function ReviewCard({ title, icon, rows }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
      <p className="text-sm font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
        <span>{icon}</span> {title}
      </p>
      <div className="space-y-2.5">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex justify-between items-start text-sm border-b border-slate-100 dark:border-slate-700/50 pb-2 last:border-0 last:pb-0"
          >
            <span className="text-slate-400 shrink-0 mr-4">{row.label}</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200 text-right">
              {row.val || <span className="text-slate-300 dark:text-slate-600 font-normal">—</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────
export default function ReviewSubmitForm() {
  const { getValues } = useFormContext()
  const data = getValues()

  const addressLine = [
    data.presentAddress?.line1,
    data.presentAddress?.city,
    data.presentAddress?.state,
    data.presentAddress?.pincode,
  ].filter(Boolean).join(", ")

  const permanentLine = [
    data.permanentAddress?.line1,
    data.permanentAddress?.city,
    data.permanentAddress?.state,
    data.permanentAddress?.pincode,
  ].filter(Boolean).join(", ")

  return (
    <div className="bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">

      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-slate-900 dark:text-white text-lg font-bold">
          Step 7: Review & Submit
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
          Carefully review all details before final submission
        </p>
      </div>

      <div className="p-6 space-y-5">

        {/* Warning Banner */}
        <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 rounded-xl px-5 py-4">
          <span className="text-amber-500 shrink-0 mt-0.5">⚠️</span>
          <div>
            <p className="text-sm font-bold text-amber-700 dark:text-amber-300">
              Please verify all information before submitting
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
              Once submitted, changes may require admin approval and could delay the admission process.
            </p>
          </div>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Student Info */}
          <ReviewCard
            title="Student Information"
            icon="👤"
            rows={[
              { label: "Full Name",        val: data.fullName },
              { label: "Gender",           val: data.gender },
              { label: "Date of Birth",    val: data.dob },
              { label: "Class",            val: data.grade ? `Grade ${data.grade}` : null },
              { label: "Section",          val: data.section },
              { label: "Blood Group",      val: data.bloodGroup },
              { label: "Aadhaar No.",      val: data.aadhaar },
              { label: "Category",         val: data.category },
              { label: "Nationality",      val: data.nationality },
              { label: "Religion",         val: data.religion },
            ]}
          />

          {/* Parent Info */}
          <ReviewCard
            title="Parent Information"
            icon="👨‍👩‍👦"
            rows={[
              { label: "Father's Name",   val: data.father?.name },
              { label: "Father's Mobile", val: data.father?.mobile },
              { label: "Father's Email",  val: data.father?.email },
              { label: "Mother's Name",   val: data.mother?.name },
              { label: "Mother's Mobile", val: data.mother?.mobile },
              { label: "Mother's Email",  val: data.mother?.email },
              { label: "Guardian's Name", val: data.guardian?.name },
            ]}
          />

          {/* Address Info */}
          <ReviewCard
            title="Address Details"
            icon="🏠"
            rows={[
              { label: "Present Address",   val: addressLine || null },
              { label: "Permanent Address", val: permanentLine || null },
            ]}
          />

          {/* Previous School */}
          <ReviewCard
            title="Previous School"
            icon="🎓"
            rows={[
              { label: "School Name",    val: data.school?.name },
              { label: "Board",          val: data.school?.board },
              { label: "Last Class",     val: data.school?.lastClass },
              { label: "Year of Passing",val: data.school?.yearOfPassing },
              { label: "Medium",         val: data.school?.medium },
              { label: "Result",         val: data.school?.result },
              { label: "TC Available",   val: data.school?.tcAvailable ? "Yes" : "No (Pending)" },
            ]}
          />

          {/* Fee Details */}
          <div className="md:col-span-2">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30 p-5">
              <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
                <span>💳</span> Fee Details
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                {[
                  { label: "Template",    val: data.fee?.template    || "Standard Academic Fee" },
                  { label: "Installment", val: data.fee?.installment || "Quarterly (4 Installments)" },
                  { label: "Discount",    val: data.fee?.discount    || "None" },
                ].map((row) => (
                  <div key={row.label} className="bg-white dark:bg-slate-800/60 rounded-lg px-4 py-3 border border-blue-100 dark:border-blue-900/20">
                    <p className="text-xs text-slate-400 mb-1">{row.label}</p>
                    <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm">{row.val}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center border-t border-blue-200 dark:border-blue-800 pt-4">
                <span className="font-bold text-slate-800 dark:text-white text-sm">Net Payable</span>
                <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                  ₹6,320.00
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Identifiers */}
        {(data.registrationNo || data.admissionNo || data.rollNo) && (
          <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
            <p className="text-sm font-bold text-slate-800 dark:text-white mb-3">📋 Record Identifiers</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {[
                { label: "Registration No.", val: data.registrationNo },
                { label: "Admission No.",    val: data.admissionNo },
                { label: "S.R. No.",         val: data.srNo },
                { label: "Roll No.",         val: data.rollNo },
              ].map((row) => (
                <div key={row.label}>
                  <p className="text-xs text-slate-400 mb-0.5">{row.label}</p>
                  <p className="font-semibold text-slate-700 dark:text-slate-200">
                    {row.val || <span className="text-slate-300 dark:text-slate-600 font-normal">—</span>}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Declaration */}
        <div className="flex items-start gap-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl px-5 py-4">
          <svg width="16" height="16" className="text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.7" />
          </svg>
          <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
            By clicking <span className="font-bold">Complete Admission</span>, you confirm that all the
            information provided is accurate and complete to the best of your knowledge.
            The admission will be processed for Session 2024-25.
          </p>
        </div>

      </div>
    </div>
  )
}
"use client"

const STEPS = [
  { id: 1, label: "Basic Details",   sub: "Full name, Class, DOB" },
  { id: 2, label: "Parent Details",  sub: "Father & Mother info" },
  { id: 3, label: "Address",         sub: "Current & Permanent" },
  { id: 4, label: "Previous School", sub: "History & Records" },
  { id: 5, label: "Documents",       sub: "Upload required files" },
  { id: 6, label: "Fee Assignment",  sub: "Admission fees" },
  { id: 7, label: "Review & Submit", sub: "Confirm & complete" },
]

export default function AdmissionSidebar({ currentStep }) {
  // currentStep is 0-indexed from parent, sidebar uses 1-indexed ids
  const current = currentStep + 1

  return (
    <div className="col-span-12 lg:col-span-3">
      <div className="bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm sticky top-6">

        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">
          Progress
        </p>

        <div className="space-y-1">
          {STEPS.map((step, i) => {
            const done   = current > step.id
            const active = current === step.id
            const isLast = i === STEPS.length - 1

            return (
              <div key={step.id}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    active ? "bg-blue-50 dark:bg-blue-900/20" : ""
                  }`}
                >
                  {/* Step circle */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      done
                        ? "bg-emerald-500 text-white"
                        : active
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {done ? (
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
                        <path
                          d="M5 13l4 4L19 7"
                          stroke="#fff"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </div>

                  {/* Step label */}
                  <div className="min-w-0">
                    <p
                      className={`text-sm font-semibold truncate ${
                        active
                          ? "text-blue-700 dark:text-blue-400"
                          : done
                          ? "text-slate-600 dark:text-slate-300"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                      {step.sub}
                    </p>
                  </div>
                </div>

                {/* Connector line */}
                {!isLast && (
                  <div
                    className={`ml-6 w-px h-3 transition-colors ${
                      done
                        ? "bg-emerald-300 dark:bg-emerald-700"
                        : "bg-slate-100 dark:bg-slate-700"
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Step counter */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-400">Overall Progress</span>
            <span className="text-xs font-bold text-blue-600">
              {currentStep} / {STEPS.length} steps
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  )
}
"use client"
const steps = [
  { label: "Basic Details",     sub: "Full name, Class, DOB" },
  { label: "Parent Details",    sub: "Father & Mother info" },
  { label: "Address",           sub: "Current & Permanent" },
  { label: "Previous School",   sub: "History & Records" },
  { label: "Fee Payment",       sub: "Admission fees" },
]

export default function StepSidebar({ currentStep }) {
  return (
    <div className="col-span-12 lg:col-span-3 sticky top-24 self-start">
      <div className="bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 rounded-xl p-4">
        <div className="flex flex-col gap-0">
          {steps.map((step, i) => {
            const completed = i < currentStep
            const active    = i === currentStep
            const isLast    = i === steps.length - 1
            return (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`size-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    completed ? "bg-emerald-500 text-white"
                    : active   ? "bg-blue-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                  }`}>
                    {completed ? "✓" : i + 1}
                  </div>
                  {!isLast && (
                    <div className={`w-[2px] h-12 ${
                      completed ? "bg-emerald-500/30"
                      : active   ? "bg-blue-600/30"
                      : "bg-slate-100 dark:bg-slate-800"
                    }`} />
                  )}
                </div>
                <div className="pt-1">
                  <p className={`font-bold text-sm leading-tight ${
                    completed ? "text-emerald-500"
                    : active   ? "text-blue-600"
                    : "text-slate-500 dark:text-slate-400"
                  }`}>
                    {step.label}
                  </p>
                  <p className="text-slate-400 text-xs mt-1">{step.sub}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
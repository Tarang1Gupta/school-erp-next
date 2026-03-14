"use client"
import { useState, useRef, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Topbar from "@/components/layout/Topbar"
import { ArrowRight } from "lucide-react"

// Paste karo tumhare schemas — ya temporary fake schemas banao
import {
  basicDetailsSchema,
  parentDetailsSchema,
  addressSchema,
  previousSchoolSchema,
  feePaymentSchema,
} from "@/schemas/student.schema"
import StepSidebar from "../StepSidebar"
import BasicDetailsForm from "../BasicDetailsForm"
import ParentDetailsForm from "../ParentDetailsForm"
import AddressDetailsForm from "../AddressDetailsForm"
import PreviousSchoolForm from "../PreviousSchoolForm"
import FeePaymentForm from "../FeePaymentForm"

// Paste karo tumhare saare form components — BasicDetailsForm, ParentDetailsForm etc.
// (same code — koi change nahi)

const schemas = [basicDetailsSchema, parentDetailsSchema, addressSchema, previousSchoolSchema, feePaymentSchema]

const breadcrumbLabels = ["Basic Details", "Parent & Guardian Details", "Address Details", "Previous School Details", "Fee Payment Details"]

const pageHeaders = [
  { title: "New Student Registration",       sub: "Please fill in the basic details to start the enrollment process." },
  { title: "Parent & Guardian Information",  sub: "Please provide the contact and professional information." },
  { title: "Address Details",                sub: "Please provide the current and permanent address." },
  { title: "Previous School Details",        sub: "Please provide the academic details of the previous school." },
  { title: "Fee Payment Details",            sub: "Please provide the fee payment details." },
]

export default function NewRegistrationPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [completed, setCompleted]     = useState(false)
  const [allData, setAllData]         = useState({})
  const mainRef = useRef(null)

  const form = useForm({
    resolver: zodResolver(schemas[currentStep]),
    mode: "onTouched",
    defaultValues: {
      nationality: "Indian", medium: "English",
      yearOfPassing: "2025", tcAvailable: "no",
      paymentMode: "cash",
      receiptDate: new Date().toISOString().split("T")[0],
    },
  })

  const scrollToTop = () => {
    let el = mainRef.current?.parentElement
    while (el) {
      const { overflowY } = window.getComputedStyle(el)
      if (overflowY === "auto" || overflowY === "scroll") {
        el.scrollTo({ top: 0, behavior: "smooth" })
        return
      }
      el = el.parentElement
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const onNext = useCallback(
    form.handleSubmit((data) => {
      setAllData(prev => ({ ...prev, ...data }))
      if (currentStep < 4) {
        setCurrentStep(s => s + 1)
        scrollToTop()
      } else {
        setCompleted(true)
        console.log("Final data:", { ...allData, ...data })
      }
    }),
    [form, currentStep, allData]
  )

  const onPrev = () => {
    setCurrentStep(s => Math.max(0, s - 1))
    scrollToTop()
  }

  if (completed) {
    return (
      <>
        <Topbar title="Registration Complete" />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center p-8">
          <div className="size-24 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
            <span className="text-5xl">✅</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Registration Complete!</h1>
          <p className="text-slate-500 max-w-md">
            The student has been successfully registered.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => { setCurrentStep(0); setCompleted(false); setAllData({}); form.reset() }}
              className="px-8 py-3 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all"
            >
              Register Another Student
            </button>
            <button
              onClick={() => router.push("/students/registration-list")}
              className="px-8 py-3 rounded-lg border border-slate-300 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
            >
              Back to List
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Topbar title="New Registration" subtitle="Student Registration Form" />

      <main ref={mainRef} className="p-4 md:p-6 bg-slate-50 dark:bg-[#101922] min-h-full">

        {/* Breadcrumb */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Link href="/students" className="text-slate-500 text-sm font-medium hover:text-blue-600">Students</Link>
          <span className="text-slate-400 text-sm">/</span>
          <Link href="/students/registration-list" className="text-slate-500 text-sm font-medium hover:text-blue-600">Registration List</Link>
          <span className="text-slate-400 text-sm">/</span>
          <span className="text-blue-600 text-sm font-semibold">{breadcrumbLabels[currentStep]}</span>
        </div>

        {/* Page header */}
        <div className="flex flex-wrap justify-between items-end gap-3 mb-8">
          <div>
            <h1 className="text-slate-900 dark:text-white text-2xl font-black leading-tight">
              {pageHeaders[currentStep].title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              {pageHeaders[currentStep].sub}
            </p>
          </div>
          <div className="bg-blue-600/10 text-blue-600 px-4 py-2 rounded-lg font-bold text-sm">
            Session: 2024-25
          </div>
        </div>

        {/* Grid — Sidebar + Form */}
        <div className="grid grid-cols-12 gap-8">
          <StepSidebar currentStep={currentStep} />

          <div className="col-span-12 lg:col-span-9 space-y-6">
            <form onSubmit={(e) => e.preventDefault()} noValidate>
              {currentStep === 0 && <BasicDetailsForm form={form} />}
              {currentStep === 1 && <ParentDetailsForm form={form} />}
              {currentStep === 2 && <AddressDetailsForm form={form} />}
              {currentStep === 3 && <PreviousSchoolForm form={form} />}
              {currentStep === 4 && <FeePaymentForm form={form} />}

              {/* Navigation buttons */}
              <div className="bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 rounded-xl px-8 py-5 flex justify-between items-center">
                {currentStep === 0 ? (
                  <Link href="/students/registration-list">
                    <button type="button" className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      Cancel
                    </button>
                  </Link>
                ) : (
                  <button type="button" onClick={onPrev} className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
                    ← Previous
                  </button>
                )}

                <button type="button" onClick={onNext} className="px-8 py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 shadow-lg transition-all flex items-center gap-2">
                  {currentStep === 4
                    ? "Pay & Complete Registration ✓"
                    : <> Save & Next <ArrowRight size={16} /> </>
                  }
                </button>
              </div>
            </form>

            {/* Info banners */}
            {currentStep === 1 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-xl p-4 flex gap-4">
                <span className="text-blue-500 text-lg">ℹ️</span>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Note to Admin</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Fields marked with <span className="text-red-500">*</span> are mandatory.
                  </p>
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div className="flex items-start gap-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30">
                <span className="text-amber-500 text-lg">⚠️</span>
                <div>
                  <p className="text-sm font-bold text-amber-900 dark:text-amber-200">Verification Required</p>
                  <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-1">
                    Ensure the School Name matches the stamp on the TC.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
"use client"
import { useState, useRef, useCallback } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import Topbar from "@/components/layout/Topbar"
import AdmissionSidebar from "@/components/admission/AdmissionSidebar"
import BasicDetailsForm from "@/components/admission/BasicDetailsForm"
import ParentDetailsForm from "@/components/admission/ParentDetailsform"
import AddressDetailsForm from "@/components/admission/AddressDetailsForm"
import PreviousSchoolForm from "@/components/admission/PreviousSchoolForm"
import DocumentsForm from "@/components/admission/DocumentsForm"
import FeeAssignmentForm from "@/components/admission/FeeAssignmentForm"
// import ReviewSubmitForm from "@/components/admission/ReviewSubmitForm"

import { stepSchemas, fullSchema } from "@/schemas/admission.schema"

// ─── Constants ──────────────────────────────────────────────────────────
const API_URL = "http://localhost:5001/new-admission"

const breadcrumbLabels = [
  "Basic Details",
  "Parent & Guardian Details",
  "Address Details",
  "Previous School Details",
  "Documents",
  "Fee Assignment",
  "Review & Submit",
]

const pageHeaders = [
  { title: "New Student Admission",         sub: "Please fill in the basic details to complete the enrollment process." },
  { title: "Parent & Guardian Information", sub: "Please provide the contact and professional information." },
  { title: "Address Details",               sub: "Please provide the current and permanent address." },
  { title: "Previous School Details",       sub: "Please provide the academic details of the previous school." },
  { title: "Document Upload",               sub: "Please upload all required documents for admission." },
  { title: "Fee Assignment",                sub: "Please review and assign the fee structure." },
  { title: "Review & Submit",               sub: "Review all details carefully before final submission." },
]

const stepFieldMap = {
  0: ["fullName", "gender", "dob", "grade", "aadhaar"],
  1: ["father.name", "father.mobile", "mother.name", "mother.mobile"],
  2: ["presentAddress.pincode", "permanentAddress.pincode"],
  3: ["school.name", "school.board", "school.lastClass"],
  4: [],
  5: ["fee.template", "fee.installment"],
  6: [],
}

// ─── Main Page ───────────────────────────────────────────────────────────
export default function NewAdmissionPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [submitted, setSubmitted]     = useState(false)
  const mainRef = useRef(null)

  const methods = useForm({
    resolver: zodResolver(stepSchemas[currentStep]),
    mode: "onTouched",
    defaultValues: {
      school: { medium: "English", yearOfPassing: "2024", tcAvailable: false },
      nationality: "Indian",
      fee: {
        template:    "Standard Academic Fee",
        installment: "Quarterly (4 Installments)",
        discount:    "None",
        adjustment:  "0",
      },
    },
  })

  const { handleSubmit, trigger, getValues } = methods

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

  const onNext = useCallback(async () => {
    const fields = stepFieldMap[currentStep]
    const schema = stepSchemas[currentStep]
    const result = schema.safeParse(getValues())
    if (!result.success) {
      await trigger(fields)
      return
    }
    setCurrentStep(s => Math.min(s + 1, 6))
    scrollToTop()
  }, [currentStep, getValues, trigger])

  const onPrev = () => {
    setCurrentStep(s => Math.max(0, s - 1))
    scrollToTop()
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          submittedAt: new Date().toISOString(),
          session: "2024-25",
        }),
      })
      if (!response.ok) throw new Error(`Server error: ${response.status}`)
      const result = await response.json()
      console.log("✅ Admission Submitted:", result)
      setSubmitted(true)
    } catch (error) {
      console.error("❌ Submission failed:", error)
      alert(`Submission failed: ${error.message}. Please try again.`)
    }
  })

  // ── Success screen ──
  if (submitted) {
    return (
      <>
        <Topbar title="Admission Complete" />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center p-8">
          <div className="size-24 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
            <span className="text-5xl">✅</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Admission Complete!</h1>
          <p className="text-slate-500 max-w-md">
            The student has been successfully admitted. Session 2024-25.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => { setCurrentStep(0); setSubmitted(false); methods.reset() }}
              className="px-8 py-3 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all"
            >
              Admit Another Student
            </button>
            <button
              onClick={() => router.push("/admin/admission-list")}
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
      <Topbar title="New Admission" subtitle="Student Admission Form" />

      <main ref={mainRef} className="p-4 md:p-6 bg-slate-50 dark:bg-[#101922] min-h-full">

        {/* Breadcrumb */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Link href="/admin" className="text-slate-500 text-sm font-medium hover:text-blue-600">
            Dashboard
          </Link>
          <span className="text-slate-400 text-sm">/</span>
          <Link href="/admin/admission-list" className="text-slate-500 text-sm font-medium hover:text-blue-600">
            Admission List
          </Link>
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
          <AdmissionSidebar currentStep={currentStep} />

          <div className="col-span-12 lg:col-span-9 space-y-6">
            <FormProvider {...methods}>
              <form onSubmit={(e) => e.preventDefault()} noValidate>

                {currentStep === 0 && <BasicDetailsForm />}
                {currentStep === 1 && <ParentDetailsForm />}
                {currentStep === 2 && <AddressDetailsForm />}
                {currentStep === 3 && <PreviousSchoolForm />}
                {currentStep === 4 && <DocumentsForm />}
                {currentStep === 5 && <FeeAssignmentForm />}
                {currentStep === 6 && <ReviewSubmitForm data={getValues()} />}

                {/* Navigation buttons */}
                <div className="bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 rounded-xl px-8 py-5 flex justify-between items-center">
                  {currentStep === 0 ? (
                    <Link href="/admin/admission-list">
                      <button type="button" className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        Cancel
                      </button>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={onPrev}
                      className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
                    >
                      ← Previous
                    </button>
                  )}

                  {currentStep < 6 ? (
                    <button
                      type="button"
                      onClick={onNext}
                      className="px-8 py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 shadow-lg transition-all flex items-center gap-2"
                    >
                      Save & Next <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={onSubmit}
                      className="px-8 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center gap-2"
                    >
                      Complete Admission →
                    </button>
                  )}
                </div>

              </form>
            </FormProvider>

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
            {currentStep === 4 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-xl p-4 flex gap-4">
                <span className="text-blue-500 text-lg">ℹ️</span>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Document Guidelines</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Max 2MB per file. JPEG, PNG or PDF formats only. Combine multiple pages into one PDF if needed.
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
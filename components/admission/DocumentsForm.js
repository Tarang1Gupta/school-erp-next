"use client"
import { useState, useRef } from "react"

// ─── Document Config ───────────────────────────────────────────────────
const DOCS = [
  {
    id: "photo",
    title: "Student Photo",
    description: "Passport size. JPEG/PNG format only.",
    required: false,
    optional: false,
    icon: "👤",
    accept: "image/*",
  },
  {
    id: "birth",
    title: "Birth Certificate",
    description: "Official government issued certificate. PDF preferred.",
    required: true,
    icon: "📄",
    accept: ".pdf,image/*",
  },
  {
    id: "aadhaar",
    title: "Aadhaar Card",
    description: "Both sides scanned together in a single PDF.",
    required: false,
    icon: "🪪",
    accept: ".pdf",
  },
  {
    id: "tc",
    title: "Transfer Certificate",
    description: "Issued by the previous educational institution.",
    required: false,
    optional: true,
    icon: "📋",
    accept: ".pdf,image/*",
  },
  {
    id: "marksheet",
    title: "Previous Class Marksheet",
    description: "Original or provisional report card.",
    required: true,
    icon: "⭐",
    accept: ".pdf,image/*",
  },
  {
    id: "casteCert",
    title: "Caste Certificate",
    description: "Required for SC/ST/OBC category students.",
    required: false,
    optional: true,
    icon: "📃",
    accept: ".pdf,image/*",
  },
  {
    id: "medicalCert",
    title: "Medical / Disability Certificate",
    description: "Required only for PwD students.",
    required: false,
    optional: true,
    icon: "🏥",
    accept: ".pdf,image/*",
  },
]

// ─── Single Doc Row ────────────────────────────────────────────────────
function DocRow({ doc, onUpload, onRemove }) {
  const inputRef = useRef(null)

  return (
    <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700 rounded-xl px-5 py-4 flex items-center gap-4">

      {/* Icon */}
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 ${
        doc.status === "uploaded"
          ? "bg-blue-50 dark:bg-blue-900/30"
          : "bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
      }`}>
        {doc.icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-slate-800 dark:text-white">{doc.title}</span>

          {doc.status === "uploaded" && (
            <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-wide">
              Uploaded
            </span>
          )}
          {doc.required && doc.status !== "uploaded" && (
            <span className="text-[10px] font-bold bg-red-100 dark:bg-red-900/30 text-red-500 px-2 py-0.5 rounded-full uppercase tracking-wide">
              Required
            </span>
          )}
          {doc.optional && (
            <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full uppercase tracking-wide">
              Optional
            </span>
          )}
        </div>

        <p className="text-xs text-slate-400 mt-0.5">{doc.description}</p>

        {doc.status === "uploaded" && (
          <p className="text-xs text-blue-500 font-medium mt-1">
            {doc.fileName} ({doc.fileSize})
          </p>
        )}
      </div>

      {/* Action */}
      <div className="shrink-0">
        {doc.status === "uploaded" ? (
          <button
            type="button"
            onClick={() => onRemove(doc.id)}
            className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-300 dark:hover:border-red-500 transition"
            title="Remove file"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : (
          <>
            <input
              type="file"
              accept={doc.accept}
              className="hidden"
              ref={inputRef}
              onChange={(e) => onUpload(doc.id, e)}
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition"
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Upload
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────
export default function DocumentsForm() {
  const [docs, setDocs] = useState(
    DOCS.map((d) => ({ ...d, status: "pending", fileName: null, fileSize: null }))
  )

  const uploaded      = docs.filter((d) => d.status === "uploaded").length
  const progress      = Math.round((uploaded / docs.length) * 100)
  const requiredMissing = docs.filter((d) => d.required && d.status !== "uploaded")

  const handleUpload = (id, e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const sizeKB = Math.round(file.size / 1024)
    setDocs((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: "uploaded", fileName: file.name, fileSize: `${sizeKB} KB` }
          : d
      )
    )
  }

  const handleRemove = (id) => {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: "pending", fileName: null, fileSize: null }
          : d
      )
    )
  }

  return (
    <div className="bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">

      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-slate-900 dark:text-white text-lg font-bold">
          Step 5: Document Upload
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
          Upload all required documents for admission processing
        </p>
      </div>

      <div className="p-6 space-y-5">

        {/* Progress Bar */}
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700 rounded-xl px-5 py-4">
          <div className="shrink-0">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-1">
              Upload Progress
            </p>
            <p className="text-sm font-bold text-blue-600">{progress}% Complete</p>
          </div>
          <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap shrink-0">
            {uploaded} / {docs.length}
          </p>
        </div>

        {/* Required Missing Warning */}
        {requiredMissing.length > 0 && (
          <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl px-5 py-3">
            <svg width="16" height="16" className="text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className="text-xs text-red-600 dark:text-red-400">
              <span className="font-bold">Required documents missing: </span>
              {requiredMissing.map((d) => d.title).join(", ")}
            </p>
          </div>
        )}

        {/* All uploaded success */}
        {requiredMissing.length === 0 && uploaded > 0 && (
          <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl px-5 py-3">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-emerald-500 shrink-0">
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.7" />
            </svg>
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              All required documents uploaded successfully.
            </p>
          </div>
        )}

        {/* Doc List */}
        <div className="space-y-3">
          {docs.map((doc) => (
            <DocRow
              key={doc.id}
              doc={doc}
              onUpload={handleUpload}
              onRemove={handleRemove}
            />
          ))}
        </div>

        {/* Info Banner */}
        <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-xl px-5 py-4">
          <svg width="16" height="16" className="text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 8h.01M12 12v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
            Max <span className="font-bold">2MB</span> per file. Accepted formats: JPEG, PNG, PDF.
            Combine multiple pages into a single PDF if needed. Optional documents can be submitted later.
          </p>
        </div>

      </div>
    </div>
  )
}
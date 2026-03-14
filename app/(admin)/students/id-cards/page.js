"use client"
import { useState, useMemo } from "react"
import Topbar from "@/components/layout/Topbar"
import Link from "next/link"

// ─── Mock Data ───────────────────────────────────────────────────────────────
const ALL_STUDENTS = [
  { id: "10A-001", name: "Sarah Jenkins",  initials: "SJ", color: "bg-indigo-500",  grade: "10", section: "A", dob: "12 Jun 2008", valid: "Mar 2026", hasPhoto: true  },
  { id: "10A-002", name: "Michael Chen",   initials: "MC", color: "bg-sky-500",     grade: "10", section: "A", dob: "04 Aug 2007", valid: "Mar 2026", hasPhoto: true  },
  { id: "10A-003", name: "David Miller",   initials: "DM", color: "bg-amber-500",   grade: "10", section: "A", dob: "19 Mar 2008", valid: "Mar 2026", hasPhoto: false },
  { id: "10A-004", name: "Emily Davis",    initials: "ED", color: "bg-pink-500",    grade: "10", section: "A", dob: "22 Jan 2008", valid: "Mar 2026", hasPhoto: true  },
  { id: "10A-005", name: "James Wilson",   initials: "JW", color: "bg-teal-500",    grade: "10", section: "A", dob: "07 Sep 2007", valid: "Mar 2026", hasPhoto: true  },
  { id: "10B-001", name: "Priya Sharma",   initials: "PS", color: "bg-violet-500",  grade: "10", section: "B", dob: "14 Feb 2008", valid: "Mar 2026", hasPhoto: true  },
  { id: "10B-002", name: "Lucas Oliveira", initials: "LO", color: "bg-lime-600",    grade: "10", section: "B", dob: "30 Oct 2007", valid: "Mar 2026", hasPhoto: false },
  { id: "9A-001",  name: "Anika Lee",      initials: "AL", color: "bg-emerald-500", grade: "9",  section: "A", dob: "05 May 2009", valid: "Mar 2026", hasPhoto: true  },
  { id: "9A-002",  name: "Omar Abdullah",  initials: "OA", color: "bg-cyan-500",    grade: "9",  section: "A", dob: "11 Dec 2008", valid: "Mar 2026", hasPhoto: true  },
  { id: "9B-001",  name: "Sofia Nguyen",   initials: "SN", color: "bg-purple-500",  grade: "9",  section: "B", dob: "28 Jul 2009", valid: "Mar 2026", hasPhoto: false },
]

const CLASSES  = ["All Classes",  "Grade 9", "Grade 10"]
const SECTIONS = ["All Sections", "Section A", "Section B"]

const TEMPLATES = [
  { id: "modern",   label: "Modern Blue",  layout: "modern",   grad: "from-blue-600 to-blue-500",    bar: "bg-blue-600",    accent: "text-blue-600",    icon: "text-blue-600"    },
  { id: "red",      label: "Minimal Red",  layout: "side",     grad: "from-red-600 to-rose-500",     bar: "bg-red-600",     accent: "text-red-600",     icon: "text-red-600"     },
  { id: "vertical", label: "Vertical ID",  layout: "vertical", grad: "from-emerald-600 to-teal-500", bar: "bg-emerald-600", accent: "text-emerald-600", icon: "text-emerald-600" },
  { id: "dark",     label: "Classic Dark", layout: "dark",     grad: "from-slate-800 to-slate-700",  bar: "bg-slate-800",   accent: "text-slate-600",   icon: "text-slate-700"   },
]

// ─── SVGs ─────────────────────────────────────────────────────────────────────
const SchoolIcon = ({ cls }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
)

const QRDark = () => (
  <svg viewBox="0 0 40 40" className="w-9 h-9 opacity-60" fill="none">
    <rect x="1" y="1" width="16" height="16" rx="1" stroke="#334155" strokeWidth="1.5"/>
    <rect x="4" y="4" width="10" height="10" rx="0.5" fill="#334155"/>
    <rect x="23" y="1" width="16" height="16" rx="1" stroke="#334155" strokeWidth="1.5"/>
    <rect x="26" y="4" width="10" height="10" rx="0.5" fill="#334155"/>
    <rect x="1" y="23" width="16" height="16" rx="1" stroke="#334155" strokeWidth="1.5"/>
    <rect x="4" y="26" width="10" height="10" rx="0.5" fill="#334155"/>
    <rect x="23" y="23" width="4" height="4" fill="#334155"/>
    <rect x="30" y="23" width="4" height="4" fill="#334155"/>
    <rect x="23" y="30" width="4" height="4" fill="#334155"/>
    <rect x="30" y="30" width="9" height="9" rx="0.5" fill="#334155"/>
  </svg>
)

const QRLight = () => (
  <svg viewBox="0 0 40 40" className="w-8 h-8 opacity-70" fill="none">
    <rect x="1" y="1" width="16" height="16" rx="1" stroke="white" strokeWidth="1.5"/>
    <rect x="4" y="4" width="10" height="10" rx="0.5" fill="white"/>
    <rect x="23" y="1" width="16" height="16" rx="1" stroke="white" strokeWidth="1.5"/>
    <rect x="26" y="4" width="10" height="10" rx="0.5" fill="white"/>
    <rect x="1" y="23" width="16" height="16" rx="1" stroke="white" strokeWidth="1.5"/>
    <rect x="4" y="26" width="10" height="10" rx="0.5" fill="white"/>
    <rect x="23" y="23" width="4" height="4" fill="white"/>
    <rect x="30" y="23" width="4" height="4" fill="white"/>
    <rect x="23" y="30" width="4" height="4" fill="white"/>
    <rect x="30" y="30" width="9" height="9" rx="0.5" fill="white"/>
  </svg>
)

// ─── Card Designs ─────────────────────────────────────────────────────────────
const CardModern = ({ s, t, cfg }) => (
  <div className="w-full max-w-xs bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 flex flex-col hover:scale-[1.02] transition-transform">
    <div className={`h-20 bg-gradient-to-r ${t.grad} relative overflow-hidden`}>
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-white opacity-10 rounded-full"/>
      <div className="flex items-center gap-2.5 p-3 relative z-10">
        <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
          <SchoolIcon cls={t.icon}/>
        </div>
        <div className="text-white">
          <p className="text-[10px] font-black uppercase tracking-wider opacity-95">{cfg.schoolName}</p>
          <p className="text-[9px] opacity-70">{cfg.tagline}</p>
        </div>
      </div>
    </div>
    <div className="flex-1 px-3 pb-3 pt-1 relative">
      <div className="flex justify-between items-start">
        <div className={`w-[72px] h-[72px] rounded-full border-4 border-white shadow-md -mt-9 z-10 flex-shrink-0 flex items-center justify-center text-white font-bold text-base ${s.color}`}>
          {s.initials}
        </div>
        <div className="pt-1"><QRDark/></div>
      </div>
      <h2 className="text-sm font-black text-slate-900 mt-0.5">{s.name}</h2>
      <p className={`text-[9px] font-bold uppercase tracking-wide ${t.accent}`}>Student</p>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-2">
        {[["ID Number", s.id], ["Class", `Gr.${s.grade}–${s.section}`], ["DOB", s.dob], ["Valid Thru", s.valid]].map(([label, val]) => (
          <div key={label}>
            <span className="text-slate-400 block text-[8px] uppercase font-bold">{label}</span>
            <span className="text-[10px] font-semibold text-slate-700">{val}</span>
          </div>
        ))}
      </div>
    </div>
    <div className={`h-1.5 w-full ${t.bar}`}/>
  </div>
)

const CardSide = ({ s, t, cfg }) => (
  <div className="w-full max-w-xs bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 flex hover:scale-[1.02] transition-transform" style={{ minHeight: 170 }}>
    <div className={`w-2.5 flex-shrink-0 bg-gradient-to-b ${t.grad}`}/>
    <div className="flex-1 p-3 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
            <SchoolIcon cls={t.icon}/>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-wider text-slate-800">{cfg.schoolName}</p>
            <p className="text-[8px] text-slate-400">{cfg.tagline}</p>
          </div>
        </div>
        <QRDark/>
      </div>
      <div className="flex items-center gap-3">
        <div className={`w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-sm ${s.color}`}>
          {s.initials}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-black text-slate-900 truncate">{s.name}</h2>
          <p className={`text-[9px] font-bold uppercase tracking-wide ${t.accent}`}>Student</p>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-1.5">
            {[["ID", s.id], ["Class", `${s.grade}-${s.section}`], ["DOB", s.dob], ["Valid", s.valid]].map(([label, val]) => (
              <div key={label}>
                <span className="text-slate-400 block text-[8px] uppercase font-bold">{label}</span>
                <span className="text-[10px] font-semibold text-slate-700">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

const CardVertical = ({ s, t, cfg }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 flex flex-col hover:scale-[1.02] transition-transform" style={{ width: 175 }}>
    <div className={`h-14 bg-gradient-to-b ${t.grad} relative overflow-hidden flex-shrink-0`}>
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-white opacity-10 rounded-full"/>
      <div className="flex flex-col items-center justify-center h-full relative z-10 px-2 gap-0.5">
        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
          <SchoolIcon cls={t.icon}/>
        </div>
        <p className="text-[8px] font-black uppercase tracking-wider text-white opacity-90 text-center">{cfg.schoolName}</p>
      </div>
    </div>
    <div className="flex justify-center -mt-7 relative z-10 mb-1">
      <div className={`w-14 h-14 rounded-full border-4 border-white shadow-md flex items-center justify-center text-white font-bold text-sm ${s.color}`}>
        {s.initials}
      </div>
    </div>
    <div className="px-3 pb-3 flex flex-col items-center text-center">
      <h2 className="text-xs font-black text-slate-900 leading-tight">{s.name}</h2>
      <p className={`text-[8px] font-bold uppercase tracking-wide mt-0.5 ${t.accent}`}>Student · {cfg.year}</p>
      <div className="w-full mt-2 space-y-1">
        {[["ID", s.id], ["Class", `Grade ${s.grade} – ${s.section}`], ["DOB", s.dob], ["Valid Thru", s.valid]].map(([label, val]) => (
          <div key={label} className="flex justify-between text-[9px]">
            <span className="text-slate-400 uppercase font-bold">{label}</span>
            <span className="font-semibold text-slate-700">{val}</span>
          </div>
        ))}
      </div>
      <div className="mt-2"><QRDark/></div>
    </div>
    <div className={`h-1.5 w-full ${t.bar}`}/>
  </div>
)

const CardDark = ({ s, t, cfg }) => (
  <div className="w-full max-w-xs bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 flex flex-col hover:scale-[1.02] transition-transform">
    <div className="flex-1 p-3">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-800">{cfg.schoolName}</p>
          <p className="text-[9px] text-slate-400">{cfg.tagline}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0 ${s.color}`}>
          {s.initials}
        </div>
      </div>
      <div className="border-t border-slate-100 pt-2">
        <h2 className="text-sm font-black text-slate-900">{s.name}</h2>
        <p className="text-[9px] font-bold uppercase tracking-wide text-slate-500">Student</p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-2">
          {[["ID Number", s.id], ["Class", `Gr.${s.grade}–${s.section}`], ["DOB", s.dob], ["Valid Thru", s.valid]].map(([label, val]) => (
            <div key={label}>
              <span className="text-slate-400 block text-[8px] uppercase font-bold">{label}</span>
              <span className="text-[10px] font-semibold text-slate-700">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="bg-slate-800 px-3 py-2 flex items-center justify-between">
      <span className="text-[8px] text-slate-300 uppercase tracking-widest font-bold">STUDENT ID · {cfg.year}</span>
      <QRLight/>
    </div>
  </div>
)

const IDCard = ({ student, template, config }) => {
  const p = { s: student, t: template, cfg: config }
  switch (template.layout) {
    case "modern":   return <CardModern   {...p}/>
    case "side":     return <CardSide     {...p}/>
    case "vertical": return <CardVertical {...p}/>
    case "dark":     return <CardDark     {...p}/>
    default:         return <CardModern   {...p}/>
  }
}

// ─── Template Thumbnail ───────────────────────────────────────────────────────
const Thumb = ({ t, active, onClick }) => {
  const isV = t.layout === "vertical"
  return (
    <button onClick={onClick} className={`relative flex-shrink-0 flex flex-col items-center gap-1.5 cursor-pointer transition-opacity ${active ? "" : "opacity-55 hover:opacity-90"}`}>
      <div className={`overflow-hidden rounded-lg border-2 shadow-sm relative bg-white ${active ? "border-blue-600 shadow-blue-100" : "border-gray-200"} ${isV ? "w-14 h-[88px]" : "w-[112px] h-[70px]"}`}>
        {t.layout === "modern" && <>
          <div className={`absolute top-0 left-0 w-full h-[45%] bg-gradient-to-r ${t.grad}`}/>
          <div className="absolute top-2.5 left-2.5 w-7 h-7 rounded-full bg-white/40 border-2 border-white"/>
          <div className={`absolute bottom-0 left-0 w-full h-1 ${t.bar}`}/>
        </>}
        {t.layout === "side" && <>
          <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${t.grad}`}/>
          <div className="absolute top-2 left-4 w-8 h-8 rounded bg-slate-100"/>
          <div className="absolute top-2 right-2 w-5 h-5 bg-slate-100 rounded"/>
        </>}
        {t.layout === "vertical" && <>
          <div className={`absolute top-0 left-0 w-full h-[35%] bg-gradient-to-b ${t.grad}`}/>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/40 border-2 border-white"/>
          <div className={`absolute bottom-0 left-0 w-full h-1 ${t.bar}`}/>
        </>}
        {t.layout === "dark" && <>
          <div className="absolute inset-0 bg-white"/>
          <div className="absolute top-2 right-2 w-8 h-8 rounded bg-slate-100"/>
          <div className="absolute top-2 left-2 w-14 h-3 bg-slate-200 rounded"/>
          <div className="absolute bottom-0 left-0 w-full h-[32%] bg-slate-800"/>
        </>}
      </div>
      <span className={`text-xs font-semibold text-center leading-tight ${active ? "text-blue-600" : "text-gray-500"}`}>{t.label}</span>
      {active && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
      )}
    </button>
  )
}

// ─── Customize Modal ──────────────────────────────────────────────────────────
const CustomizeModal = ({ config, onChange, onClose }) => {
  const [local, setLocal] = useState({ ...config })
  const update = (k, v) => setLocal(p => ({ ...p, [k]: v }))
  const save   = () => { onChange(local); onClose() }

  const Field = ({ label, k }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">{label}</label>
      <input
        type="text"
        value={local[k]}
        onChange={e => update(k, e.target.value)}
        className="h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative bg-white dark:bg-[#1a2632] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-black text-slate-900 dark:text-white">Customize Template</h2>
            <p className="text-xs text-slate-500 mt-0.5">Update school info shown on every ID card</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="px-6 py-5 flex flex-col gap-4">
          <Field label="School Name"      k="schoolName"/>
          <Field label="Tagline / Motto"  k="tagline"/>
          <Field label="Academic Year"    k="year"/>
          <Field label="Card Valid Until" k="validUntil"/>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <SchoolIcon cls="text-white"/>
            </div>
            <div>
              <p className="text-xs font-black text-blue-900 dark:text-blue-200">{local.schoolName || "—"}</p>
              <p className="text-[10px] text-blue-500">{local.tagline || "—"}</p>
              <p className="text-[10px] text-blue-400">{local.year} · Valid: {local.validUntil}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 px-6 pb-5">
          <button onClick={onClose} className="flex-1 h-10 rounded-lg border-2 border-slate-200 dark:border-slate-600 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            Cancel
          </button>
          <button onClick={save} className="flex-1 h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors shadow-sm">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Checkbox ────────────────────────────────────────────────────────────────
const Checkbox = ({ checked, indeterminate, onChange, onClick }) => {
  const ref = node => { if (node) node.indeterminate = indeterminate }
  return (
    <input
      type="checkbox"
      ref={ref}
      checked={checked}
      onChange={onChange}
      onClick={onClick}
      className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-blue-600 flex-shrink-0"
    />
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function StudentIdCardPage() {
  const [search,      setSearch]      = useState("")
  const [grade,       setGrade]       = useState("All Classes")
  const [section,     setSection]     = useState("All Sections")
  const [selected,    setSelected]    = useState(new Set(["10A-001","10A-002","10A-004"]))
  const [templateIdx, setTemplateIdx] = useState(0)
  const [showCustom,  setShowCustom]  = useState(false)
  const [config, setConfig] = useState({
    schoolName: "Springfield High",
    tagline:    "Excellence in Education",
    year:       "2025-2026",
    validUntil: "Mar 2026",
  })

  const template = TEMPLATES[templateIdx]

  const filtered = useMemo(() => ALL_STUDENTS.filter(s => {
    if (grade   !== "All Classes"  && `Grade ${s.grade}`   !== grade)   return false
    if (section !== "All Sections" && `Section ${s.section}` !== section) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      if (!s.name.toLowerCase().includes(q) && !s.id.toLowerCase().includes(q)) return false
    }
    return true
  }), [search, grade, section])

  const allSel  = filtered.length > 0 && filtered.every(s => selected.has(s.id))
  const someSel = filtered.some(s => selected.has(s.id)) && !allSel

  const toggleAll = () => {
    const next = new Set(selected)
    if (allSel) filtered.forEach(s => next.delete(s.id))
    else        filtered.forEach(s => next.add(s.id))
    setSelected(next)
  }

  const toggleOne = id => {
    const next = new Set(selected)
    next.has(id) ? next.delete(id) : next.add(id)
    setSelected(next)
  }

  const previewStudents = ALL_STUDENTS.filter(s => selected.has(s.id))
  const badgeColor = ["bg-blue-100 text-blue-700","bg-red-100 text-red-700","bg-emerald-100 text-emerald-700","bg-slate-100 text-slate-700"][templateIdx]

  return (
    <>
      {showCustom && (
        <CustomizeModal
          config={config}
          onChange={setConfig}
          onClose={() => setShowCustom(false)}
        />
      )}

      <Topbar title="ID Card Generator" subtitle="Generate & print student ID cards" />

      <div className="p-4 md:p-6 space-y-4 bg-slate-50 dark:bg-[#101922] min-h-full">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <Link href="/dashboard" className="text-gray-500 hover:text-blue-600 transition-colors">Home</Link>
          <span className="text-gray-400">/</span>
          <Link href="/students" className="text-gray-500 hover:text-blue-600 transition-colors">Students</Link>
          <span className="text-gray-400">/</span>
          <span className="font-medium text-blue-600">ID Card Generator</span>
        </div>

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
              ID Card Generator
            </h1>
            <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">
              Select students, choose a template and generate printable ID cards.
            </p>
          </div>
          <button className="flex items-center gap-2 h-10 px-5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-sm transition-colors">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>
            </svg>
            Print All
          </button>
        </div>

        {/* 2-col layout */}
        <div className="flex gap-5 items-start">

          {/* LEFT — Student selector */}
          <div className="w-72 flex-shrink-0 bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col gap-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Select Students</h2>

              {/* Search */}
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search name or roll no…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full h-10 pl-9 pr-4 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm text-slate-700 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-2">
                {[[grade, setGrade, CLASSES], [section, setSection, SECTIONS]].map(([val, setter, opts], i) => (
                  <div key={i} className="relative flex-1">
                    <select
                      value={val}
                      onChange={e => setter(e.target.value)}
                      className="appearance-none w-full h-9 pl-3 pr-7 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-medium text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      {opts.map(o => <option key={o}>{o}</option>)}
                    </select>
                    <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* Select all row */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-slate-600 dark:text-slate-400">
                <Checkbox checked={allSel} indeterminate={someSel} onChange={toggleAll}/>
                Select All ({filtered.length})
              </label>
              <span className="text-xs font-semibold text-blue-600">{selected.size} Selected</span>
            </div>

            {/* Student list */}
            <div className="overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800" style={{ maxHeight: 360 }}>
              {filtered.length === 0 ? (
                <p className="p-6 text-center text-sm text-slate-400">No students found.</p>
              ) : filtered.map(s => {
                const sel = selected.has(s.id)
                return (
                  <div
                    key={s.id}
                    onClick={() => toggleOne(s.id)}
                    className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${sel ? "bg-blue-50 dark:bg-blue-900/10" : "hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                  >
                    <Checkbox checked={sel} indeterminate={false} onChange={() => toggleOne(s.id)} onClick={e => e.stopPropagation()}/>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${s.color}`}>
                      {s.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{s.name}</p>
                      <p className="text-xs text-slate-500 truncate">Roll: {s.id} · Class {s.grade}-{s.section}</p>
                    </div>
                    {s.hasPhoto
                      ? <svg className="text-emerald-500 flex-shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z"/></svg>
                      : <svg className="text-amber-500 flex-shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                    }
                  </div>
                )
              })}
            </div>

            {/* Import CSV */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <button className="w-full h-10 flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                Import from CSV
              </button>
            </div>
          </div>

          {/* RIGHT — Template + Preview */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">

            {/* Template selector */}
            <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Choose Template</h2>
                <button
                  onClick={() => setShowCustom(true)}
                  className="flex items-center gap-1.5 text-blue-600 text-sm font-semibold hover:underline"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Customize
                </button>
              </div>
              <div className="flex gap-6 overflow-x-auto pb-1 items-end">
                {TEMPLATES.map((t, i) => (
                  <Thumb key={t.id} t={t} active={templateIdx === i} onClick={() => setTemplateIdx(i)}/>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  Live Preview
                  <span className="text-xs font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-full px-2 py-0.5">
                    {previewStudents.length} Generated
                  </span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}>
                    {template.label}
                  </span>
                </h3>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3M12 3v18"/>
                    </svg>
                    Show Back
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Export PDF
                  </button>
                </div>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-800/30 min-h-52">
                {previewStudents.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="5" width="20" height="14" rx="2"/>
                      <line x1="2" y1="10" x2="22" y2="10"/>
                    </svg>
                    <p className="text-sm font-medium">Select students from the left to preview ID cards.</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-5 items-start">
                    {previewStudents.map(s => (
                      <IDCard key={s.id} student={s} template={template} config={config}/>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
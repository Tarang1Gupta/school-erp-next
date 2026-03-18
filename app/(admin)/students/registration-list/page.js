"use client"
import { useState, useMemo } from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import Topbar from "@/components/layout/Topbar"
import {
  MdFilterAlt, MdSearch, MdRefresh,
  MdAddCircle, MdExpandMore, MdVisibility,
  MdChevronLeft, MdChevronRight,
} from "react-icons/md"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

const ALL_STUDENTS = [
  { id: "REG-2024-1024", name: "Alex Benjamin Smith",     father: "Robert Smith",   grade: "Grade 5",      date: "Oct 12, 2023", feeStatus: "Paid",    admStatus: "Shortlisted" },
  { id: "REG-2024-1025", name: "Sarah Elizabeth Johnson", father: "David Johnson",  grade: "Grade 1",      date: "Oct 14, 2023", feeStatus: "Unpaid",  admStatus: "Registered"  },
  { id: "REG-2024-1026", name: "Liam Matthew Garcia",     father: "Carlos Garcia",  grade: "Grade 5",      date: "Oct 15, 2023", feeStatus: "Partial", admStatus: "Enrolled"    },
  { id: "REG-2024-1027", name: "Chloe Rose White",        father: "Marcus White",   grade: "Grade 3",      date: "Oct 18, 2023", feeStatus: "Paid",    admStatus: "Shortlisted" },
  { id: "REG-2024-1028", name: "Noah James Wilson",       father: "Kevin Wilson",   grade: "Kindergarten", date: "Oct 20, 2023", feeStatus: "Paid",    admStatus: "Registered"  },
  { id: "REG-2024-1029", name: "Emma Olivia Brown",       father: "James Brown",    grade: "Grade 2",      date: "Oct 22, 2023", feeStatus: "Paid",    admStatus: "Enrolled"    },
  { id: "REG-2024-1030", name: "Oliver Henry Davis",      father: "Thomas Davis",   grade: "Grade 4",      date: "Oct 23, 2023", feeStatus: "Unpaid",  admStatus: "Registered"  },
  { id: "REG-2024-1031", name: "Ava Sophia Martinez",     father: "Jose Martinez",  grade: "Grade 1",      date: "Oct 25, 2023", feeStatus: "Partial", admStatus: "Shortlisted" },
  { id: "REG-2024-1032", name: "William Jack Taylor",     father: "Andrew Taylor",  grade: "Grade 3",      date: "Oct 28, 2023", feeStatus: "Paid",    admStatus: "Enrolled"    },
  { id: "REG-2024-1033", name: "Isabella Grace Anderson", father: "Brian Anderson", grade: "Grade 5",      date: "Oct 30, 2023", feeStatus: "Unpaid",  admStatus: "Registered"  },
]

const fetchStudents = async () => {
  await new Promise((r) => setTimeout(r, 600))
  return ALL_STUDENTS
}

const FEE_BADGE = {
  Paid:    "bg-emerald-100 text-emerald-700",
  Unpaid:  "bg-red-100 text-red-700",
  Partial: "bg-amber-100 text-amber-700",
}

const ADM_BADGE = {
  Shortlisted: "bg-blue-100 text-blue-700",
  Registered:  "bg-gray-100 text-gray-600",
  Enrolled:    "bg-emerald-100 text-emerald-700",
}

const ADMISSION_BTN = {
  Shortlisted: { cls: "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer",       label: "ADMISSION", disabled: false },
  Registered:  { cls: "bg-gray-100 text-gray-400 cursor-not-allowed",                 label: "ADMISSION", disabled: true  },
  Enrolled:    { cls: "bg-emerald-600 text-white opacity-50 cursor-default",           label: "COMPLETE",  disabled: true  },
}

const CLASSES  = ["All Classes", "Kindergarten", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"]
const FEE_OPTS = ["All", "Paid", "Unpaid", "Partial"]
const ADM_OPTS = ["All Status", "Registered", "Shortlisted", "Enrolled"]
const PAGE_SIZE = 5

const Pill = ({ value, options, onChange }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none flex h-10 items-center rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white pl-4 pr-8 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-200 dark:border-slate-600"
    >
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
    <MdExpandMore className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400" size={18} />
  </div>
)

export default function RegistrationListPage() {
  const [session,   setSession]   = useState("2024-25")
  const [grade,     setGrade]     = useState("All Classes")
  const [feeStatus, setFeeStatus] = useState("All")
  const [admStatus, setAdmStatus] = useState("All Status")
  const [search,    setSearch]    = useState("")
  const [page,      setPage]      = useState(1)

  const { data: students = [], isLoading, isError } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
    staleTime: 5 * 60 * 1000,
  })

  const filtered = useMemo(() => {
    return students.filter((s) => {
      if (grade     !== "All Classes" && s.grade     !== grade)     return false
      if (feeStatus !== "All"         && s.feeStatus !== feeStatus) return false
      if (admStatus !== "All Status"  && s.admStatus !== admStatus) return false
      if (search.trim()) {
        const q = search.toLowerCase()
        if (
          !s.name.toLowerCase().includes(q) &&
          !s.id.toLowerCase().includes(q) &&
          !s.father.toLowerCase().includes(q)
        ) return false
      }
      return true
    })
  }, [students, grade, feeStatus, admStatus, search])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const resetFilters = () => {
    setGrade("All Classes")
    setFeeStatus("All")
    setAdmStatus("All Status")
    setSearch("")
    setPage(1)
  }

  const handleFilterChange = (setter) => (val) => { setter(val); setPage(1) }

  return (
    <>
      <Topbar title="Registration List" subtitle="Student Registration & Admission" />

      <div className="p-4 md:p-6 space-y-4 bg-slate-50 dark:bg-[#101922] min-h-full">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <Link href="/dashboard" className="text-gray-500 hover:text-blue-600 transition-colors">Home</Link>
          <span className="text-gray-400">/</span>
          <Link href="/students" className="text-gray-500 hover:text-blue-600 transition-colors">Students</Link>
          <span className="text-gray-400">/</span>
          <span className="font-medium text-blue-600">Registration List</span>
        </div>

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
              Registered Student List
            </h1>
            <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">
              Manage student applications and process admissions.
            </p>
          </div>
          <Link href="/students/new-registration">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold text-sm shadow-sm hover:bg-blue-700 transition-all">
              <MdAddCircle size={20} />
              New Registration
            </button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
  <div className="flex items-center gap-2 mb-3 px-1">
    <MdFilterAlt className="text-slate-400" size={20} />
    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
      Filter Records
    </h3>
  </div>
  <div className="flex flex-wrap gap-3">

    {/* Session */}
    <div className="relative">
      <select
        value={session}
        onChange={(e) => setSession(e.target.value)}
        className="appearance-none flex h-10 items-center rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white pl-4 pr-8 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-200 dark:border-slate-600"
      >
        {["2024-25", "2023-24", "2022-23"].map((s) => (
          <option key={s}>Session: {s}</option>
        ))}
      </select>
      <MdExpandMore className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
    </div>

    <Pill value={grade}     options={CLASSES}  onChange={handleFilterChange(setGrade)} />
    <Pill value={feeStatus} options={FEE_OPTS} onChange={handleFilterChange(setFeeStatus)} />
    <Pill value={admStatus} options={ADM_OPTS} onChange={handleFilterChange(setAdmStatus)} />

    {/* Search */}
    <div className="relative flex items-center">
      <MdSearch className="absolute left-3 text-slate-400" size={18} />
      <input
        type="text"
        placeholder="Search name, reg no…"
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1) }}
        className="h-10 pl-9 pr-4 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-52 border border-slate-200 dark:border-slate-600"
      />
    </div>

    <div className="flex-grow" />

    <button
      onClick={resetFilters}
      className="flex h-10 items-center gap-2 rounded-lg border-2 border-blue-600 text-blue-600 px-4 font-bold text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
    >
      <MdRefresh size={20} />
      Reset
    </button>
  </div>
</div>

        {/* Table */}
        <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-800">
                  {["Registration No", "Student Name", "Father's Name", "Class", "Reg. Date", "Fee Status", "Adm. Status", "Actions"].map((h) => (
                    <th
                      key={h}
                      className={`p-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 ${h === "Actions" ? "text-center" : ""}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {isLoading && (
                  <tr>
                    <td colSpan={8} className="p-10 text-center text-gray-400">
                      <span className="inline-flex items-center gap-2">
                        <AiOutlineLoading3Quarters className="animate-spin text-blue-500" size={20} />
                        Loading students…
                      </span>
                    </td>
                  </tr>
                )}
                {isError && (
                  <tr>
                    <td colSpan={8} className="p-10 text-center text-red-500">
                      Failed to load data. Please try again.
                    </td>
                  </tr>
                )}
                {!isLoading && !isError && paginated.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-10 text-center text-gray-400">
                      No records match the selected filters.
                    </td>
                  </tr>
                )}
                {!isLoading && paginated.map((s) => {
                  const btn = ADMISSION_BTN[s.admStatus]
                  return (
                    <tr key={s.id} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/5 transition-colors">
                      <td className="p-4 text-sm font-bold text-blue-600">{s.id}</td>
                      <td className="p-4 text-sm font-medium text-slate-900 dark:text-white">{s.name}</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{s.father}</td>
                      <td className="p-4 text-sm font-semibold text-slate-900 dark:text-white">{s.grade}</td>
                      <td className="p-4 text-sm text-gray-500">{s.date}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${FEE_BADGE[s.feeStatus]}`}>
                          {s.feeStatus}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${ADM_BADGE[s.admStatus]}`}>
                          {s.admStatus}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link href="/students/new-admission">
                            <button
                              disabled={btn.disabled}
                              className={`text-[11px] font-bold px-3 py-1.5 rounded transition-colors ${btn.cls}`}
                            >
                              {btn.label}
                            </button>
                          </Link>
                          <Link href={`/students/${s.id}`}>
                            <button className="text-gray-400 hover:text-blue-600 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-all">
                              <MdVisibility size={20} />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between bg-gray-50 dark:bg-slate-800/50 border-t border-gray-200 dark:border-slate-800">
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Showing{" "}
              <span className="font-bold text-gray-700 dark:text-slate-300">
                {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}
              </span>
              {" "}to{" "}
              <span className="font-bold text-gray-700 dark:text-slate-300">
                {Math.min(page * PAGE_SIZE, filtered.length)}
              </span>
              {" "}of{" "}
              <span className="font-bold text-gray-700 dark:text-slate-300">
                {filtered.length}
              </span>{" "}records
            </p>

            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all disabled:opacity-40"
                >
                  <MdChevronLeft size={22} />
                </button>

                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pg = totalPages <= 5 ? i + 1 : i === 4 ? totalPages : page <= 3 ? i + 1 : page - 2 + i
                  return (
                    <button
                      key={pg}
                      onClick={() => setPage(pg)}
                      className={`px-3.5 py-1.5 rounded-lg font-medium text-sm transition-colors ${
                        pg === page
                          ? "bg-blue-600 text-white font-bold"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {pg}
                    </button>
                  )
                })}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all disabled:opacity-40"
                >
                  <MdChevronRight size={22} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
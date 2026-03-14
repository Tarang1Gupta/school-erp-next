"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import {
  MdDashboard, MdGroups, MdCalendarToday, MdMenuBook,
  MdCampaign, MdQuiz, MdPayments, MdWorkspacePremium,
  MdInventory2, MdReceiptLong, MdBadge, MdLocalLibrary,
  MdSettings, MdSchool, MdExpandMore,
} from "react-icons/md"

const MENU = [
  { icon: MdDashboard, label: "Dashboard", link: "/dashboard" },
  { icon: MdGroups,    label: "Student",   link: "/students" },
  { icon: MdCalendarToday, label: "Attendance", link: "/attendance" },
  {
    icon: MdMenuBook, label: "Academic", link: "/academic",
    sub: [
      { label: "Classes",   link: "/classes" },
      { label: "Subjects",  link: "/exams" },
      { label: "Timetable", link: "/timetable" },
      { label: "Homework",  link: "/homework" },
    ],
  },
  {
    icon: MdCampaign, label: "Events & Circular", link: "/communication",
    sub: [
      { label: "Events",    link: "/calendar" },
      { label: "Circulars", link: "/communication/notices" },
      { label: "Notices",   link: "/communication/sms" },
    ],
  },
  {
    icon: MdQuiz, label: "Examination", link: "/exams",
    sub: [
      { label: "Exam Schedule", link: "/exams" },
      { label: "Result",        link: "/exams/marks" },
      { label: "Report Card",   link: "/exams/report-cards" },
      { label: "Admit Card",    link: "/exams/hall-tickets" },
    ],
  },
  {
    icon: MdPayments, label: "Fee Management", link: "/fees",
    sub: [
      { label: "Fee Structure", link: "/fees/structure" },
      { label: "Collect Fee",   link: "/fees/collect" },
      { label: "Due List",      link: "/fees/pending" },
      { label: "Receipts",      link: "/fees/receipts" },
    ],
  },
  {
    icon: MdWorkspacePremium, label: "Certificate", link: "/students/certificates",
    sub: [
      { label: "Bonafide",  link: "/students/certificates" },
      { label: "Character", link: "/students/certificates" },
    ],
  },
  {
    icon: MdInventory2, label: "Inventory", link: "/inventory",
    sub: [
      { label: "Items", link: "/inventory" },
      { label: "Issue", link: "/inventory/issue" },
    ],
  },
  {
    icon: MdReceiptLong, label: "Expenses", link: "/reports/finance",
    sub: [
      { label: "Add Expense",   link: "/reports/finance" },
      { label: "Expense List",  link: "/reports/finance" },
    ],
  },
  {
    icon: MdBadge, label: "HR & Payroll", link: "/payroll",
    sub: [
      { label: "Staff",      link: "/teachers" },
      { label: "Payroll",    link: "/payroll" },
      { label: "Attendance", link: "/attendance" },
    ],
  },
  {
    icon: MdLocalLibrary, label: "Library", link: "/library",
    sub: [
      { label: "Books",        link: "/library" },
      { label: "Issue & Return", link: "/library/issue" },
    ],
  },
  {
    icon: MdSettings, label: "Settings", link: "/settings",
    sub: [
      { label: "School Profile", link: "/settings" },
      { label: "Users & Roles",  link: "/settings/users" },
    ],
  },
]

const COLLAPSED = 72
const EXPANDED  = 256

// ── SubMenu ────────────────────────────────────────────────────────────────
const SubMenu = ({ items, isOpen }) => {
  const pathname = usePathname()
  const innerRef = useRef(null)
  const [maxH, setMaxH]     = useState(0)
  const [mounted, setMounted] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          setMaxH(innerRef.current?.scrollHeight ?? 400)
        )
      )
    } else {
      setMaxH(0)
      const t = setTimeout(() => setMounted(false), 300)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  if (!mounted) return null

  return (
    <div
      style={{
        maxHeight: maxH,
        opacity: maxH > 0 ? 1 : 0,
        overflow: "hidden",
        transition: "max-height 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.22s ease",
      }}
    >
      <div
        ref={innerRef}
        className="flex flex-col gap-0.5 pt-0.5 pb-2"
        style={{ paddingLeft: 52, paddingRight: 8 }}
      >
        {items.map((sub, i) => {
          const active = pathname === sub.link
          return (
            <Link
              key={sub.link + i}
              href={sub.link}
              style={{
                opacity: maxH > 0 ? 1 : 0,
                transform: maxH > 0 ? "translateX(0)" : "translateX(-6px)",
                transition: `opacity 0.2s ease ${i * 0.045}s, transform 0.2s ease ${i * 0.045}s`,
                whiteSpace: "nowrap",
              }}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px]
                transition-colors duration-150
                ${active
                  ? "text-blue-600 font-semibold bg-blue-600/10"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white"
                }
              `}
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${active ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"}`} />
              {sub.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// ── Main Sidebar ───────────────────────────────────────────────────────────
export default function Sidebar() {
  const pathname    = usePathname()
  const sidebarRef  = useRef(null)
  const leaveTimer  = useRef(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [openMenus,  setOpenMenus]  = useState({})

  const isParentActive = (item) =>
    pathname === item.link ||
    item.sub?.some((s) => pathname.startsWith(s.link))

  const handleMouseEnter = () => {
    clearTimeout(leaveTimer.current)
    setIsExpanded(true)
  }

  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => {
      setIsExpanded(false)
      setOpenMenus({})
    }, 120)
  }

  useEffect(() => {
    if (!isExpanded) setOpenMenus({})
  }, [isExpanded])

  useEffect(() => () => clearTimeout(leaveTimer.current), [])

  const toggleMenu = (link) =>
    setOpenMenus((p) => ({ ...p, [link]: !p[link] }))

  return (
    <>
      {/* Desktop spacer — pushes main content */}
      <div
        className="hidden md:block flex-shrink-0"
        style={{ width: COLLAPSED, minWidth: COLLAPSED }}
      />

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: isExpanded ? EXPANDED : COLLAPSED,
          transition: "width 0.28s cubic-bezier(0.4,0,0.2,1)",
          willChange: "width",
          overflowX: "clip",
          overflowY: "hidden",
        }}
        className="fixed top-0 left-0 h-screen z-40 bg-white dark:bg-[#1a2632] border-r border-slate-200 dark:border-slate-700 flex flex-col shadow-sm md:translate-x-0"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-[18px] py-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
          <div className="size-9 flex items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 flex-shrink-0">
            <MdSchool size={20} />
          </div>
          <div
            className="overflow-hidden"
            style={{
              opacity:   isExpanded ? 1 : 0,
              maxWidth:  isExpanded ? 200 : 0,
              transform: isExpanded ? "translateX(0)" : "translateX(-8px)",
              transition: "opacity 0.2s ease 0.05s, transform 0.2s ease 0.05s, max-width 0.28s ease",
              whiteSpace: "nowrap",
            }}
          >
            <p className="text-sm font-bold text-slate-800 dark:text-white">EduMaster</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-0.5">
          {MENU.map((item) => {
            const parentActive = isParentActive(item)
            const hasSub       = !!item.sub?.length
            const isOpen       = !!openMenus[item.link] && isExpanded
            const Icon         = item.icon

            const rowBase = `
              flex items-center gap-3 rounded-xl text-sm text-left
              transition-colors duration-150 px-[14px] py-2.5 w-full
              ${parentActive
                ? "bg-blue-600/10 text-blue-600 font-semibold"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50"
              }
            `

            return (
              <div key={item.link}>
                {hasSub ? (
                  <button
                    onClick={() => isExpanded && toggleMenu(item.link)}
                    title={!isExpanded ? item.label : ""}
                    className={rowBase}
                  >
                    <Icon
                      size={22}
                      className={`flex-shrink-0 ${parentActive ? "text-blue-600" : "text-slate-500 dark:text-slate-400"}`}
                      style={{ minWidth: 22 }}
                    />
                    <span
                      className="flex-1 flex items-center justify-between overflow-hidden"
                      style={{
                        opacity:   isExpanded ? 1 : 0,
                        maxWidth:  isExpanded ? 999 : 0,
                        transform: isExpanded ? "translateX(0)" : "translateX(-10px)",
                        transition: "opacity 0.22s ease 0.06s, transform 0.22s ease 0.06s, max-width 0.28s ease",
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                      }}
                    >
                      <span className="truncate">{item.label}</span>
                      <MdExpandMore
                        size={18}
                        className="text-slate-400 ml-1 flex-shrink-0"
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
                        }}
                      />
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.link}
                    title={!isExpanded ? item.label : ""}
                    className={rowBase}
                  >
                    <Icon
                      size={22}
                      className={`flex-shrink-0 ${parentActive ? "text-blue-600" : "text-slate-500 dark:text-slate-400"}`}
                      style={{ minWidth: 22 }}
                    />
                    <span
                      className="truncate"
                      style={{
                        opacity:   isExpanded ? 1 : 0,
                        maxWidth:  isExpanded ? 999 : 0,
                        transform: isExpanded ? "translateX(0)" : "translateX(-10px)",
                        transition: "opacity 0.22s ease 0.06s, transform 0.22s ease 0.06s, max-width 0.28s ease",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        display: "block",
                      }}
                    >
                      {item.label}
                    </span>
                  </Link>
                )}
                {hasSub && <SubMenu items={item.sub} isOpen={isOpen} />}
              </div>
            )
          })}
        </nav>

        {/* Footer */}
        <div
          className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 flex-shrink-0"
          style={{ opacity: isExpanded ? 1 : 0, transition: "opacity 0.2s ease" }}
        >
          <p className="text-xs text-slate-400 text-center whitespace-nowrap">
            © {new Date().getFullYear()} School ERP
          </p>
        </div>
      </aside>
    </>
  )
}
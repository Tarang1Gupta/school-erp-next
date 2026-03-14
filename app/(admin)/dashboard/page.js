"use client"
import Link from "next/link"
import {
  School, Users, UserCheck, IndianRupee,
  TrendingUp, Minus, PersonStanding,
  CalendarDays, ChevronRight, UserPlus,
  ClipboardList, Banknote, BarChart3
} from "lucide-react"
import Topbar from "@/components/layout/Topbar"

const stats = [
  {
    label: "Total Students",
    value: "1,250",
    change: "+5.2%",
    up: true,
    icon: School,
    iconBg: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    label: "Total Staff",
    value: "85",
    change: "0%",
    up: null,
    icon: Users,
    iconBg: "bg-indigo-50 dark:bg-indigo-900/20",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    label: "Today Present",
    value: "92%",
    change: "+1.2%",
    up: true,
    icon: UserCheck,
    iconBg: "bg-emerald-50 dark:bg-emerald-900/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    label: "Fee Collection (Today)",
    value: "₹4,500",
    change: "+12%",
    up: true,
    icon: IndianRupee,
    iconBg: "bg-amber-50 dark:bg-amber-900/20",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
]

const transactions = [
  { initials: "JD", color: "bg-indigo-100 text-indigo-600", name: "John Doe",      cls: "10-A", amount: "₹5,000", status: "paid",    date: "Oct 24, 2024" },
  { initials: "JS", color: "bg-pink-100 text-pink-600",     name: "Jane Smith",    cls: "9-B",  amount: "₹5,000", status: "pending", date: "Oct 24, 2024" },
  { initials: "MB", color: "bg-blue-100 text-blue-600",     name: "Michael Brown", cls: "10-A", amount: "₹5,000", status: "paid",    date: "Oct 23, 2024" },
  { initials: "ED", color: "bg-purple-100 text-purple-600", name: "Emily Davis",   cls: "8-C",  amount: "₹3,000", status: "overdue", date: "Oct 22, 2024" },
]

const statusStyle = {
  paid:    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  overdue: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
}

const events = [
  { time: "09:00 AM", title: "Morning Assembly",    loc: "Main Ground - All Staff",  color: "bg-blue-600",   textColor: "text-blue-600" },
  { time: "10:30 AM", title: "Math Exam (Grade 10)", loc: "Hall A & B",              color: "bg-indigo-500", textColor: "text-indigo-500" },
  { time: "02:00 PM", title: "Staff Meeting",        loc: "Conference Room 1",       color: "bg-amber-500",  textColor: "text-amber-500" },
  { time: "04:00 PM", title: "Sports Practice",      loc: "Field 2",                 color: "bg-slate-400",  textColor: "text-slate-500" },
]

const quickActions = [
  { label: "Add Student",     href: "/students/new",   icon: UserPlus,      bg: "bg-blue-50 dark:bg-blue-900/20",    color: "text-blue-600" },
  { label: "Take Attendance", href: "/attendance/mark", icon: ClipboardList, bg: "bg-indigo-50 dark:bg-indigo-900/20", color: "text-indigo-600" },
  { label: "Collect Fee",     href: "/fees/collect",   icon: Banknote,      bg: "bg-emerald-50 dark:bg-emerald-900/20", color: "text-emerald-600" },
  { label: "View Reports",    href: "/reports/finance", icon: BarChart3,     bg: "bg-amber-50 dark:bg-amber-900/20",  color: "text-amber-600" },
]

export default function DashboardPage() {
  return (
    <>
    {/* Header */}
      <Topbar title="Admin Dashboard" subtitle="Welcome back, Administrator" />
    <div className="p-4 md:p-8 space-y-8 bg-slate-50 dark:bg-[#101922] min-h-full">

      

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="flex flex-col justify-between rounded-xl bg-white dark:bg-[#1a2632] p-5 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className={`size-10 rounded-lg ${s.iconBg} ${s.iconColor} flex items-center justify-center`}>
                  <Icon size={20} />
                </div>
                {s.up === true && (
                  <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full gap-1">
                    <TrendingUp size={12} /> {s.change}
                  </span>
                )}
                {s.up === null && (
                  <span className="flex items-center text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full gap-1">
                    <Minus size={12} /> {s.change}
                  </span>
                )}
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{s.label}</p>
                <h3 className="text-slate-900 dark:text-white text-2xl font-bold">{s.value}</h3>
              </div>
            </div>
          )
        })}
      </section>

      {/* Charts Row */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fee Collection Chart */}
        <div className="lg:col-span-2 rounded-xl bg-white dark:bg-[#1a2632] p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-slate-900 dark:text-white text-lg font-bold">Monthly Fee Collection</h3>
              <p className="text-slate-500 text-sm">Revenue trends over the last 30 days</p>
            </div>
            <div className="text-right">
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white">₹45,200</h4>
              <span className="text-emerald-500 text-sm font-medium">+12% vs last month</span>
            </div>
          </div>
          <div className="flex-1 min-h-[220px] w-full relative">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 200">
              <line stroke="#e2e8f0" strokeWidth="1" x1="0" x2="800" y1="199" y2="199" />
              <line stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="800" y1="150" y2="150" />
              <line stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="800" y1="100" y2="100" />
              <line stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="800" y1="50"  y2="50" />
              <defs>
                <linearGradient id="cg" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%"   stopColor="#137fec" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#137fec" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,150 C50,150 50,80 100,80 C150,80 150,120 200,120 C250,120 250,40 300,40 C350,40 350,90 400,90 C450,90 450,60 500,60 C550,60 550,140 600,140 C650,140 650,30 700,30 C750,30 750,70 800,70"
                fill="none" stroke="#137fec" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
              />
              <path
                d="M0,150 C50,150 50,80 100,80 C150,80 150,120 200,120 C250,120 250,40 300,40 C350,40 350,90 400,90 C450,90 450,60 500,60 C550,60 550,140 600,140 C650,140 650,30 700,30 C750,30 750,70 800,70 V200 H0 Z"
                fill="url(#cg)"
              />
              <circle cx="300" cy="40" fill="#fff" r="4" stroke="#137fec" strokeWidth="2" />
              <circle cx="700" cy="30" fill="#fff" r="4" stroke="#137fec" strokeWidth="2" />
            </svg>
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-400 font-medium uppercase tracking-wider">
            <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="rounded-xl bg-white dark:bg-[#1a2632] p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col">
          <div className="mb-6">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Attendance Summary</h3>
            <p className="text-slate-500 text-sm">Today's breakdown</p>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-6">
            <div className="space-y-4">
              {[
                { label: "Present",  pct: 92, color: "bg-emerald-500" },
                { label: "Absent",   pct: 5,  color: "bg-rose-500" },
                { label: "On Leave", pct: 3,  color: "bg-amber-400" },
              ].map((a) => (
                <div key={a.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700 dark:text-slate-200 font-medium">{a.label}</span>
                    <span className="text-slate-900 dark:text-white font-bold">{a.pct}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full ${a.color} rounded-full`} style={{ width: `${a.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 flex items-center justify-between mt-auto">
              <div>
                <span className="text-xs text-slate-500 font-medium uppercase">Total Checked In</span>
                <p className="text-xl font-bold text-slate-900 dark:text-white">1,150</p>
              </div>
              <Link href="/attendance/reports" className="text-blue-600 text-sm font-semibold hover:underline">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Table + Events */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Transactions */}
        <div className="xl:col-span-2 rounded-xl bg-white dark:bg-[#1a2632] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Recent Fee Transactions</h3>
            <Link href="/fees/receipts" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  {["Student Name", "Class", "Amount", "Status", "Date"].map((h) => (
                    <th key={h} className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {transactions.map((t) => (
                  <tr key={t.name} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`size-8 rounded-full ${t.color} flex items-center justify-center text-xs font-bold`}>{t.initials}</div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{t.name}</p>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600 dark:text-slate-400">{t.cls}</td>
                    <td className="p-4 text-sm font-semibold text-slate-900 dark:text-white">{t.amount}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusStyle[t.status]}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-500">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Events */}
        <div className="rounded-xl bg-white dark:bg-[#1a2632] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Today's Events</h3>
          </div>
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-700 space-y-8">
              {events.map((e) => (
                <div key={e.time} className="relative">
                  <div className={`absolute -left-[29px] top-1 size-4 rounded-full border-2 border-white dark:border-[#1a2632] ${e.color} ring-2 ring-offset-0`} />
                  <p className={`text-xs font-bold ${e.textColor} mb-1`}>{e.time}</p>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{e.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{e.loc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 rounded-b-xl">
            <Link href="/calendar" className="w-full py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
              <CalendarDays size={16} /> View Calendar
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((a) => {
            const Icon = a.icon
            return (
              <Link
                key={a.label}
                href={a.href}
                className="flex flex-col items-center justify-center p-6 bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:shadow-md transition-all group"
              >
                <div className={`size-12 rounded-full ${a.bg} ${a.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon size={22} />
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 text-center">{a.label}</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-slate-400 text-xs py-4">
        © 2024 School ERP Management System. All rights reserved.
      </footer>
    </div>
    </>
  )
}

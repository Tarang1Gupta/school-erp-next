"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  MdChevronRight,
  MdAdd,
  MdDownload,
  MdSearch,
  MdFilterList,
  MdMoreVert,
  MdWarningAmber,
  MdCheckCircle,
  MdCancel,
  MdPending,
  MdAccountBalanceWallet,
  MdCalendarToday,
  MdClearAll,
} from "react-icons/md"
import Topbar from "@/components/layout/Topbar"

// ── Mock Data ────────────────────────────────────────────────────────────────
const EXPENSES = [
  {
    id: 1,
    date: "Oct 24, 2023",
    category: "Supplies",
    description: "Microscopes for Lab 3",
    vendor: "Science Dept • Thermo Fisher",
    payment: "Credit Card **** 4242",
    amount: 1200.0,
    status: "Approved",
  },
  {
    id: 2,
    date: "Oct 22, 2023",
    category: "Maintenance",
    description: "HVAC Repair - Gym",
    vendor: "Facilities • City Cooling Services",
    payment: "Invoice #INV-2023-001",
    amount: 450.0,
    status: "Pending",
  },
  {
    id: 3,
    date: "Oct 21, 2023",
    category: "Salaries",
    description: "Guest Lecturer Stipend",
    vendor: "Academics • Dr. Alan Grant",
    payment: "Bank Transfer",
    amount: 300.0,
    status: "Approved",
  },
  {
    id: 4,
    date: "Oct 20, 2023",
    category: "Events",
    description: "Catering for Open Day",
    vendor: "Admin • Fresh Foods Inc",
    payment: "Corporate Card",
    amount: 2150.0,
    status: "Rejected",
  },
  {
    id: 5,
    date: "Oct 19, 2023",
    category: "Utilities",
    description: "Monthly Internet Service",
    vendor: "Ops • Comcast Business",
    payment: "Auto-Pay",
    amount: 180.0,
    status: "Approved",
  },
]

// ── Helpers ──────────────────────────────────────────────────────────────────
const CATEGORY_STYLES = {
  Supplies:    "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
  Maintenance: "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
  Salaries:    "bg-blue-50   dark:bg-blue-900/30   text-blue-700   dark:text-blue-300",
  Events:      "bg-red-50    dark:bg-red-900/30    text-red-700    dark:text-red-300",
  Utilities:   "bg-gray-100  dark:bg-gray-700      text-gray-700   dark:text-gray-300",
}

const CATEGORY_DOT = {
  Supplies:    "bg-purple-500",
  Maintenance: "bg-orange-500",
  Salaries:    "bg-blue-500",
  Events:      "bg-red-500",
  Utilities:   "bg-gray-500",
}

const STATUS_STYLES = {
  Approved: "bg-green-100  dark:bg-green-900/30  text-green-700  dark:text-green-300",
  Pending:  "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
  Rejected: "bg-red-100    dark:bg-red-900/30    text-red-700    dark:text-red-300",
}

const StatusIcon = ({ status }) => {
  if (status === "Approved") return <MdCheckCircle className="text-green-500"  size={15} />
  if (status === "Pending")  return <MdPending     className="text-yellow-500" size={15} />
  if (status === "Rejected") return <MdCancel      className="text-red-500"    size={15} />
  return null
}

const formatCurrency = (n) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" })

// ── Stats Card ───────────────────────────────────────────────────────────────
function StatCard({ label, value, badge, badgeClass, sub, progress, icon }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl p-5 bg-white dark:bg-[#101922] border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex justify-between items-start">
        <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
          {label}
        </p>
        {badge && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeClass}`}>
            {badge}
          </span>
        )}
        {icon && icon}
      </div>
      <p className="text-[#0d141b] dark:text-white text-2xl font-bold mt-2">{value}</p>
      {sub && <p className="text-slate-400 text-xs mt-1">{sub}</p>}
      {progress !== undefined && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
          <div className="bg-primary h-1.5 rounded-full" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  )
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function ExpenseListPage() {
  const router = useRouter()
  const [search, setSearch]           = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedStatus, setSelectedStatus]     = useState("")
  const [minAmount, setMinAmount]     = useState("")
  const [maxAmount, setMaxAmount]     = useState("")
  const [checkedIds, setCheckedIds]   = useState([])
  const [allChecked, setAllChecked]   = useState(false)

  // Filtering
  const filtered = EXPENSES.filter((e) => {
    const matchSearch =
      !search ||
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.vendor.toLowerCase().includes(search.toLowerCase())
    const matchCategory = !selectedCategory || e.category === selectedCategory
    const matchStatus   = !selectedStatus   || e.status   === selectedStatus
    const matchMin      = !minAmount        || e.amount >= parseFloat(minAmount)
    const matchMax      = !maxAmount        || e.amount <= parseFloat(maxAmount)
    return matchSearch && matchCategory && matchStatus && matchMin && matchMax
  })

  const toggleAll = () => {
    if (allChecked) {
      setCheckedIds([])
      setAllChecked(false)
    } else {
      setCheckedIds(filtered.map((e) => e.id))
      setAllChecked(true)
    }
  }

  const toggleOne = (id) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const clearFilters = () => {
    setSearch("")
    setSelectedCategory("")
    setSelectedStatus("")
    setMinAmount("")
    setMaxAmount("")
  }

  return (
    <>
      <Topbar
        title="Expense Reports"
        subtitle="Manage and review all school expenditures."
      />

      <div className="p-4 md:p-6 space-y-6 bg-slate-50 dark:bg-[#101922] min-h-full">

        {/* ── Breadcrumb ── */}
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/" className="text-slate-500 text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <MdChevronRight className="text-slate-400" size={16} />
          <Link href="/expenses" className="text-slate-500 text-sm font-medium hover:text-primary transition-colors">
            Finance
          </Link>
          <MdChevronRight className="text-slate-400" size={16} />
          <span className="text-primary text-sm font-semibold">Expense Reports</span>
        </div>

        {/* ── Page Header ── */}
        <div className="flex flex-wrap justify-between items-end gap-4">
          <div>
            <h1 className="text-[#0d141b] dark:text-white text-3xl font-black leading-tight tracking-tight">
              Expense Reports
            </h1>
            <p className="text-slate-500 mt-1 text-sm">Manage and review all school expenditures.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/expenses/add")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0d141b] dark:text-white text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
              <MdAdd size={18} />
              <span>Add Expense</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-blue-600 transition-colors shadow-sm shadow-blue-200 dark:shadow-none">
              <MdDownload size={18} />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* ── Stats Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Expenses YTD"
            value="$124,500.00"
            badge="+5.2%"
            badgeClass="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
            sub="vs. last year"
          />
          <StatCard
            label="This Month"
            value="$12,450.00"
            badge="+1.2%"
            badgeClass="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
            sub="vs. last month"
          />
          <StatCard
            label="Pending Approval"
            value="5 Items"
            icon={<MdWarningAmber className="text-orange-500" size={20} />}
            sub="Requires action"
          />
          <StatCard
            label="Budget Remaining"
            value="$85,500.00"
            badge="Healthy"
            badgeClass="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
            progress={70}
          />
        </div>

        {/* ── Filters Card ── */}
        <div className="bg-white dark:bg-[#101922] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">

          <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
              <MdFilterList size={18} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-[#0d141b] dark:text-white text-base font-bold">Filters</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs">Narrow down expenses by criteria</p>
            </div>
          </div>

          <div className="p-5 flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <MdSearch className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search description or vendor..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-[#0d141b] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-1">
              {/* Date (visual only) */}
              <div className="relative">
                <MdCalendarToday className="absolute left-3 top-2.5 text-slate-400 pointer-events-none" size={16} />
                <input
                  type="text"
                  placeholder="Date Range"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e)  => (e.target.type = "text")}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-[#0d141b] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary transition"
                />
              </div>

              {/* Category */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-[#0d141b] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition appearance-none cursor-pointer"
              >
                <option value="">All Categories</option>
                <option value="Supplies">Supplies</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Utilities">Utilities</option>
                <option value="Salaries">Salaries</option>
                <option value="Events">Events</option>
              </select>

              {/* Status */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-[#0d141b] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition appearance-none cursor-pointer"
              >
                <option value="">All Statuses</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>

              {/* Amount Range */}
              <div className="flex gap-2">
                <input
                  type="number"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  placeholder="Min $"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-[#0d141b] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary transition"
                />
                <input
                  type="number"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                  placeholder="Max $"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-[#0d141b] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary transition"
                />
              </div>
            </div>

            {/* Clear */}
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-slate-500 hover:text-[#0d141b] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium transition-colors border border-slate-200 dark:border-slate-700 self-start lg:self-auto"
            >
              <MdClearAll size={16} />
              Clear
            </button>
          </div>
        </div>

        {/* ── Data Table Card ── */}
        <div className="bg-white dark:bg-[#101922] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col">

          <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
              <MdAccountBalanceWallet size={18} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-[#0d141b] dark:text-white text-base font-bold">All Transactions</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""} found
              </p>
            </div>
            {checkedIds.length > 0 && (
              <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                {checkedIds.length} selected
              </span>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="p-4 w-12 text-center">
                    <input
                      type="checkbox"
                      checked={allChecked}
                      onChange={toggleAll}
                      className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                    />
                  </th>
                  {["Date", "Category", "Description / Vendor", "Payment", "Amount", "Status", ""].map(
                    (col, i) => (
                      <th
                        key={i}
                        className={`p-4 text-xs font-semibold tracking-wide text-slate-400 dark:text-slate-500 uppercase ${
                          col === "Amount" ? "text-right" : col === "Status" ? "text-center" : ""
                        }`}
                      >
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-10 text-center text-slate-400 text-sm">
                      No expenses match the current filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((expense) => (
                    <tr
                      key={expense.id}
                      className="group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Checkbox */}
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={checkedIds.includes(expense.id)}
                          onChange={() => toggleOne(expense.id)}
                          className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                        />
                      </td>

                      {/* Date */}
                      <td className="p-4 font-medium text-[#0d141b] dark:text-slate-200 whitespace-nowrap">
                        {expense.date}
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
                            CATEGORY_STYLES[expense.category] ?? "bg-gray-100 text-gray-700"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              CATEGORY_DOT[expense.category] ?? "bg-gray-500"
                            }`}
                          />
                          {expense.category}
                        </span>
                      </td>

                      {/* Description */}
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-[#0d141b] dark:text-slate-200">
                            {expense.description}
                          </span>
                          <span className="text-xs text-slate-400">{expense.vendor}</span>
                        </div>
                      </td>

                      {/* Payment */}
                      <td className="p-4 text-slate-400 text-xs whitespace-nowrap">
                        {expense.payment}
                      </td>

                      {/* Amount */}
                      <td className="p-4 text-right font-bold text-[#0d141b] dark:text-slate-200 whitespace-nowrap">
                        {formatCurrency(expense.amount)}
                      </td>

                      {/* Status */}
                      <td className="p-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            STATUS_STYLES[expense.status]
                          }`}
                        >
                          <StatusIcon status={expense.status} />
                          {expense.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <button className="text-slate-400 hover:text-[#0d141b] dark:hover:text-white p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                          <MdMoreVert size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-slate-200 dark:border-slate-800 gap-4">
            <p className="text-sm text-slate-400">
              Showing{" "}
              <span className="font-bold text-[#0d141b] dark:text-white">1</span> to{" "}
              <span className="font-bold text-[#0d141b] dark:text-white">
                {filtered.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-[#0d141b] dark:text-white">128</span> entries
            </p>
            <div className="flex gap-2">
              <button
                disabled
                className="px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-slate-400 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
              >
                Previous
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className={`px-3 py-1.5 rounded-md text-sm font-bold transition-colors ${
                    p === 1
                      ? "bg-primary text-white shadow-sm shadow-blue-200 dark:shadow-none"
                      : "border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  {p}
                </button>
              ))}
              <span className="px-2 py-1.5 text-slate-400">...</span>
              <button className="px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-slate-400 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                12
              </button>
              <button className="px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-slate-400 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
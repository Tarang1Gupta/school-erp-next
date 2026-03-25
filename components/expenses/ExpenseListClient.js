// components/expenses/ExpenseListClient.jsx
// Direct 1:1 conversion of the HTML file's JS logic into React hooks + JSX
"use client"

import { useState, useMemo, useCallback } from "react"
import Link from "next/link"
import Sidebar from "@/components/layout/Sidebar"
import Topbar from "@/components/layout/Topbar"
import StatsCards from "@/components/expenses/StatsCards"
import FiltersToolbar from "@/components/expenses/FiltersToolbar"
import ExpenseTable from "@/components/expenses/ExpenseTable"
import AddExpenseModal from "@/components/expenses/AddExpenseModal"
import { INITIAL_EXPENSES } from "@/lib/expenseData"

export default function ExpenseListClient() {
  // ── State (mirrors the HTML JS variables) ───────────────────────────────
  const [allExpenses, setAllExpenses] = useState(INITIAL_EXPENSES)
  const [search,      setSearch]      = useState("")        // from search-input
  const [filters,     setFilters]     = useState(null)      // from applyFilters()
  const [sortField,   setSortField]   = useState(null)      // from sortTable()
  const [sortDir,     setSortDir]     = useState(1)         // 1 = asc, -1 = desc
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize,    setPageSize]    = useState(8)
  const [selectedIds, setSelectedIds] = useState(new Set()) // from row-check checkboxes
  const [modalOpen,   setModalOpen]   = useState(false)

  // ── Derived filtered + sorted list (mirrors applyFilters + sortTable) ───
  const filtered = useMemo(() => {
    let list = allExpenses

    // Search (live, mirrors the search-input event listener)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((e) =>
        e.desc.toLowerCase().includes(q) || e.vendor.toLowerCase().includes(q)
      )
    }

    // Toolbar filters (mirrors applyFilters())
    if (filters) {
      if (filters.category)            list = list.filter((e) => e.category === filters.category)
      if (filters.status)              list = list.filter((e) => e.status   === filters.status)
      if (filters.min > 0)             list = list.filter((e) => e.amount  >= filters.min)
      if (filters.max !== Infinity)    list = list.filter((e) => e.amount  <= filters.max)
    }

    // Sort (mirrors sortTable())
    if (sortField) {
      list = [...list].sort((a, b) => {
        if (sortField === "amount") return (a.amount - b.amount) * sortDir
        if (sortField === "date")   return a.date.localeCompare(b.date) * sortDir
        return 0
      })
    }

    return list
  }, [allExpenses, search, filters, sortField, sortDir])

  // ── Paginated slice (mirrors renderTable()) ──────────────────────────────
  const pageRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, currentPage, pageSize])

  // ── Sort handler (mirrors sortTable()) ──────────────────────────────────
  const handleSort = useCallback((field) => {
    setSortDir((d) => (sortField === field ? d * -1 : 1))
    setSortField(field)
    setCurrentPage(1)
  }, [sortField])

  // ── Filter handlers (mirror applyFilters / clearFilters()) ──────────────
  const handleApplyFilters = useCallback((f) => {
    setFilters(f)
    setCurrentPage(1)
  }, [])

  const handleClearFilters = useCallback(() => {
    setFilters(null)
    setSearch("")
    setCurrentPage(1)
  }, [])

  // ── Search (mirrors the search-input event listener) ────────────────────
  const handleSearch = useCallback((q) => {
    setSearch(q)
    setCurrentPage(1)
  }, [])

  // ── Checkbox selection (mirrors toggleSelectAll / updateBulkBar()) ───────
  const handleSelectAll = useCallback((checked) => {
    setSelectedIds(checked ? new Set(pageRows.map((e) => e.id)) : new Set())
  }, [pageRows])

  const handleSelectRow = useCallback((id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  // ── Row actions (mirrors ctxAction()) ────────────────────────────────────
  const handleAction = useCallback((action, id) => {
    if (action === "delete") {
      if (!confirm("Delete this expense?")) return
      setAllExpenses((prev) => prev.filter((e) => e.id !== id))
      setSelectedIds((prev) => { const n = new Set(prev); n.delete(id); return n })
    } else if (action === "approve" || action === "reject") {
      const newStatus = action === "approve" ? "Approved" : "Rejected"
      setAllExpenses((prev) => prev.map((e) => e.id === id ? { ...e, status: newStatus } : e))
    } else if (action === "view") {
      const exp = allExpenses.find((e) => e.id === id)
      if (exp) alert(`${exp.desc}\n\nAmount: $${exp.amount.toLocaleString()}\nStatus: ${exp.status}\nVendor: ${exp.vendor}`)
    }
  }, [allExpenses])

  // ── Bulk delete (mirrors bulkDelete()) ───────────────────────────────────
  const handleBulkDelete = useCallback(() => {
    if (!confirm(`Delete ${selectedIds.size} expense(s)?`)) return
    setAllExpenses((prev) => prev.filter((e) => !selectedIds.has(e.id)))
    setSelectedIds(new Set())
  }, [selectedIds])

  // ── Export CSV (mirrors exportCSV()) ─────────────────────────────────────
  const handleExport = useCallback(() => {
    const headers = ["Date", "Category", "Description", "Vendor", "Payment", "Amount", "Status"]
    const rows    = filtered.map((e) => [e.date, e.category, `"${e.desc}"`, `"${e.vendor}"`, `"${e.payment}"`, e.amount, e.status])
    const csv     = [headers, ...rows].map((r) => r.join(",")).join("\n")
    const url     = URL.createObjectURL(new Blob([csv], { type: "text/csv" }))
    Object.assign(document.createElement("a"), { href: url, download: "expenses.csv" }).click()
    URL.revokeObjectURL(url)
  }, [filtered])

  // ── Save new expense (mirrors saveExpense()) ──────────────────────────────
  const handleSaveExpense = useCallback(async (data) => {
    const id = allExpenses.length ? Math.max(...allExpenses.map((e) => e.id)) + 1 : 1
    setAllExpenses((prev) => [{ id, ...data }, ...prev])
    setCurrentPage(1)
  }, [allExpenses])

  // ── Page change ──────────────────────────────────────────────────────────
  const handlePageChange = useCallback((p) => {
    setCurrentPage(p)
    setSelectedIds(new Set())
  }, [])

  const handlePageSizeChange = useCallback((size) => {
    setPageSize(size)
    setCurrentPage(1)
    setSelectedIds(new Set())
  }, [])

  // ── Render (mirrors the HTML body structure 1:1) ─────────────────────────
  return (
    <div className="flex h-screen w-full flex-row overflow-hidden">
      <Sidebar />

      <main className="flex flex-1 flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">

        {/* Topbar — mirrors the <header> */}
        <Topbar
          title="Expense Reports"
          subtitle="Manage and review all school expenditures."
          searchValue={search}
          onSearch={handleSearch}
          onAddExpense={() => setModalOpen(true)}
        />

        {/* Scrollable content — mirrors the overflow-y-auto div */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="mx-auto max-w-6xl flex flex-col gap-6">

            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Link href="/" className="text-[#4c739a] hover:text-primary font-medium">Dashboard</Link>
              <span className="material-symbols-outlined text-[#4c739a] text-sm">chevron_right</span>
              <Link href="/expenses" className="text-[#4c739a] hover:text-primary font-medium">Finances</Link>
              <span className="material-symbols-outlined text-[#4c739a] text-sm">chevron_right</span>
              <span className="text-[#0d141b] dark:text-white font-semibold">Expense Reports</span>
            </div>

            {/* Page heading + action buttons */}
            <div className="flex flex-wrap justify-between items-end gap-4">
              <div>
                <h1 className="text-[#0d141b] dark:text-white text-3xl font-black leading-tight tracking-tight">Expense Reports</h1>
                <p className="text-[#4c739a] mt-1">Manage and review all school expenditures.</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-[#cfdbe7] dark:border-gray-700 text-[#0d141b] dark:text-white text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-lg">add</span>
                  <span>Add Expense</span>
                </button>
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-blue-600 transition-colors shadow-sm shadow-blue-200 dark:shadow-none"
                >
                  <span className="material-symbols-outlined text-lg">download</span>
                  <span>Export Report</span>
                </button>
              </div>
            </div>

            {/* Stats cards */}
            <StatsCards expenses={allExpenses} />

            {/* Filters toolbar */}
            <FiltersToolbar onApply={handleApplyFilters} onClear={handleClearFilters} />

            {/* Data table */}
            <ExpenseTable
              rows={pageRows}
              selectedIds={selectedIds}
              onSelectAll={handleSelectAll}
              onSelectRow={handleSelectRow}
              onAction={handleAction}
              onBulkDelete={handleBulkDelete}
              onExport={handleExport}
              sortField={sortField}
              sortDir={sortDir}
              onSort={handleSort}
              currentPage={currentPage}
              pageSize={pageSize}
              totalCount={filtered.length}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />

          </div>
        </div>
      </main>

      {/* Add Expense modal (mirrors the #add-modal div) */}
      <AddExpenseModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveExpense}
      />
    </div>
  )
}

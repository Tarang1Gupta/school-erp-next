// components/expenses/ExpenseTable.jsx
"use client"

import { CATEGORY_CONFIG, STATUS_CONFIG } from "@/lib/expenseData"
import RowMenu from "./RowMenu"

const fmtDate = (d) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })

const fmtAmt = (n) => n.toLocaleString("en-US", { minimumFractionDigits: 2 })

// ── Pagination ─────────────────────────────────────────────────────────────
function Pagination({ currentPage, totalPages, onPageChange, totalCount, pageSize, start, end, onPageSizeChange }) {
  if (totalPages === 0) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-[#e7edf3] dark:border-gray-800 gap-4">
      <div className="flex items-center gap-3">
        <p className="text-sm text-[#4c739a]">
          Showing{" "}
          <span className="font-bold text-[#0d141b] dark:text-white">{totalCount ? start : 0}</span>–
          <span className="font-bold text-[#0d141b] dark:text-white">{end}</span> of{" "}
          <span className="font-bold text-[#0d141b] dark:text-white">{totalCount}</span>
        </p>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="text-xs bg-[#f6f7f8] dark:bg-gray-800 border-none rounded-md px-2 py-1 text-[#4c739a] cursor-pointer outline-none"
        >
          {[8, 16, 32].map((n) => <option key={n} value={n}>{n} / page</option>)}
        </select>
      </div>

      <div className="flex gap-2 flex-wrap justify-center">
        <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1.5 rounded-md border border-[#e7edf3] dark:border-gray-700 text-[#4c739a] text-sm hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50">
          Previous
        </button>

        {pages.map((p) => {
          const show = p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
          const ellipsis = Math.abs(p - currentPage) === 2
          if (show) return (
            <button key={p} onClick={() => onPageChange(p)}
              className={`px-3 py-1.5 rounded-md text-sm ${p === currentPage
                ? "bg-primary text-white font-bold shadow-sm"
                : "border border-[#e7edf3] dark:border-gray-700 text-[#4c739a] hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
              {p}
            </button>
          )
          if (ellipsis) return <span key={p} className="px-2 py-1.5 text-[#4c739a]">…</span>
          return null
        })}

        <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1.5 rounded-md border border-[#e7edf3] dark:border-gray-700 text-[#4c739a] text-sm hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  )
}

// ── Main Table ─────────────────────────────────────────────────────────────
export default function ExpenseTable({
  rows, selectedIds, onSelectAll, onSelectRow,
  onAction, onBulkDelete, onExport,
  sortField, sortDir, onSort,
  currentPage, pageSize, totalCount,
  onPageChange, onPageSizeChange,
}) {
  const allChecked = rows.length > 0 && rows.every((e) => selectedIds.has(e.id))
  const totalPages = Math.ceil(totalCount / pageSize)
  const start = (currentPage - 1) * pageSize + 1
  const end   = Math.min(currentPage * pageSize, totalCount)

  return (
    <div className="bg-white dark:bg-[#101922] border border-[#e7edf3] dark:border-gray-800 rounded-xl shadow-sm overflow-hidden flex flex-col">

      {/* Bulk action bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#e7edf3] dark:border-gray-800 bg-[#fcfdfd] dark:bg-[#1a2633]">
        <div className="flex items-center gap-2">
          {selectedIds.size > 0 && (
            <>
              <span className="text-xs text-[#4c739a]">{selectedIds.size} selected</span>
              <button onClick={onBulkDelete}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-semibold hover:bg-red-100 transition-colors">
                <span className="material-symbols-outlined text-sm">delete</span> Delete selected
              </button>
            </>
          )}
        </div>
        <button onClick={onExport}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#cfdbe7] dark:border-gray-700 text-[#4c739a] text-xs font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined text-sm">download</span> Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fcfdfd] dark:bg-[#1a2633] border-b border-[#e7edf3] dark:border-gray-800">
              <th className="p-4 w-12 text-center">
                <input type="checkbox" checked={allChecked}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
              </th>

              {/* Date — sortable */}
              <th onClick={() => onSort("date")}
                className="p-4 text-xs font-semibold tracking-wide text-[#4c739a] uppercase cursor-pointer group">
                <div className="flex items-center gap-1">
                  Date
                  <span className={`material-symbols-outlined text-sm transition-opacity ${sortField === "date" ? "opacity-100 text-primary" : "opacity-0 group-hover:opacity-60"}`}>
                    {sortField === "date" && sortDir === -1 ? "arrow_upward" : "arrow_downward"}
                  </span>
                </div>
              </th>

              <th className="p-4 text-xs font-semibold tracking-wide text-[#4c739a] uppercase">Category</th>
              <th className="p-4 text-xs font-semibold tracking-wide text-[#4c739a] uppercase w-1/3">Description / Vendor</th>
              <th className="p-4 text-xs font-semibold tracking-wide text-[#4c739a] uppercase">Payment</th>

              {/* Amount — sortable */}
              <th onClick={() => onSort("amount")}
                className="p-4 text-xs font-semibold tracking-wide text-[#4c739a] uppercase text-right cursor-pointer group">
                <div className="flex items-center justify-end gap-1">
                  Amount
                  <span className={`material-symbols-outlined text-sm transition-opacity ${sortField === "amount" ? "opacity-100 text-primary" : "opacity-0 group-hover:opacity-60"}`}>
                    {sortField === "amount" && sortDir === -1 ? "arrow_upward" : "arrow_downward"}
                  </span>
                </div>
              </th>

              <th className="p-4 text-xs font-semibold tracking-wide text-[#4c739a] uppercase text-center">Status</th>
              <th className="p-4 w-12" />
            </tr>
          </thead>

          <tbody className="divide-y divide-[#e7edf3] dark:divide-gray-800 text-sm">
            {rows.map((e) => {
              const cat = CATEGORY_CONFIG[e.category] || CATEGORY_CONFIG.Utilities
              const sts = STATUS_CONFIG[e.status]     || STATUS_CONFIG.Approved
              return (
                <tr key={e.id} className="hover:bg-[#f6f7f8] dark:hover:bg-gray-800/50 transition-colors">
                  <td className="p-4 text-center">
                    <input type="checkbox" checked={selectedIds.has(e.id)}
                      onChange={() => onSelectRow(e.id)}
                      className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
                  </td>
                  <td className="p-4 font-medium text-[#0d141b] dark:text-gray-200 whitespace-nowrap">{fmtDate(e.date)}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${cat.bg} ${cat.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
                      {e.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-[#0d141b] dark:text-gray-200">{e.desc}</span>
                      <span className="text-xs text-[#4c739a]">{e.vendor}</span>
                    </div>
                  </td>
                  <td className="p-4 text-[#4c739a] text-sm">{e.payment}</td>
                  <td className="p-4 text-right font-bold text-[#0d141b] dark:text-gray-200">${fmtAmt(e.amount)}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${sts}`}>
                      {e.status === "Pending" && <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 pulse-dot" />}
                      {e.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <RowMenu expenseId={e.id} onAction={onAction} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {rows.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#e7edf3] dark:bg-gray-800 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#4c739a] text-2xl">search_off</span>
          </div>
          <p className="text-[#0d141b] dark:text-white font-semibold">No expenses found</p>
          <p className="text-[#4c739a] text-sm">Try adjusting your filters or add a new expense.</p>
        </div>
      )}

      <Pagination
        currentPage={currentPage} totalPages={totalPages}
        onPageChange={onPageChange} totalCount={totalCount}
        pageSize={pageSize} start={start} end={end}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  )
}

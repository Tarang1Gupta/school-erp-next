// components/expenses/StatsCards.jsx

const fmt = (n) => n.toLocaleString("en-US", { minimumFractionDigits: 2 })

export default function StatsCards({ expenses }) {
  const totalYTD     = expenses.reduce((s, e) => s + e.amount, 0)
  const thisMonth    = expenses.filter((e) => e.date.startsWith("2023-10")).reduce((s, e) => s + e.amount, 0)
  const pendingCount = expenses.filter((e) => e.status === "Pending").length
  const budget       = 210000
  const remaining    = budget - totalYTD
  const usedPct      = Math.min(100, Math.round((totalYTD / budget) * 100))

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

      {/* Total YTD */}
      <div className="flex flex-col gap-1 rounded-xl p-5 bg-white dark:bg-[#101922] border border-[#e7edf3] dark:border-gray-800 shadow-sm">
        <div className="flex justify-between items-start">
          <p className="text-[#4c739a] text-xs font-semibold uppercase tracking-wider">Total Expenses YTD</p>
          <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs px-2 py-0.5 rounded-full font-medium">+5.2%</span>
        </div>
        <p className="text-[#0d141b] dark:text-white text-2xl font-bold mt-2">${fmt(totalYTD)}</p>
        <p className="text-[#4c739a] text-xs mt-1">vs. last year</p>
      </div>

      {/* This Month */}
      <div className="flex flex-col gap-1 rounded-xl p-5 bg-white dark:bg-[#101922] border border-[#e7edf3] dark:border-gray-800 shadow-sm">
        <div className="flex justify-between items-start">
          <p className="text-[#4c739a] text-xs font-semibold uppercase tracking-wider">This Month</p>
          <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs px-2 py-0.5 rounded-full font-medium">+1.2%</span>
        </div>
        <p className="text-[#0d141b] dark:text-white text-2xl font-bold mt-2">${fmt(thisMonth)}</p>
        <p className="text-[#4c739a] text-xs mt-1">vs. last month</p>
      </div>

      {/* Pending */}
      <div className="flex flex-col gap-1 rounded-xl p-5 bg-white dark:bg-[#101922] border border-[#e7edf3] dark:border-gray-800 shadow-sm">
        <div className="flex justify-between items-start">
          <p className="text-[#4c739a] text-xs font-semibold uppercase tracking-wider">Pending Approval</p>
          <span className="material-symbols-outlined text-orange-500 text-lg">warning</span>
        </div>
        <p className="text-[#0d141b] dark:text-white text-2xl font-bold mt-2">{pendingCount} Items</p>
        <p className="text-[#4c739a] text-xs mt-1">Requires action</p>
      </div>

      {/* Budget */}
      <div className="flex flex-col gap-1 rounded-xl p-5 bg-white dark:bg-[#101922] border border-[#e7edf3] dark:border-gray-800 shadow-sm">
        <div className="flex justify-between items-start">
          <p className="text-[#4c739a] text-xs font-semibold uppercase tracking-wider">Budget Remaining</p>
          <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full font-medium">Healthy</span>
        </div>
        <p className="text-[#0d141b] dark:text-white text-2xl font-bold mt-2">${fmt(remaining)}</p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
          <div className="bg-primary h-1.5 rounded-full" style={{ width: `${usedPct}%` }} />
        </div>
      </div>

    </div>
  )
}

import Link from "next/link";
import Topbar from "@/components/layout/Topbar";
import {
  MdAddCard,
  MdReceiptLong,
  MdCategory,
} from "react-icons/md";

const actions = [
  {
    label: "Add Expense",
    href: "/expenses/add",
    icon: MdAddCard,
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-600",
  },
  {
    label: "Expense List",
    href: "/expenses/list",
    icon: MdReceiptLong,
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    text: "text-indigo-600",
  },
  {
    label: "Categories",
    href: "/expenses/categories",
    icon: MdCategory,
    bg: "bg-amber-50 dark:bg-amber-900/20",
    text: "text-amber-600",
  },
];

export default function ExpensesPage() {
  return (
    <>
      <Topbar title="Expenses" subtitle="Manage all expense records" />

      <div className="p-4 md:p-6 space-y-6 bg-slate-50 dark:bg-[#101922] min-h-full">

        {/* Quick Actions */}
        <section>
          <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {actions.map(({ href, icon: Icon, label, bg, text }) => (
              <Link
                key={href + label}
                href={href}
                className="flex flex-col items-center justify-center p-6 bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400/50 hover:shadow-md transition-all group"
              >
                <div className={`size-12 rounded-full ${bg} ${text} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 text-center">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
import Topbar from "@/components/layout/Topbar"
import PageHeader from "@/components/layout/PageHeader"
import Link from "next/link"

const quickLinks = [
  { label: "Collect Fee",      href: "/fees/collect",         color: "bg-blue-50 text-blue-700 border-blue-200" },
  { label: "Pending / Defaulters", href: "/fees/pending",     color: "bg-red-50 text-red-700 border-red-200" },
  { label: "Fee Structure",    href: "/fees/structure",        color: "bg-green-50 text-green-700 border-green-200" },
  { label: "Receipts",         href: "/fees/receipts",         color: "bg-purple-50 text-purple-700 border-purple-200" },
  { label: "Concession",       href: "/fees/concession",       color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  { label: "Online Payments",  href: "/fees/online-payments",  color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
]

export default function FeesPage() {
  return (
    <>
      <Topbar title="Fee Management" />
      <div className="p-6">
        <PageHeader title="Fee Management" subtitle="Track collections, pending fees and receipts" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {quickLinks.map((l) => (
            <Link key={l.href} href={l.href} className={`border rounded-xl p-4 text-sm font-medium text-center hover:shadow-sm transition ${l.color}`}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-400">Fee collection overview chart will render here</p>
        </div>
      </div>
    </>
  )
}

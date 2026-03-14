import Topbar from "@/components/layout/Topbar"
import PageHeader from "@/components/layout/PageHeader"

export default function Page() {
  return (
    <>
      <Topbar title="Reports Audit Logs" />
      <div className="p-6">
        <PageHeader title="Reports Audit Logs" />
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
          <p className="text-gray-400 text-sm">This module is under development.</p>
        </div>
      </div>
    </>
  )
}

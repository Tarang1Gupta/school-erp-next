import Providers from "@/components/layout/Providers"
import Sidebar from "@/components/layout/Sidebar"

export default function AdminLayout({ children }) {
  return (
    <Providers>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  )
}

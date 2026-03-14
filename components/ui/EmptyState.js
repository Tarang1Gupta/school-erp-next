export default function EmptyState({ title = "No data found", subtitle, action }) {
  return (
    <div className="text-center py-16">
      <p className="text-gray-400 text-sm font-medium">{title}</p>
      {subtitle && <p className="text-gray-400 text-xs mt-1">{subtitle}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

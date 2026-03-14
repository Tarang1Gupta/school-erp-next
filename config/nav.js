import {
  LayoutDashboard, UserPlus, Users, GraduationCap,
  BookOpen, ClipboardList, IndianRupee, FileText,
  Calendar, Bus, Building2, Wallet, Library,
  Package, BarChart3, Bell, Settings
} from "lucide-react"

export const NAV_ITEMS = [
  {
    section: "Overview",
    items: [
      { label: "Dashboard",   href: "/dashboard",   icon: LayoutDashboard },
    ],
  },
  {
    section: "Admission & Students",
    items: [
      { label: "Admission",   href: "/admission",   icon: UserPlus },
      { label: "Students",    href: "/students",    icon: Users },
      { label: "Teachers",    href: "/teachers",    icon: GraduationCap },
      { label: "Classes",     href: "/classes",     icon: BookOpen },
    ],
  },
  {
    section: "Academics",
    items: [
      { label: "Attendance",  href: "/attendance",  icon: ClipboardList },
      { label: "Exams",       href: "/exams",       icon: FileText },
      { label: "Timetable",   href: "/timetable",   icon: Calendar },
      { label: "Homework",    href: "/homework",    icon: BookOpen },
    ],
  },
  {
    section: "Finance",
    items: [
      { label: "Fees",        href: "/fees",        icon: IndianRupee },
      { label: "Payroll",     href: "/payroll",     icon: Wallet },
    ],
  },
  {
    section: "Communication",
    items: [
      { label: "Notices & SMS", href: "/communication/notices", icon: Bell },
    ],
  },
  {
    section: "Infrastructure",
    items: [
      { label: "Transport",   href: "/transport",   icon: Bus },
      { label: "Hostel",      href: "/hostel",      icon: Building2 },
      { label: "Library",     href: "/library",     icon: Library },
      { label: "Inventory",   href: "/inventory",   icon: Package },
    ],
  },
  {
    section: "Reports",
    items: [
      { label: "Reports",     href: "/reports/finance", icon: BarChart3 },
    ],
  },
  {
    section: "System",
    items: [
      { label: "Settings",    href: "/settings",    icon: Settings },
    ],
  },
]

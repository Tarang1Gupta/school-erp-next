// lib/expenseData.js

export const CATEGORY_CONFIG = {
  Supplies:    { bg: "bg-purple-50 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-300", dot: "bg-purple-500" },
  Maintenance: { bg: "bg-orange-50 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-300", dot: "bg-orange-500" },
  Salaries:    { bg: "bg-blue-50 dark:bg-blue-900/30",     text: "text-blue-700 dark:text-blue-300",     dot: "bg-blue-500"   },
  Events:      { bg: "bg-red-50 dark:bg-red-900/30",       text: "text-red-700 dark:text-red-300",       dot: "bg-red-500"    },
  Utilities:   { bg: "bg-gray-100 dark:bg-gray-700",       text: "text-gray-700 dark:text-gray-300",     dot: "bg-gray-500"   },
}

export const STATUS_CONFIG = {
  Approved: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  Pending:  "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
  Rejected: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
}

export const CATEGORIES = ["Supplies", "Maintenance", "Utilities", "Salaries", "Events"]

export const PAYMENT_METHODS = [
  { value: "Bank Transfer", label: "Bank Transfer", icon: "account_balance" },
  { value: "Credit Card",   label: "Card",          icon: "credit_card"     },
  { value: "Cash",          label: "Cash",          icon: "payments"        },
]

export const INITIAL_EXPENSES = [
  { id:1,  date:"2023-10-24", category:"Supplies",    desc:"Microscopes for Lab 3",       vendor:"Science Dept • Thermo Fisher",      payment:"Credit Card **** 4242",  amount:1200.00, status:"Approved" },
  { id:2,  date:"2023-10-22", category:"Maintenance", desc:"HVAC Repair - Gym",            vendor:"Facilities • City Cooling Services", payment:"Invoice #INV-2023-001",  amount:450.00,  status:"Pending"  },
  { id:3,  date:"2023-10-21", category:"Salaries",    desc:"Guest Lecturer Stipend",       vendor:"Academics • Dr. Alan Grant",         payment:"Bank Transfer",          amount:300.00,  status:"Approved" },
  { id:4,  date:"2023-10-20", category:"Events",      desc:"Catering for Open Day",        vendor:"Admin • Fresh Foods Inc",            payment:"Corporate Card",         amount:2150.00, status:"Rejected" },
  { id:5,  date:"2023-10-19", category:"Utilities",   desc:"Monthly Internet Service",     vendor:"Ops • Comcast Business",             payment:"Auto-Pay",               amount:180.00,  status:"Approved" },
  { id:6,  date:"2023-10-18", category:"Supplies",    desc:"Art Materials - Semester",     vendor:"Art Dept • Blick Art Materials",     payment:"Credit Card **** 4242",  amount:640.00,  status:"Approved" },
  { id:7,  date:"2023-10-17", category:"Maintenance", desc:"Roof Repair - Block B",        vendor:"Facilities • BuildRight Co",         payment:"Invoice #INV-2023-002",  amount:3200.00, status:"Pending"  },
  { id:8,  date:"2023-10-16", category:"Utilities",   desc:"Electricity Bill - October",   vendor:"Ops • City Power Grid",              payment:"Auto-Pay",               amount:920.00,  status:"Approved" },
  { id:9,  date:"2023-10-15", category:"Salaries",    desc:"Part-Time Staff Payroll",      vendor:"HR • Various",                       payment:"Bank Transfer",          amount:8500.00, status:"Approved" },
  { id:10, date:"2023-10-14", category:"Events",      desc:"Sports Day Equipment Rental",  vendor:"PE Dept • SportZone",                payment:"Corporate Card",         amount:760.00,  status:"Pending"  },
  { id:11, date:"2023-10-13", category:"Supplies",    desc:"Chemistry Lab Reagents",       vendor:"Science Dept • Sigma-Aldrich",       payment:"Purchase Order",         amount:1450.00, status:"Approved" },
  { id:12, date:"2023-10-12", category:"Maintenance", desc:"Plumbing Fix - Block A",       vendor:"Facilities • PlumberPro",            payment:"Invoice #INV-2023-003",  amount:275.00,  status:"Approved" },
  { id:13, date:"2023-10-11", category:"Utilities",   desc:"Water & Sewage Bill",          vendor:"Ops • Municipal Services",           payment:"Auto-Pay",               amount:310.00,  status:"Approved" },
  { id:14, date:"2023-10-10", category:"Events",      desc:"Annual Day Stage Setup",       vendor:"Admin • Event Masters",              payment:"Bank Transfer",          amount:4500.00, status:"Rejected" },
  { id:15, date:"2023-10-09", category:"Supplies",    desc:"Library Books - Q4 Order",     vendor:"Library • Amazon Business",          payment:"Credit Card **** 4242",  amount:880.00,  status:"Pending"  },
  { id:16, date:"2023-10-08", category:"Salaries",    desc:"Substitute Teacher - Oct",     vendor:"Academics • Maria Hernandez",        payment:"Bank Transfer",          amount:450.00,  status:"Approved" },
]

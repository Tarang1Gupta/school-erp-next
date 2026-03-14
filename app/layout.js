import "./globals.css"
import Providers from "./providers"

export const metadata = {
  title: {
    default: "School ERP",
    template: "%s | School ERP",
  },
  description: "School Management System",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body> <Providers>{children}</Providers> </body>
    </html>
  )
}

import { NextResponse } from "next/server"

const PUBLIC_PATHS = ["/login", "/forgot-password"]

export function middleware(request) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(process.env.NEXT_PUBLIC_TOKEN_KEY || "erp_token")

  // Allow public paths
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    // If already logged in, redirect to dashboard
    if (token) return NextResponse.redirect(new URL("/dashboard", request.url))
    return NextResponse.next()
  }

  // Protected — no token → go to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
}

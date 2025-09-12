"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { ROLE_PAGES } from "@/lib/roles"

export default function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const userRole = session?.user?.role as keyof typeof ROLE_PAGES

  const navItems = [
    { href: "/", label: "Dashboard", icon: "📊" },
    { href: "/employees", label: "Employees", icon: "👥" },
    { href: "/positions", label: "Positions", icon: "💼" },
    { href: "/payroll", label: "Payroll", icon: "💰" },
    { href: "/reports", label: "Reports", icon: "📈" },
  ]

  // Filter navigation items based on user role
  const allowedPages = userRole ? ROLE_PAGES[userRole] : []
  const filteredNavItems = navItems.filter(item => {
    const page = item.href === "/" ? "dashboard" : item.href.slice(1)
    return allowedPages.includes(page)
  })
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Nav */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              IMPRO ERP
            </Link>
            <div className="hidden md:flex space-x-6">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center space-x-4">
            {session?.user ? (
              <>
                <div className="text-sm font-medium text-gray-800">
                  Welcome, {session.user.name ?? session.user.email?.split('@')[0]}
                </div>
                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {userRole}
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

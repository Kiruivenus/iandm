"use client"

import { usePathname, useRouter } from "next/navigation"

interface BottomNavigationProps {
  className?: string
}

export function BottomNavigation({ className = "" }: BottomNavigationProps) {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    {
      icon: (active: boolean) => (
        <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={active ? 0 : 2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={active ? 0 : 2}
            d="M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4"
          />
        </svg>
      ),
      label: "Dashboard",
      path: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      icon: (active: boolean) => (
        <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeWidth={active ? 0 : 2} />
          <line x1="8" y1="21" x2="16" y2="21" strokeWidth={active ? 0 : 2} />
          <line x1="12" y1="17" x2="12" y2="21" strokeWidth={active ? 0 : 2} />
        </svg>
      ),
      label: "Cards",
      path: "/cards",
      active: pathname === "/cards",
    },
    {
      icon: (active: boolean) => (
        <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={active ? 0 : 2}
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      label: "Payments",
      path: "/payments",
      active: pathname === "/payments",
    },
    {
      icon: (active: boolean) => (
        <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={active ? 0 : 2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      label: "Accounts",
      path: "/accounts",
      active: pathname === "/accounts",
    },
    {
      icon: (active: boolean) => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="1" strokeWidth={active ? 3 : 2} />
          <circle cx="19" cy="12" r="1" strokeWidth={active ? 3 : 2} />
          <circle cx="5" cy="12" r="1" strokeWidth={active ? 3 : 2} />
        </svg>
      ),
      label: "More",
      path: "/more",
      active: pathname === "/more",
    },
  ]

  const handleNavigation = (path: string) => {
    if (path !== pathname) {
      router.push(path)
    }
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 ${className}`}>
      <div className="flex items-center justify-around py-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleNavigation(item.path)}
            className={`flex flex-col items-center space-y-1 transition-colors py-1 px-2 ${
              item.active ? "text-teal-400" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {item.icon(item.active)}
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

"use client"

import { PageTransition } from "@/components/page-transition"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function AccountsPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-teal-400 pb-20">
        {/* Header */}
        <div className="pt-12 pb-8 text-center">
          <h1 className="text-2xl font-semibold text-white mb-6">Accounts Overview</h1>
          <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium">
            + Open Accounts and Fixed Deposits
          </button>
        </div>

        {/* Content */}
        <div className="bg-gray-900 rounded-t-3xl min-h-[calc(100vh-200px)] pt-6 px-6">
          {/* Account 1 */}
          <div className="bg-gray-800 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  </svg>
                </div>
                <span className="text-gray-400 text-sm">Custodial Trading - Lcy</span>
              </div>
              <svg className="w-6 h-6 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">PATRICK KIPROTICH KIRUI - KES ACC</h3>
              <p className="text-gray-400 text-sm mb-2">054053775861350</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Current Balance</span>
                <span className="text-white font-semibold">KES 1.00</span>
              </div>
            </div>
          </div>

          {/* Account 2 */}
          <div className="bg-gray-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  </svg>
                </div>
                <span className="text-gray-400 text-sm">Paygo-lcy</span>
              </div>
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">PATRICK KIPROTICH KIRUI</h3>
              <p className="text-gray-400 text-sm mb-2">054053775861350</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Current Balance</span>
                <span className="text-white font-semibold">KES 67.45</span>
              </div>
            </div>
          </div>
        </div>

        <BottomNavigation />
      </div>
    </PageTransition>
  )
}

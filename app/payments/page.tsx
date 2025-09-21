"use client"

import { useState } from "react"
import { PageTransition } from "@/components/page-transition"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("Mobile")

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-teal-400 pb-20">
        {/* Header */}
        <div className="pt-12 pb-8 text-center">
          <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-white">Payments</h1>
        </div>

        {/* Content */}
        <div className="bg-gray-900 rounded-t-3xl min-h-[calc(100vh-200px)] pt-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-700 px-6 mb-8">
            <button
              onClick={() => setActiveTab("Mobile")}
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === "Mobile" ? "text-teal-400 border-b-2 border-teal-400" : "text-gray-400"
              }`}
            >
              Mobile
            </button>
            <button
              onClick={() => setActiveTab("Bank")}
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === "Bank" ? "text-teal-400 border-b-2 border-teal-400" : "text-gray-400"
              }`}
            >
              Bank
            </button>
          </div>

          {/* Payment Options */}
          <div className="px-6">
            <div className="grid grid-cols-3 gap-6 mb-8">
              {/* Send Money to Mobile */}
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <span className="text-white text-xs text-center">Send Money to Mobile</span>
              </div>

              {/* M-PESA Paybill */}
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <span className="text-white text-xs text-center">M-PESA Paybill</span>
              </div>

              {/* Airtime Purchase */}
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <span className="text-white text-xs text-center">Airtime Purchase</span>
              </div>
            </div>

            {/* M-PESA Buy Goods */}
            <div className="flex justify-start">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <span className="text-white text-xs text-center">M-PESA Buy Goods</span>
              </div>
            </div>
          </div>
        </div>

        <BottomNavigation />
      </div>
    </PageTransition>
  )
}

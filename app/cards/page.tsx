"use client"

import { PageTransition } from "@/components/page-transition"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function CardsPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-teal-400 pb-20">
        {/* Header */}
        <div className="pt-12 pb-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-white">Cards</h1>
        </div>

        {/* Content */}
        <div className="bg-gray-900 rounded-t-3xl min-h-[calc(100vh-200px)] pt-8 px-6">
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* View my cards */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <span className="text-white text-sm text-center">View my cards</span>
            </div>

            {/* Apply for card */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <span className="text-white text-sm text-center">Apply for card</span>
            </div>

            {/* Card Payments */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <span className="text-white text-sm text-center">Card Payments</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Milele Rewards */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 00-2.828 0L6 21" />
                </svg>
              </div>
              <span className="text-white text-sm text-center">Milele Rewards</span>
            </div>

            {/* Exclusive Deals */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <span className="text-white text-sm text-center">Exclusive Deals</span>
            </div>
          </div>
        </div>

        <BottomNavigation />
      </div>
    </PageTransition>
  )
}

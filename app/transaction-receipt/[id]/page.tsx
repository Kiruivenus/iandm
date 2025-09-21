"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { BottomNavigation } from "@/components/bottom-navigation"

const transactions = [
  {
    id: "1",
    date: "Sat, Sep 20 2025",
    valueDate: "Sat, Sep 20 2025",
    reference: "2265ASEL8717",
    from: "0540537758615O",
    type: "MOBILE MONEY",
    amount: 850.0,
    description: "254729059088/MPESA Payment to 254729059088",
    beneficiary: "254729059088",
  },
  {
    id: "2",
    date: "Sat, Sep 20 2025",
    valueDate: "Sat, Sep 20 2025",
    reference: "001052597861SO",
    from: "0540537758615O/Personal Transfer",
    type: "Personal Transfer",
    amount: 1020.0,
    description: "001052597861SO",
    beneficiary: "0540537758615O",
  },
  {
    id: "3",
    date: "Fri, Sep 19 2025",
    valueDate: "Fri, Sep 19 2025",
    reference: "2547452924221",
    from: "254745292422/MPESA Payment",
    type: "MOBILE MONEY",
    amount: 4300.0,
    description: "254745292422/MPESA Payment to 254745292422",
    beneficiary: "254745292422",
  },
  {
    id: "4",
    date: "Fri, Sep 19 2025",
    valueDate: "Fri, Sep 19 2025",
    reference: "001058807561SO",
    from: "0540537758615O/Travel Expenses",
    type: "Travel Expenses",
    amount: 4353.0,
    description: "001058807561SO",
    beneficiary: "0540537758615O",
  },
  {
    id: "5",
    date: "Thu, Sep 17 2025",
    valueDate: "Thu, Sep 17 2025",
    reference: "2547452924222",
    from: "254745292422/MPESA Payment",
    type: "MOBILE MONEY",
    amount: 5900.0,
    description: "254745292422/MPESA Payment to 254745292422",
    beneficiary: "254745292422",
  },
  {
    id: "6",
    date: "Thu, Sep 17 2025",
    valueDate: "Thu, Sep 17 2025",
    reference: "001047532561SO",
    from: "0540537758615O/Goods and services",
    type: "Goods and services",
    amount: 6564.0,
    description: "001047532561SO",
    beneficiary: "0540537758615O",
  },
  {
    id: "7",
    date: "Mon, Sep 15 2025",
    valueDate: "Mon, Sep 15 2025",
    reference: "2547136275991",
    from: "254713627599/MPESA Payment",
    type: "MOBILE MONEY",
    amount: 600.0,
    description: "254713627599/MPESA Payment to 254713627599",
    beneficiary: "254713627599",
  },
  {
    id: "8",
    date: "Sun, Sep 06 2025",
    valueDate: "Sun, Sep 06 2025",
    reference: "2547459589291",
    from: "254745958929/MPESA Payment",
    type: "MOBILE MONEY",
    amount: 400.0,
    description: "254745958929/MPESA Payment to 254745958929",
    beneficiary: "254745958929",
  },
  {
    id: "9",
    date: "Sat, Sep 01 2025",
    valueDate: "Sat, Sep 01 2025",
    reference: "2547896357891",
    from: "254789635789/MPESA Payment",
    type: "MOBILE MONEY",
    amount: 1000.0,
    description: "254789635789/MPESA Payment to 254789635789",
    beneficiary: "254789635789",
  },
]

interface EditedTransaction {
  id: string
  date: string
  valueDate: string
  reference: string
  from: string
  type: string
  amount: number
  description: string
  beneficiary: string
  editedAt: number
}

export default function TransactionReceiptPage() {
  const params = useParams()
  const transactionId = params.id as string
  const [transaction, setTransaction] = useState<any>(null)

  useEffect(() => {
    const originalTransaction = transactions.find((t) => t.id === transactionId)
    if (!originalTransaction) return

    // Check for saved edits in localStorage
    const savedEdits = localStorage.getItem(`transaction_edit_${transactionId}`)
    let transactionData = originalTransaction

    if (savedEdits) {
      try {
        const parsed: EditedTransaction = JSON.parse(savedEdits)
        const now = Date.now()
        const twentyFourHours = 24 * 60 * 60 * 1000

        // Check if the edit is within 24 hours
        if (now - parsed.editedAt < twentyFourHours) {
          transactionData = parsed
        } else {
          // Remove expired edit
          localStorage.removeItem(`transaction_edit_${transactionId}`)
        }
      } catch (error) {
        console.error("Error parsing saved transaction edits:", error)
      }
    }

    setTransaction(transactionData)
  }, [transactionId])

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white">Transaction not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 pb-20">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white text-xl font-medium">Hi Patrick Kiprotich Kirui</h1>
            <p className="text-white/80 text-sm">Your account overview</p>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12" />
            </svg>
          </div>
        </div>

        {/* Account Card - Simplified */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <span className="text-white text-sm font-medium">Paygo-Icy</span>
          </div>
          <div>
            <p className="text-white/90 text-lg font-medium">Patrick Kiprotich Kirui</p>
            <p className="text-white/70 text-sm">0540 5377 5861 50</p>
          </div>
        </div>

        {/* What would you like to do today */}
        <div className="mb-6">
          <h2 className="text-white text-lg font-medium">What would you like to do today:</h2>
        </div>
      </div>

      {/* Transaction Receipt */}
      <div className="bg-gray-800 rounded-t-3xl px-6 py-8 min-h-[500px]">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold">Transaction Receipt</h1>
          </div>
        </div>

        <div className="space-y-6">
          {/* Transaction Date */}
          <div>
            <p className="text-gray-400 text-sm mb-1">Transaction Date</p>
            <p className="text-white text-lg font-semibold">{transaction.date}</p>
          </div>

          {/* Transaction Value Date */}
          <div>
            <p className="text-gray-400 text-sm mb-1">Transaction Value Date</p>
            <p className="text-white text-lg font-semibold">{transaction.valueDate}</p>
          </div>

          {/* Transaction Reference */}
          <div>
            <p className="text-gray-400 text-sm mb-1">Transaction Reference</p>
            <p className="text-white text-xl font-bold">{transaction.reference}</p>
          </div>

          {/* From */}
          <div>
            <p className="text-gray-400 text-sm mb-1">From</p>
            <p className="text-white text-xl font-bold">{transaction.from}</p>
          </div>

          {/* Transaction Type */}
          <div>
            <p className="text-gray-400 text-sm mb-1">Transaction Type</p>
            <p className="text-white text-xl font-bold">{transaction.type}</p>
          </div>

          {/* Amount */}
          <div>
            <p className="text-gray-400 text-sm mb-1">Amount</p>
            <p className="text-white text-2xl font-bold">KES {transaction.amount.toFixed(2)}</p>
          </div>

          {/* Description */}
          <div>
            <p className="text-gray-400 text-sm mb-1">Description</p>
            <p className="text-white text-lg font-semibold break-all">{transaction.description}</p>
          </div>

          {/* Beneficiary Phone Number */}
          <div>
            <p className="text-gray-400 text-sm mb-1">Beneficiary Phone Number</p>
            <p className="text-white text-xl font-bold">{transaction.beneficiary}</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}

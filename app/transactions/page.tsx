"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CreditCard } from "lucide-react"

const allTransactions = [
  {
    id: "1",
    date: "20 September 2025",
    description: "254729059088/MPESA Payment to 254729059088",
    reference: "2265ASEL8717",
    amount: -850.0,
    type: "outgoing",
    icon: "↗",
  },
  {
    id: "2",
    date: "20 September 2025",
    description: "0540537758615O/Personal Transfer",
    reference: "001052597861SO",
    amount: 1020.0,
    type: "incoming",
    icon: "✓",
  },
  {
    id: "3",
    date: "19 September 2025",
    description: "254745292422/MPESA Payment to 254745292422",
    reference: "254745292422",
    amount: -4300.0,
    type: "outgoing",
    icon: "↗",
  },
  {
    id: "4",
    date: "19 September 2025",
    description: "0540537758615O/Travel Expenses",
    reference: "001058807561SO",
    amount: 4353.0,
    type: "incoming",
    icon: "✓",
  },
  {
    id: "5",
    date: "17 September 2025",
    description: "254745292422/MPESA Payment to 254745292422",
    reference: "254745292422",
    amount: -5900.0,
    type: "outgoing",
    icon: "↗",
  },
  {
    id: "6",
    date: "17 September 2025",
    description: "0540537758615O/Goods and services",
    reference: "031047532561SO",
    amount: 6564.0,
    type: "incoming",
    icon: "✓",
  },
  {
    id: "7",
    date: "15 September 2025",
    description: "254713627599/MPESA Payment to 254713627599",
    reference: "254713627599",
    amount: -600.0,
    type: "outgoing",
    icon: "↗",
  },
  {
    id: "8",
    date: "06 September 2025",
    description: "254745958929/MPESA Payment to 254745958929",
    reference: "254745958929",
    amount: -400.0,
    type: "outgoing",
    icon: "↗",
  },
  {
    id: "9",
    date: "01 September 2025",
    description: "254790635789/MPESA Payment to 254790635789",
    reference: "254790635789",
    amount: -1000.0,
    type: "outgoing",
    icon: "↗",
  },
]

export default function TransactionsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("transactions")
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null)

  const handleTransactionClick = (transaction: (typeof allTransactions)[0]) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout)
      setClickTimeout(null)
      // Double click - go to editor
      router.push(`/transaction-editor/${transaction.id}`)
    } else {
      // Single click - set timeout for receipt
      const timeout = setTimeout(() => {
        router.push(`/transaction-receipt/${transaction.id}`)
        setClickTimeout(null)
      }, 300)
      setClickTimeout(timeout)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-teal-500">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-white hover:bg-white/10">
            <ArrowLeft className="w-6 h-6" />
          </Button>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div className="text-white font-bold text-lg">I&M</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6 mb-6">
        <div className="flex space-x-8 border-b border-white/20">
          {[
            { id: "account", label: "Account Details" },
            { id: "transactions", label: "Transactions" },
            { id: "statements", label: "Statements" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === tab.id ? "text-teal-300 border-b-2 border-teal-300" : "text-white/70 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-gray-900 rounded-t-3xl min-h-[calc(100vh-200px)] px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white text-xl font-medium">Transactions</h1>
          <Button variant="ghost" className="text-teal-400 hover:text-teal-300 hover:bg-teal-400/10 text-sm">
            Search transactions
          </Button>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {allTransactions.map((transaction) => (
            <div
              key={transaction.id}
              onClick={() => handleTransactionClick(transaction)}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-xl cursor-pointer hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                  {transaction.type === "incoming" ? (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">↗</span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{transaction.date}</p>
                  <p className="text-gray-400 text-xs max-w-[200px] truncate">{transaction.description}</p>
                  <p className="text-gray-500 text-xs">{transaction.reference}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold text-sm ${transaction.amount > 0 ? "text-green-400" : "text-white"}`}>
                  KES {transaction.amount > 0 ? "+" : ""}
                  {Math.abs(transaction.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

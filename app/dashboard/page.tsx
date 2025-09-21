"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BottomNavigation } from "@/components/bottom-navigation"

const originalTransactions = [
  {
    id: "1",
    date: "Sat, Sep 20 2025",
    reference: "2265ASEL8717",
    from: "0540537758615O",
    type: "MOBILE MONEY",
    amount: -850.0,
    description: "254729059088/MPESA Payment to 254729059088",
    beneficiary: "254729059088",
    icon: "↗",
  },
  {
    id: "2",
    date: "Sat, Sep 20 2025",
    reference: "001052597861SO",
    from: "0540537758615O/Personal Transfer",
    type: "Personal Transfer",
    amount: 1020.0,
    description: "001052597861SO",
    beneficiary: "0540537758615O",
    icon: "✓",
  },
  {
    id: "3",
    date: "Fri, Sep 19 2025",
    reference: "2547452924221",
    from: "254745292422/MPESA Payment",
    type: "MOBILE MONEY",
    amount: -4300.0,
    description: "254745292422/MPESA Payment to 254745292422",
    beneficiary: "254745292422",
    icon: "↗",
  },
  {
    id: "4",
    date: "Fri, Sep 19 2025",
    reference: "001058807561SO",
    from: "0540537758615O/Travel Expenses",
    type: "Travel Expenses",
    amount: 4353.0,
    description: "001058807561SO",
    beneficiary: "0540537758615O",
    icon: "✓",
  },
  {
    id: "5",
    date: "Thu, Sep 17 2025",
    reference: "2547452924222",
    from: "254745292422/MPESA Payment",
    type: "MOBILE MONEY",
    amount: -5900.0,
    description: "254745292422/MPESA Payment to 254745292422",
    beneficiary: "254745292422",
    icon: "↗",
  },
  {
    id: "6",
    date: "Thu, Sep 17 2025",
    reference: "001047532561SO",
    from: "0540537758615O/Goods and services",
    type: "Goods and services",
    amount: 6564.0,
    description: "001047532561SO",
    beneficiary: "0540537758615O",
    icon: "✓",
  },
  {
    id: "7",
    date: "Mon, Sep 15 2025",
    reference: "2547136275991",
    from: "254713627599/MPESA Payment",
    type: "MOBILE MONEY",
    amount: -600.0,
    description: "254713627599/MPESA Payment to 254713627599",
    beneficiary: "254713627599",
    icon: "↗",
  },
  {
    id: "8",
    date: "Sun, Sep 06 2025",
    reference: "2547459589291",
    from: "254745958929/MPESA Payment",
    type: "MOBILE MONEY",
    amount: -400.0,
    description: "254745958929/MPESA Payment to 254745958929",
    beneficiary: "254745958929",
    icon: "↗",
  },
  {
    id: "9",
    date: "Sat, Sep 01 2025",
    reference: "2547896357891",
    from: "254789635789/MPESA Payment",
    type: "MOBILE MONEY",
    amount: -1000.0,
    description: "254789635789/MPESA Payment to 254789635789",
    beneficiary: "254789635789",
    icon: "↗",
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

const getTransactionWithEdits = (transaction: any): any => {
  const savedEdits = localStorage.getItem(`transaction_edit_${transaction.id}`)
  if (!savedEdits) return transaction

  try {
    const parsed: EditedTransaction = JSON.parse(savedEdits)
    const now = Date.now()
    const twentyFourHours = 24 * 60 * 60 * 1000

    // Check if the edit is within 24 hours
    if (now - parsed.editedAt < twentyFourHours) {
      return {
        ...transaction,
        date: parsed.date,
        reference: parsed.reference,
        from: parsed.from,
        type: parsed.type,
        amount: parsed.amount,
        description: parsed.description,
        beneficiary: parsed.beneficiary,
      }
    } else {
      // Remove expired edit
      localStorage.removeItem(`transaction_edit_${transaction.id}`)
    }
  } catch (error) {
    console.error("Error parsing saved transaction edits:", error)
  }

  return transaction
}

export default function DashboardPage() {
  const router = useRouter()
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null)
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [eyeClickTimeout, setEyeClickTimeout] = useState<NodeJS.Timeout | null>(null)
  const [showAccountEditor, setShowAccountEditor] = useState(false)
  const [accountName, setAccountName] = useState("Patrick Kiprotich Kirui")
  const [accountBalance, setAccountBalance] = useState("100,067.45")
  const [tempName, setTempName] = useState("")
  const [tempBalance, setTempBalance] = useState("")
  const [allTransactions, setAllTransactions] = useState(originalTransactions)

  useEffect(() => {
    const savedName = localStorage.getItem("accountName")
    const savedBalance = localStorage.getItem("accountBalance")
    if (savedName) setAccountName(savedName)
    if (savedBalance) setAccountBalance(savedBalance)

    const transactionsWithEdits = originalTransactions.map(getTransactionWithEdits)
    setAllTransactions(transactionsWithEdits)
  }, [])

  const handleTransactionClick = (transaction: (typeof allTransactions)[0], isDoubleClick = false) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout)
      setClickTimeout(null)
      router.push(`/transaction-editor/${transaction.id}`)
    } else {
      const timeout = setTimeout(() => {
        router.push(`/transaction-receipt/${transaction.id}`)
        setClickTimeout(null)
      }, 300)
      setClickTimeout(timeout)
    }
  }

  const handleEyeClick = () => {
    if (eyeClickTimeout) {
      clearTimeout(eyeClickTimeout)
      setEyeClickTimeout(null)
      setTempName(accountName)
      setTempBalance(accountBalance)
      setShowAccountEditor(true)
    } else {
      const timeout = setTimeout(() => {
        setBalanceVisible(!balanceVisible)
        setEyeClickTimeout(null)
      }, 300)
      setEyeClickTimeout(timeout)
    }
  }

  const handleSaveAccount = () => {
    setAccountName(tempName)
    setAccountBalance(tempBalance)
    localStorage.setItem("accountName", tempName)
    localStorage.setItem("accountBalance", tempBalance)
    setShowAccountEditor(false)
  }

  const dashboardTransactions = allTransactions.slice(0, 5)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 pb-20">
      {/* Header */}
      <div className="px-6 pt-12 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-white text-lg font-medium">Hi {accountName}</h1>
            <p className="text-white/80 text-sm">Your account overview</p>
          </div>
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12" />
            </svg>
          </div>
        </div>

        <Card className="bg-gradient-to-r from-purple-600 to-purple-800 border-0 text-white p-3 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-white/20 rounded-md flex items-center justify-center">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
              </div>
              <span className="text-sm font-medium">Paygo-Icy</span>
            </div>
            <button
              onClick={handleEyeClick}
              className="w-5 h-5 bg-white/20 rounded-md flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                {balanceVisible ? (
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                ) : (
                  <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                )}
              </svg>
            </button>
          </div>

          <div className="mb-2">
            <p className="text-white/90 text-sm font-medium">{accountName}</p>
            <p className="text-white/70 text-xs">0540 5377 5861 50</p>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-white/70 text-xs">KES</p>
              <p className="text-white text-xl font-bold">{balanceVisible ? accountBalance : "••••••••"}</p>
            </div>
            <div
              className="w-12 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg opacity-80"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Decorative pattern */}
          <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
            <div className="w-full h-full bg-gradient-to-bl from-white to-transparent rounded-full transform translate-x-8 -translate-y-8" />
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white text-sm font-medium">What would you like to do today:</h2>
          <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 text-xs h-6 px-2">
            Expand
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[
            {
              icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              ),
              label: "Send Money",
            },
            {
              icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ),
              label: "Bank Transfer",
            },
            {
              icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3z" />
                </svg>
              ),
              label: "Mobile to I&M",
            },
            {
              icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                </svg>
              ),
              label: "Grow with I&M",
            },
          ].map((action, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
              <div className="text-white mb-1 flex justify-center">{action.icon}</div>
              <p className="text-white text-xs font-medium leading-tight">{action.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Loan Offers */}
      <div className="px-6 mb-3">
        <h3 className="text-white text-sm font-medium mb-2">Apply for Unsecured Loan today</h3>
        <div className="grid  grid-cols-2 gap-2">
          <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 border-0 p-2">
            <h4 className="text-black font-bold text-sm mb-1">Short Term</h4>
            <p className="text-black text-xs mb-1">Get up to KES 350,000 instantly</p>
            <Button size="sm" className="bg-black/20 hover:bg-black/30 text-black border-0 h-5 px-2 text-xs">
              →
            </Button>
          </Card>
          <Card className="bg-gradient-to-r  from-teal-400 to-green-500 border-0 p-2">
            <h4 className="text-black font-bold text-sm mb-1">Long Term</h4>
            <p className="text-black text-xs mb-1">Get up to KES 5,000,000</p>
            <Button size="sm" className="bg-black/20 hover:bg-black/30 text-black border-0 h-5 px-2 text-xs">
              →
            </Button>
          </Card>
        </div>
      </div>

      {/* Milele Rewards */}
      <div className="px-6  mb-4" >
        <Card className=" bg-gradient-to-r from-purple-600 to-pink-600 border-0 p-2 flex items-between justify-between">
          <div className="flex items- space-x-2">
            <div className="w-6 h-6  flex items-center justify-center">
              <span className="text-sm">🎁</span>
            </div>
            <div>
              <h4 className="text-white font-bold text-[10px]">Milele Rewards</h4>
              <p className="text-white/80 text-[10px]">Earn Points with Every Swipe</p>
            </div>
         
           <div className="text-right space-x-9">
            <p className="text-white text-lg  font-bold text-[10px]">8.71</p>
            <p className="text-white/80 text-xs text-[10px]">Points</p>
          </div>
           </div>
        </Card>
      </div>
      

      {/* Recent Transactions */}
      <div className="bg-gray-900 rounded-t-3xl px-6 py-4 min-h-[280px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-sm font-medium">Recent Transactions</h3>
          <Button
            variant="ghost"
            className="text-teal-400 hover:text-teal-300 hover:bg-teal-400/10 text-xs h-6 px-2"
            onClick={() => router.push("/transactions")}
          >
            See All
          </Button>
        </div>

        <div className="space-y-2">
          {dashboardTransactions.map((transaction) => (
            <div
              key={transaction.id}
              onClick={() => handleTransactionClick(transaction)}
              className="flex items-center justify-between p-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs">{transaction.icon}</span>
                </div>
                <div>
                  <p className="text-white font-medium text-xs">{transaction.date}</p>
                  <p className="text-gray-400 text-xs">{transaction.reference}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold text-xs ${transaction.amount > 0 ? "text-green-400" : "text-white"}`}>
                  KES {transaction.amount > 0 ? "+" : ""}
                  {transaction.amount.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Editor Modal */}
      {showAccountEditor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-white text-xl font-bold mb-6">Edit Account Details</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white text-sm font-medium">
                  Account Name
                </Label>
                <Input
                  id="name"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="mt-1 bg-gray-700 border-gray-600 text-white"
                  placeholder="Enter account name"
                />
              </div>

              <div>
                <Label htmlFor="balance" className="text-white text-sm font-medium">
                  Account Balance
                </Label>
                <Input
                  id="balance"
                  value={tempBalance}
                  onChange={(e) => setTempBalance(e.target.value)}
                  className="mt-1 bg-gray-700 border-gray-600 text-white"
                  placeholder="Enter balance (e.g., 100,067.45)"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button
                onClick={() => setShowAccountEditor(false)}
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button onClick={handleSaveAccount} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}

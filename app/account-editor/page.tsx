"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AccountEditorPage() {
  const router = useRouter()
  const [accountName, setAccountName] = useState("Patrick Kiprotich Kirui")
  const [balance, setBalance] = useState("100,067.45")
  const [accountNumber, setAccountNumber] = useState("0540 5377 5861 50")
  const [isLoading, setIsLoading] = useState(false)

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("account-editor-data")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        const expiryTime = parsedData.expiry

        if (Date.now() < expiryTime) {
          setAccountName(parsedData.accountName || "Patrick Kiprotich Kirui")
          setBalance(parsedData.balance || "100,067.45")
          setAccountNumber(parsedData.accountNumber || "0540 5377 5861 50")
        } else {
          localStorage.removeItem("account-editor-data")
        }
      } catch (error) {
        console.error("Error loading saved account data:", error)
      }
    }
  }, [])

  const handleSave = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Save to localStorage with 24-hour expiry
    const dataToSave = {
      accountName,
      balance,
      accountNumber,
      expiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    }

    localStorage.setItem("account-editor-data", JSON.stringify(dataToSave))
    setIsLoading(false)

    // Navigate back to dashboard
    router.push("/dashboard")
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <button onClick={handleCancel} className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-white text-lg font-medium">Edit Account</h1>
          <div className="w-10 h-10" />
        </div>
      </div>

      {/* Edit Form */}
      <div className="px-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="accountName" className="text-white text-sm font-medium">
                Account Name
              </Label>
              <Input
                id="accountName"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="mt-2 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                placeholder="Enter account name"
              />
            </div>

            <div>
              <Label htmlFor="balance" className="text-white text-sm font-medium">
                Balance (KES)
              </Label>
              <Input
                id="balance"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="mt-2 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                placeholder="Enter balance"
              />
            </div>

            <div>
              <Label htmlFor="accountNumber" className="text-white text-sm font-medium">
                Account Number
              </Label>
              <Input
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="mt-2 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                placeholder="Enter account number"
              />
            </div>
          </div>

          <div className="flex space-x-4 mt-8">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1 bg-transparent border-white/30 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1 bg-teal-500 hover:bg-teal-600 text-white"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </Card>

        <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
          <p className="text-white/80 text-sm">
            <strong>Note:</strong> Changes will be saved locally for 24 hours. Double-click the eye icon on your account
            card to access this editor.
          </p>
        </div>
      </div>
    </div>
  )
}

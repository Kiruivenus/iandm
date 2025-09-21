"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { BottomNavigation } from "@/components/bottom-navigation"

const originalTransactions = [
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

export default function TransactionEditorPage() {
  const params = useParams()
  const router = useRouter()
  const transactionId = params.id as string

  const [formData, setFormData] = useState({
    date: "",
    valueDate: "",
    reference: "",
    from: "",
    type: "",
    amount: "",
    description: "",
    beneficiary: "",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  useEffect(() => {
    const originalTransaction = originalTransactions.find((t) => t.id === transactionId)
    if (!originalTransaction) return

    // Check for saved edits in localStorage
    const savedEdits = localStorage.getItem(`transaction_edit_${transactionId}`)
    let transactionData = originalTransaction

    if (savedEdits) {
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
    }

    setFormData({
      date: transactionData.date,
      valueDate: transactionData.valueDate,
      reference: transactionData.reference,
      from: transactionData.from,
      type: transactionData.type,
      amount: transactionData.amount.toString(),
      description: transactionData.description,
      beneficiary: transactionData.beneficiary,
    })
  }, [transactionId])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setHasUnsavedChanges(true)
  }

  const handleSave = () => {
    setIsSaving(true)

    // Simulate save delay
    setTimeout(() => {
      const editedTransaction: EditedTransaction = {
        id: transactionId,
        date: formData.date,
        valueDate: formData.valueDate,
        reference: formData.reference,
        from: formData.from,
        type: formData.type,
        amount: Number.parseFloat(formData.amount) || 0,
        description: formData.description,
        beneficiary: formData.beneficiary,
        editedAt: Date.now(),
      }

      localStorage.setItem(`transaction_edit_${transactionId}`, JSON.stringify(editedTransaction))
      setIsSaving(false)
      setHasUnsavedChanges(false)

      // Show success message and redirect
      alert("Transaction updated successfully!")
      router.push("/dashboard")
    }, 1000)
  }

  const originalTransaction = originalTransactions.find((t) => t.id === transactionId)
  if (!originalTransaction) {
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
            <p className="text-white/80 text-sm">Edit transaction details</p>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Transaction Editor Form */}
      <div className="bg-gray-800 rounded-t-3xl px-6 py-8 min-h-[600px]">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold">Edit Transaction</h1>
            {hasUnsavedChanges && <p className="text-yellow-400 text-sm">You have unsaved changes</p>}
          </div>
        </div>

        <div className="space-y-6">
          {/* Transaction Date */}
          <div>
            <Label htmlFor="date" className="text-gray-300 text-sm font-medium">
              Transaction Date
            </Label>
            <Input
              id="date"
              type="text"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className="mt-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              placeholder="Enter transaction date"
            />
          </div>

          {/* Transaction Value Date */}
          <div>
            <Label htmlFor="valueDate" className="text-gray-300 text-sm font-medium">
              Transaction Value Date
            </Label>
            <Input
              id="valueDate"
              type="text"
              value={formData.valueDate}
              onChange={(e) => handleInputChange("valueDate", e.target.value)}
              className="mt-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              placeholder="Enter value date"
            />
          </div>

          {/* Transaction Reference */}
          <div>
            <Label htmlFor="reference" className="text-gray-300 text-sm font-medium">
              Transaction Reference
            </Label>
            <Input
              id="reference"
              type="text"
              value={formData.reference}
              onChange={(e) => handleInputChange("reference", e.target.value)}
              className="mt-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              placeholder="Enter reference number"
            />
          </div>

          {/* From Account */}
          <div>
            <Label htmlFor="from" className="text-gray-300 text-sm font-medium">
              From Account
            </Label>
            <Input
              id="from"
              type="text"
              value={formData.from}
              onChange={(e) => handleInputChange("from", e.target.value)}
              className="mt-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              placeholder="Enter from account"
            />
          </div>

          {/* Transaction Type */}
          <div>
            <Label htmlFor="type" className="text-gray-300 text-sm font-medium">
              Transaction Type
            </Label>
            <Input
              id="type"
              type="text"
              value={formData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              className="mt-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              placeholder="Enter transaction type"
            />
          </div>

          {/* Amount */}
          <div>
            <Label htmlFor="amount" className="text-gray-300 text-sm font-medium">
              Amount (KES)
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              className="mt-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              placeholder="Enter amount"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-gray-300 text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="mt-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 min-h-[80px]"
              placeholder="Enter description"
            />
          </div>

          {/* Beneficiary Phone Number */}
          <div>
            <Label htmlFor="beneficiary" className="text-gray-300 text-sm font-medium">
              Beneficiary Phone Number
            </Label>
            <Input
              id="beneficiary"
              type="text"
              value={formData.beneficiary}
              onChange={(e) => handleInputChange("beneficiary", e.target.value)}
              className="mt-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              placeholder="Enter beneficiary phone number"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 space-y-4">
          <Button
            onClick={handleSave}
            disabled={isSaving || !hasUnsavedChanges}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-4 text-lg font-medium"
          >
            {isSaving ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Saving...</span>
              </div>
            ) : (
              "Save Changes"
            )}
          </Button>

          <Button
            onClick={() => router.back()}
            variant="outline"
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 py-4 text-lg font-medium"
          >
            Cancel
          </Button>
        </div>

        {/* Info about localStorage */}
        <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-700/50">
          <p className="text-blue-200 text-sm">
            <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Your edits will be saved locally for 24 hours. After that, they will be automatically removed.
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}

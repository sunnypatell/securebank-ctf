"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Add this to the top of the file, right after the imports
const dateInputStyles = `
  /* Hide the calendar icon in webkit browsers */
  input[type="date"]::-webkit-calendar-picker-indicator {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
  }
  
  /* Firefox specific styling */
  input[type="date"] {
    appearance: none;
    -moz-appearance: none;
  }
`

export default function AddTransactionPage() {
  const router = useRouter()
  const [form, setForm] = useState({ date: "", description: "", amount: "", type: "credit" })
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setMessage({ type: "success", text: "Transaction added successfully!" })
        setTimeout(() => {
          router.push("/dashboard/transactions")
        }, 1500)
      } else {
        const errorData = await res.json().catch(() => ({ message: "Failed to add transaction." }))
        setMessage({ type: "error", text: errorData.message || "Failed to add transaction." })
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while adding the transaction." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentDate = new Date().toISOString().split("T")[0]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <style jsx global>
        {dateInputStyles}
      </style>
      {/* Navigation */}
      <nav className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-md p-2 mr-2">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                  SecureBank
                </span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    href="/dashboard"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/transactions"
                    className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Transactions
                  </Link>
                  <Link
                    href="/dashboard/feedback"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Feedback
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <Link
                href="/"
                className="text-gray-300 hover:bg-red-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="px-4 sm:px-0 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Add New Transaction
              </h1>
              <p className="text-gray-400 mt-1">Create a new financial transaction record</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                href="/dashboard/transactions"
                className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Transactions
              </Link>
            </div>
          </div>
        </div>

        {/* Notification */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-start mx-4 sm:mx-0 ${
              message.type === "success"
                ? "bg-green-900/30 border border-green-700 text-green-400"
                : "bg-red-900/30 border border-red-700 text-red-400"
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {message.type === "success" ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{message.text}</p>
            </div>
            <button
              className="ml-auto flex-shrink-0 -mt-1 -mr-1 p-1 rounded-full hover:bg-gray-800 focus:outline-none"
              onClick={() => setMessage(null)}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Transaction Form */}
        <div className="px-4 sm:px-0">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Field */}
                <div className="space-y-2">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-300">
                    Transaction Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      max={currentDate}
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white shadow-inner [color-scheme:dark]"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <div className="bg-blue-900/30 text-blue-400 w-6 h-6 flex items-center justify-center rounded-full">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                    Description
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      required
                      placeholder="e.g., Salary, Rent Payment, Grocery Shopping"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white shadow-inner"
                    />
                  </div>
                </div>

                {/* Amount Field */}
                <div className="space-y-2">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-300">
                    Amount
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      required
                      min="0.01"
                      step="0.01"
                      placeholder="0.00"
                      value={form.amount}
                      onChange={(e) => setForm({ ...form, amount: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white shadow-inner"
                    />
                  </div>
                </div>

                {/* Transaction Type Field */}
                <div className="space-y-2">
                  <label htmlFor="type" className="block text-sm font-medium text-gray-300">
                    Transaction Type
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                        />
                      </svg>
                    </div>
                    <select
                      id="type"
                      name="type"
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value as "credit" | "debit" })}
                      className="w-full pl-10 pr-10 py-3 bg-gray-700/70 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white shadow-inner appearance-none"
                    >
                      <option value="credit" className="bg-gray-800 text-green-400 py-2">
                        Credit (Money In)
                      </option>
                      <option value="debit" className="bg-gray-800 text-red-400 py-2">
                        Debit (Money Out)
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <div
                        className={`flex items-center justify-center w-6 h-6 rounded-full ${form.type === "credit" ? "bg-green-900/50 text-green-400" : "bg-red-900/50 text-red-400"}`}
                      >
                        {form.type === "credit" ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 11l5-5m0 0l5 5m-5-5v12"
                            />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 13l-5 5m0 0l-5-5m5 5V6"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <div className="flex justify-end space-x-3">
                  <Link
                    href="/dashboard/transactions"
                    className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors duration-200"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 px-6 rounded-lg transition duration-300 shadow-lg shadow-blue-900/30 flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Add Transaction
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Transaction Tips */}
          <div className="mt-8 bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
            <h3 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Transaction Tips
            </h3>
            <ul className="text-xs text-gray-400 space-y-1 ml-6 list-disc">
              <li>Use credit for money coming in (income, deposits, refunds)</li>
              <li>Use debit for money going out (expenses, withdrawals, payments)</li>
              <li>Be specific in your description to easily identify transactions later</li>
              <li>Double-check the amount before submitting to ensure accuracy</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

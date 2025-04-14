"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"

interface Transaction {
  id: number
  date: string
  description: string
  amount: number
  type: "credit" | "debit"
}

interface Feedback {
  id: number
  user: string
  message: string
  date: string
  read: boolean
}

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [username, setUsername] = useState("")

  // Fetch all data on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true)
      await Promise.all([fetchUserSession(), fetchTransactions(), fetchFeedbacks()])
      setIsLoading(false)
    }

    fetchAllData()
  }, [])

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  // Fetch user session data
  const fetchUserSession = async () => {
    try {
      const response = await fetch("/api/get-session")
      const data = await response.json()
      if (data.username) {
        setUsername(data.username)
      }
    } catch (error) {
      console.error("Error fetching user session:", error)
    }
  }

  // Fetch transactions data
  const fetchTransactions = async () => {
    try {
      const response = await fetch("/api/transactions")
      if (!response.ok) {
        console.error("Error fetching transactions:", await response.text())
        return
      }
      const data = await response.json()
      if (Array.isArray(data)) {
        setTransactions(data)
      } else {
        console.error("Unexpected transactions format:", data)
      }
    } catch (error) {
      console.error("Fetch transactions error:", error)
    }
  }

  // Fetch feedback data
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch("/api/feedback")
      if (!response.ok) {
        console.error("Error fetching feedbacks:", await response.text())
        return
      }
      const data = await response.json()
      if (Array.isArray(data.feedbacks)) {
        setFeedbacks(data.feedbacks)
      } else {
        console.error("Unexpected feedback format:", data)
      }
    } catch (error) {
      console.error("Fetch feedbacks error:", error)
    }
  }

  // Calculate account data from transactions
  const totalIncome = transactions.filter((t) => t.type === "credit").reduce((sum, t) => sum + t.amount, 0) || 0
  const totalExpenses = transactions.filter((t) => t.type === "debit").reduce((sum, t) => sum + t.amount, 0) || 0
  const accountBalance = totalIncome - totalExpenses
  const availableCredit = 50000 // Default value

  // Calculate credit utilization percentage
  const creditUtilizationPercentage = availableCredit > 0 ? (accountBalance / availableCredit) * 100 : 0

  // Get recent transactions (last 2)
  const recentTransactions = transactions.slice(0, 2)

  // Count unread feedback
  const unreadFeedbackCount = feedbacks.filter((f) => !f.read).length

  // Get latest feedback message
  const latestFeedback = feedbacks.length > 0 ? feedbacks[0] : null

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  // AnimatedCounter component
  interface AnimatedCounterProps {
    endValue: number;
    suffix?: string;
    color: string;
    label: string;
  }

  function AnimatedCounter({ endValue, suffix = "", color, label }: AnimatedCounterProps) {
    const [count, setCount] = useState(0)
    const countRef = useRef(null)

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            animateCount()
            observer.disconnect()
          }
        },
        { threshold: 0.1 },
      )

      if (countRef.current) {
        observer.observe(countRef.current)
      }

      return () => {
        if (countRef.current) {
          observer.disconnect()
        }
      }
    }, [])

    const animateCount = () => {
      let start = 0
      const duration = 2000 // 2 seconds
      const step = endValue / (duration / 16) // 16ms per frame (approx 60fps)

      const updateCount = () => {
        start += step
        if (start < endValue) {
          setCount(Math.floor(start))
          requestAnimationFrame(updateCount)
        } else {
          setCount(endValue)
        }
      }

      requestAnimationFrame(updateCount)
    }

    return (
      <div ref={countRef} className="p-3 bg-gray-900/70 rounded-lg hover:bg-gray-900 transition-colors duration-300">
        <p className={`text-2xl font-bold ${color}`}>
          {count}
          {suffix}
        </p>
        <p className="text-xs text-gray-400 mt-1">{label}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
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
                    className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/transactions"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Transactions
                  </Link>
                  <Link
                    href="/dashboard/feedback"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Feedback
                  </Link>
                  <Link
                    href="/help-faq"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Help & FAQ
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <p className="text-sm text-gray-300">
                  {`${currentTime.getMonth() + 1}/${currentTime.getDate()}/${currentTime.getFullYear()}`}
                </p>
                <p className="text-xs text-gray-400">
                  {`${currentTime.getHours() % 12 || 12}:${String(currentTime.getMinutes()).padStart(2, "0")} ${
                    currentTime.getHours() >= 12 ? "PM" : "AM"
                  }`}
                </p>
              </div>
              <button
                onClick={async () => {
                  await fetch("/api/logout", { method: "POST" })
                  window.location.href = "/"
                }}
                className="text-gray-300 hover:bg-red-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="mb-6 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-900 p-4 rounded shadow-sm text-sm font-medium">
        NOTICE: Scheduled maintenance every <strong>Wednesday</strong> from <strong>1:00 AM</strong> to <strong>8:00 AM</strong>. During this time, certain operations may be temporarily unavailable.
      </div>
        <div className="px-4 sm:px-0 mb-8">
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl shadow-2xl">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 mix-blend-multiply" />
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900/80 to-transparent" />
            </div>
            <div className="relative px-8 py-10 sm:px-12 sm:py-16">
              <div className="md:w-2/3">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-700/60 text-blue-100 mb-4 backdrop-blur-sm">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Welcome {username ? `back, ${username}` : "to SecureBank"}
                </div>
                <h1 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
                  Banking Reimagined for the Digital Age🔐
                </h1>
                <p className="text-lg text-blue-100 mb-6 max-w-xl">
                  Experience the future of secure banking with our cutting-edge platform designed to protect your
                  financial journey.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/dashboard/transactions"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    View Transactions
                  </Link>
                  <Link
                    href="/dashboard/feedback"
                    className="inline-flex items-center px-4 py-2 border border-blue-300/30 text-base font-medium rounded-md text-blue-100 bg-transparent hover:bg-blue-700/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    Send Feedback
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-0 mb-8">
              {/* Account Balance */}
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm overflow-hidden shadow-lg rounded-xl border border-gray-700 transition-all duration-300 hover:shadow-blue-900/20 hover:shadow-xl group flex flex-col">
                <div className="px-6 py-6 flex-grow">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-400 truncate">Account Balance</dt>
                        <dd>
                          <div className="text-2xl font-bold text-white">{formatCurrency(accountBalance)}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700/50">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Available Credit</span>
                      <span className="text-xs font-medium text-gray-300">{formatCurrency(availableCredit)}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1.5">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full"
                        style={{ width: `${Math.min(creditUtilizationPercentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800/80 px-6 py-4 mt-auto">
                  <div className="text-sm">
                    <Link
                      href="/dashboard/transactions"
                      className="font-medium text-blue-400 hover:text-blue-300 flex items-center"
                    >
                      View all transactions
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm overflow-hidden shadow-lg rounded-xl border border-gray-700 transition-all duration-300 hover:shadow-green-900/20 hover:shadow-xl group flex flex-col">
                <div className="px-6 py-6 flex-grow">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-gradient-to-br from-green-500 to-green-700 rounded-lg p-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-400 truncate">Recent Transactions</dt>
                        <dd>
                          <div className="text-2xl font-bold text-white">{transactions.length} total</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2.5">
                    {recentTransactions.length > 0 ? (
                      recentTransactions.map((transaction) => (
                        <div key={transaction.id} className="flex justify-between items-center text-xs">
                          <div className="flex items-center">
                            <div
                              className={`w-2 h-2 rounded-full ${transaction.type === "credit" ? "bg-green-400" : "bg-red-400"} mr-2`}
                            ></div>
                            <span className="text-gray-300">{transaction.description}</span>
                          </div>
                          <span
                            className={
                              transaction.type === "credit" ? "text-green-400 font-medium" : "text-red-400 font-medium"
                            }
                          >
                            {transaction.type === "credit" ? "+" : "-"}
                            {formatCurrency(transaction.amount)}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-400 py-2">No recent transactions</div>
                    )}
                  </div>
                </div>
                <div className="bg-gray-800/80 px-6 py-4 mt-auto">
                  <div className="text-sm">
                    <Link
                      href="/dashboard/transactions"
                      className="font-medium text-green-400 hover:text-green-300 flex items-center"
                    >
                      View all transactions
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Feedback */}
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm overflow-hidden shadow-lg rounded-xl border border-gray-700 transition-all duration-300 hover:shadow-purple-900/20 hover:shadow-xl group flex flex-col">
                <div className="px-6 py-6 flex-grow">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg p-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-400 truncate">New Feedback</dt>
                        <dd>
                          <div className="text-2xl font-bold text-white">{unreadFeedbackCount} unread</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700/50">
                    <div className="text-xs text-gray-400 mb-2">Latest feedback:</div>
                    {latestFeedback ? (
                      <p className="text-sm text-gray-300 italic">
                        "
                        {latestFeedback.message.length > 70
                          ? latestFeedback.message.substring(0, 70) + "..."
                          : latestFeedback.message}
                        "
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No feedback available yet</p>
                    )}
                  </div>
                </div>
                <div className="bg-gray-800/80 px-6 py-4 mt-auto">
                  <div className="text-sm">
                    <Link
                      href="/dashboard/feedback"
                      className="font-medium text-purple-400 hover:text-purple-300 flex items-center"
                    >
                      View all feedback
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Status */}
            <div className="px-4 sm:px-0 mb-8">
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold flex items-center text-white">
                    <svg
                      className="w-5 h-5 mr-2 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    Security Status
                  </h2>
                  <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-xs font-medium">
                    Protected
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-800/70 rounded-lg p-4 border border-gray-700 hover:border-green-500/30 transition-colors duration-300">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-green-900/30 rounded-md mr-3">
                        <svg
                          className="w-5 h-5 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-md font-medium text-white">2FA Enabled</h3>
                    </div>
                    <p className="text-sm text-gray-400">Your account is protected with two-factor authentication.</p>
                  </div>

                  <div className="bg-gray-800/70 rounded-lg p-4 border border-gray-700 hover:border-yellow-500/30 transition-colors duration-300">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-yellow-900/30 rounded-md mr-3">
                        <svg
                          className="w-5 h-5 text-yellow-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-md font-medium text-white">Password Strength</h3>
                    </div>
                    <p className="text-sm text-gray-400">Your password was last updated 30 days ago.</p>
                  </div>

                  <div className="bg-gray-800/70 rounded-lg p-4 border border-gray-700 hover:border-blue-500/30 transition-colors duration-300">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-blue-900/30 rounded-md mr-3">
                        <svg
                          className="w-5 h-5 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                          />
                        </svg>
                      </div>
                      <h3 className="text-md font-medium text-white">Activity Logs</h3>
                    </div>
                    <p className="text-sm text-gray-400">
                      Last login: Today at{" "}
                      {`${currentTime.getHours() % 12 || 12}:${String(currentTime.getMinutes()).padStart(2, "0")} ${
                        currentTime.getHours() >= 12 ? "PM" : "AM"
                      }`}{" "}
                      from your usual device.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* About SecureBank Section */}
            <div className="px-4 py-6 sm:px-0">
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-lg">
                <h2 className="text-xl font-bold mb-6 flex items-center text-white">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  About SecureBank
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/70 p-5 rounded-lg border border-gray-700 hover:border-blue-500/30 transition-colors duration-300 hover:shadow-lg">
                    <h3 className="text-md font-medium mb-3 text-white flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      Our Mission
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      At SecureBank, our mission is to provide the most secure and reliable banking experience for our
                      customers. We combine cutting-edge technology with exceptional customer service to protect your
                      financial assets and help you achieve your financial goals.
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-600">
                      <p className="text-gray-400 text-sm italic">
                        "Security isn't just a feature - it's the foundation of everything we do."
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-800/70 p-5 rounded-lg border border-gray-700 hover:border-green-500/30 transition-colors duration-300 hover:shadow-lg">
                    <h3 className="text-md font-medium mb-3 text-white flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      Security Features
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <svg
                          className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">
                          End-to-end encryption for all transactions and communications
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">Multi-factor authentication and biometric verification</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">Real-time fraud detection and prevention systems</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">24/7 security monitoring and instant alerts</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 bg-gray-800/70 p-5 rounded-lg border border-gray-700 hover:border-purple-500/30 transition-colors duration-300 hover:shadow-lg">
                  <h3 className="text-md font-medium mb-4 text-white flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                    Our Global Presence
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <AnimatedCounter endValue={25} suffix="+" color="text-blue-400" label="Countries" />
                    <AnimatedCounter endValue={150} suffix="+" color="text-green-400" label="Branches" />
                    <AnimatedCounter endValue={2} suffix="M+" color="text-purple-400" label="Customers" />
                    <AnimatedCounter endValue={24} suffix="/7" color="text-yellow-400" label="Support" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="bg-gray-800/60 backdrop-blur-sm border-t border-gray-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Contributors</h3>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-2">
              <a
                href="https://www.linkedin.com/in/sunny-patel-30b460204/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Sunny Patel
              </a>
              <span className="text-gray-400">Daniyal Lilani</span>
              <span className="text-gray-400">Robert Pianezza</span>
              <span className="text-gray-400">Rija Baig</span>
              <span className="text-gray-400">Ajay Ariaran</span>
            </div>
            <p className="text-gray-500 text-xs">© {new Date().getFullYear()} SecureBank. All rights reserved.</p>
          </div>
      
        </div>
      </footer>
    </div>
  )
}

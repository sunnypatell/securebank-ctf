"use client"

import Link from "next/link"
import type React from "react"
import { useState, useEffect } from "react"

interface Feedback {
  id: number
  user: string
  message: string
  date: string
  read: boolean
}

export default function Feedback() {
  const [user, setUser] = useState("")
  const [role, setRole] = useState("") // Store user role
  const [message, setMessage] = useState("")
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])

  useEffect(() => {
    fetchUserSession()
    fetchFeedbacks()
  }, [])

  // Fetch logged-in user and role from session
  const fetchUserSession = async () => {
    try {
      const response = await fetch("/api/get-session")
      const data = await response.json()
      if (data.username) {
        setUser(data.username)
        setRole(data.role) // Store role
      } else {
        console.error("No user session found")
      }
    } catch (error) {
      console.error("Error fetching user session:", error)
    }
  }

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
      console.error("Fetch error:", error)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!user) {
      alert("Error: No logged-in user found.")
      return
    }

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, message }),
      })

      if (!response.ok) {
        console.error("Error submitting feedback:", await response.text())
        alert("Error submitting feedback.")
        return
      }

      const data = await response.json()
      alert(data.message)

      setMessage("") // Clear message field
      fetchFeedbacks() // Refresh feedback list
    } catch (error) {
      console.error("Submit error:", error)
      alert("An error occurred while submitting feedback.")
    }
  }

  // Handle delete feedback (Admins only)
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch("/api/feedback", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        console.error("Error deleting feedback:", await response.text())
        return
      }

      fetchFeedbacks() // Refresh the list
    } catch (error) {
      console.error("Delete error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
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
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Transactions
                  </Link>
                  <Link
                    href="/dashboard/feedback"
                    className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Feedback
                  </Link>
                </div>
              </div>
            </div>
            <Link
              href="/"
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
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          Customer Feedback
        </h1>

        <div className="mb-8 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-lg font-medium mb-4 flex items-center">
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
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            Leave Feedback
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Your Message
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white shadow-inner"
                  placeholder="Share your thoughts about our services..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-xl transition duration-300 shadow-lg shadow-blue-900/30 flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Submit Feedback
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium flex items-center mb-4">
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
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
            Recent Feedback
          </h2>

          {feedbacks.length === 0 ? (
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 text-center text-gray-400">
              No feedback available yet. Be the first to leave feedback!
            </div>
          ) : (
            feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition-colors duration-300"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center">
                      <div className="bg-blue-600/20 p-2 rounded-full mr-3">
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <span className="font-medium text-lg">{feedback.user}</span>
                    </div>
                    <p className="text-gray-300 pl-10">{feedback.message}</p>
                    <p className="text-gray-400 text-sm pl-10 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {new Date(feedback.date).toLocaleString()}
                    </p>
                  </div>
                  {role === "admin" && (
                    <button
                      onClick={() => handleDelete(feedback.id)}
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3 py-2 rounded-lg transition-colors duration-200 flex items-center shadow-lg"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}


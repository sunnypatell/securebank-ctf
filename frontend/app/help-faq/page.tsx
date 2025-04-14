"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export default function HelpFAQ() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  // Easter egg - only appears after scrolling to bottom
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled to bottom
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        setShowEasterEgg(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const faqCategories = [
    { id: "account", label: "Account Access", icon: "user" },
    { id: "transactions", label: "Transactions", icon: "credit-card" },
    { id: "feedback", label: "Feedback System", icon: "message-circle" },
    { id: "security", label: "Security", icon: "shield" },
  ]

  const faqItems = [
    {
      id: 1,
      category: "account",
      question: "How do I log in to my SecureBank account?",
      answer:
        "To log in to your SecureBank account, visit the login page and enter your username and password. Our system will authenticate your credentials and direct you to your personalized dashboard upon successful login.",
    },
    {
      id: 2,
      category: "account",
      question: "How do I register for a new account?",
      answer:
        "To register for a new account, click on the 'Register' button on our homepage. You'll need to create a username and password. Make sure to choose a strong password for optimal security.",
    },
    {
      id: 3,
      category: "account",
      question: "What should I do if I can't access my account?",
      answer:
        "If you're having trouble accessing your account, double-check that you're entering the correct username and password. Remember that passwords are case-sensitive. If you continue to experience issues, please contact our support team.",
    },
    {
      id: 4,
      category: "transactions",
      question: "How do I view my transaction history?",
      answer:
        "You can view your transaction history by navigating to the Transactions page from your dashboard. This page displays all your past transactions, including dates, descriptions, and amounts. You can also search for specific transactions using the search field.",
    },
    {
      id: 5,
      category: "transactions",
      question: "How do I add a new transaction?",
      answer:
        "To add a new transaction, go to the Transactions page and click on the 'Add Transaction' button. Fill in the required details including date, description, amount, and transaction type (credit or debit). Click 'Add Transaction' to save your entry.",
    },
    {
      id: 6,
      category: "transactions",
      question: "What's the difference between credit and debit transactions?",
      answer:
        "Credit transactions represent money coming into your account (deposits, income, refunds), while debit transactions represent money going out of your account (payments, withdrawals, expenses).",
    },
    {
      id: 7,
      category: "feedback",
      question: "How do I submit feedback?",
      answer:
        "To submit feedback, navigate to the Feedback page from your dashboard. Type your message in the text area provided and click the 'Submit Feedback' button. Your feedback will be recorded and visible in the feedback history section.",
    },
    {
      id: 8,
      category: "feedback",
      question: "Can I see feedback from other users?",
      answer:
        "Yes, all user feedback is visible in the feedback section. You can view messages from other users along with the date they were submitted.",
    },
    {
      id: 9,
      category: "security",
      question: "How secure is my data with SecureBank?",
      answer:
        "SecureBank employs industry-standard security measures to protect your data. Our platform uses encryption for all sensitive information and implements strict access controls to prevent unauthorized access.",
    },
    {
      id: 10,
      category: "security",
      question: "What security features does SecureBank offer?",
      answer:
        "SecureBank offers several security features including secure login protocols, transaction monitoring, and regular security updates. Our dashboard also displays your last login time to help you monitor account access.",
    },
    {
      id: 11,
      category: "security",
      question: "How can I ensure my account remains secure?",
      answer:
        "To keep your account secure, we recommend using a strong, unique password, logging out after each session, and regularly checking your transaction history for any unauthorized activity.",
    },
  ]

  // Filter FAQs based on active category and search query
  const filteredFaqs = faqItems.filter(
    (faq) =>
      (activeCategory === "all" || faq.category === activeCategory) &&
      (searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Function to render the appropriate icon
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "user":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        )
      case "credit-card":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        )
      case "message-circle":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )
      case "shield":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        )
      default:
        return null
    }
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
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Feedback
                  </Link>
                  <Link
                    href="/help-faq"
                    className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Help & FAQ
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
        {/* Hero Section */}
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Help Center
                </div>
                <h1 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">How can we help you today? 🤔</h1>
                <p className="text-lg text-blue-100 mb-6 max-w-xl">
                  Find answers to common questions about your SecureBank account, transactions, and more.
                </p>

                {/* Search Bar */}
                <div className="relative max-w-lg">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white shadow-inner"
                    placeholder="Search for answers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="px-4 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Category Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-lg font-semibold text-white">Categories</h2>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => setActiveCategory("all")}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center mb-1 transition-colors ${
                      activeCategory === "all" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700/70"
                    }`}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    All Topics
                  </button>

                  {faqCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center mb-1 transition-colors ${
                        activeCategory === category.id ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700/70"
                      }`}
                    >
                      <span className="mr-3">{renderIcon(category.icon)}</span>
                      {category.label}
                    </button>
                  ))}
                </div>

                {/* Quick Help Box */}
                <div className="p-4 mt-4 bg-gradient-to-br from-blue-900/40 to-indigo-900/40 mx-2 mb-2 rounded-lg border border-blue-800/50">
                  <h3 className="font-medium text-blue-300 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Quick Tips
                  </h3>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-blue-400 mt-0.5 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Check your transaction history regularly</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-blue-400 mt-0.5 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Submit feedback to help us improve</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-blue-400 mt-0.5 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Always log out when finished</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="md:col-span-3">
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Frequently Asked Questions
                </h2>

                {searchQuery && filteredFaqs.length === 0 ? (
                  <div className="text-center py-8">
                    <svg
                      className="w-12 h-12 mx-auto text-gray-500 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-gray-400 text-lg mb-2">No results found</p>
                    <p className="text-gray-500 mb-4">We couldn't find any FAQs matching "{searchQuery}"</p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Clear search
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredFaqs.map((faq) => (
                      <div
                        key={faq.id}
                        className={`border ${
                          expandedFaq === faq.id ? "border-blue-500/50" : "border-gray-700"
                        } rounded-xl overflow-hidden transition-all duration-200 hover:border-blue-500/30`}
                      >
                        <button
                          className="w-full text-left p-5 flex justify-between items-center bg-gray-800/50"
                          onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                        >
                          <span className="font-medium text-white">{faq.question}</span>
                          <svg
                            className={`w-5 h-5 text-blue-400 transition-transform duration-200 ${
                              expandedFaq === faq.id ? "transform rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-200 ${
                            expandedFaq === faq.id ? "max-h-96" : "max-h-0"
                          }`}
                        >
                          <div className="p-5 bg-gray-800/30 text-gray-300 border-t border-gray-700">{faq.answer}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Easter Egg - Hidden comment about SQL injection */}
                {showEasterEgg && (
                  <div className="mt-8 p-4 border border-gray-700 rounded-lg bg-gray-800/30 text-xs text-gray-500 font-mono">
                    {/* This looks like a developer comment that was accidentally left in */}
                    <p className="mb-2">{`<!-- TODO: Fix security issues before production release -->`}</p>
                    <p className="mb-2">
                      {`<!-- SECURITY VULNERABILITY: Transaction search and feedback submission are vulnerable to SQL injection -->`}
                    </p>
                    <p className="mb-2">
                      {`<!-- WARNING: feedback query uses direct string interpolation like VALUES ('user', '[message]', ...)... character termination like "x'," without the double quotes is found at the start of the queries. (SQL QUOTE CONTEXT REVEAL) -->`}
                    </p>
                    <p className="mb-2">
                      {`<!-- SECURITY NOTE: role-based access is checked through signed cookies and is only refreshed at login -->`}
                    </p>
                  </div>
                )}
              </div>

              {/* Additional Help Resources */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg p-6 hover:border-green-500/30 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-green-900/30 rounded-lg mr-4">
                      <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-white">Security Tips</h3>
                  </div>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Use a strong, unique password for your banking account</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Always log out when you're finished using SecureBank</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Regularly check your transaction history for unauthorized activity</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg p-6 hover:border-purple-500/30 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-purple-900/30 rounded-lg mr-4">
                      <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-white">Feedback System</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Your feedback helps us improve SecureBank. Visit the Feedback page to share your thoughts or
                    suggestions about our services.
                  </p>
                  <Link
                    href="/dashboard/feedback"
                    className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Go to Feedback
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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

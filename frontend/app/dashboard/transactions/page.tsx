"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"

const formatCurrency = (value: number): string => { // helper func. to format currently with ','.
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value)
}

export default function Transactions() {
  type Transaction = {
    id: number
    date: string
    description: string
    amount: number
    type: "credit" | "debit"
    username: string
    userId: string
  }

  const [search, setSearch] = useState("")
  const [transactions, setTransactions] = useState<Transaction[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [dateFilter, setDateFilter] = useState("all")

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 5 rows per page of transactions

  useEffect(() => { //sets the page to 1 when the search or date filter changes
    setCurrentPage(1);
  }, [search, dateFilter]);
  


  const fetchTransactions = async (query?: string) => {
    setIsLoading(true)
    try {
      const url = query ? `/api/transactions?search=${encodeURIComponent(query)}` : "/api/transactions"
      const res = await fetch(url)
      const data = await res.json()
      setTransactions(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("API Error:", error)
      setTransactions([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!search.trim()) {
      fetchTransactions()
    } else {
      fetchTransactions(search)
    }
  }

  // Helper function to filter transactions based on selected date range
const filterByDateRange = (transactions: Transaction[]): Transaction[] => {
  const now = new Date(); // current date

  switch (dateFilter) {
    case "7days":
      // Keep only transactions from the last 7 days
      return transactions.filter(t => new Date(t.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    case "30days":
      // Keep only transactions from the last 30 days
      return transactions.filter(t => new Date(t.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    case "90days":
      // Keep only transactions from the last 90 days
      return transactions.filter(t => new Date(t.date) >= new Date(Date.now() - 90 * 24 * 60 * 60 * 1000));
    default:
      // If "all", return everything
      return transactions;
  }
};

// Apply the date range filter to the transaction list
const filteredTransactions = filterByDateRange(transactions || []);

// Vars. to see how many pages are necessary
const indexOfLastItem = currentPage * itemsPerPage; 
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);


// Summary card totals based only on filtered transactions
const totalIncome = filteredTransactions
  .filter(t => t.type === "credit")
  .reduce((sum, t) => sum + t.amount, 0);

const totalExpenses = filteredTransactions
  .filter(t => t.type === "debit")
  .reduce((sum, t) => sum + t.amount, 0);

const netBalance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
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
                  <Link
                    href="/help-faq"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
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

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Page Header */}
        {/* Maintenance Warning */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-yellow-900/30 text-yellow-300 border border-yellow-600 rounded-lg p-4 shadow-sm flex items-start space-x-3">
            <svg className="w-5 h-5 mt-0.5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <div className="text-sm">
              <p className="font-medium">Scheduled Maintenance</p>
              <p className="text-yellow-200 mt-0.5">Every Wednesday from 1:00 AM to 8:00 AM. Some features may be temporarily unavailable.</p>
            </div>
          </div>
        </div>
        <div className="px-4 sm:px-0 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mt-8">  
              
              </div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Transaction History
              </h1>
              <p className="text-gray-400 mt-1">View and search your recent financial activities</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => fetchTransactions()}
                className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="px-4 sm:px-0 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Income Card */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700 p-4 shadow-lg hover:shadow-green-900/10 hover:border-green-500/30 transition-all duration-300">
              <div className="flex items-center">
                <div className="p-3 bg-green-900/30 rounded-lg mr-4">
                  <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Income</p>
                  <p className="text-2xl font-bold text-green-400">{formatCurrency(totalIncome)}</p>
                </div>
              </div>
            </div>

            {/* Expenses Card */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700 p-4 shadow-lg hover:shadow-red-900/10 hover:border-red-500/30 transition-all duration-300">
              <div className="flex items-center">
                <div className="p-3 bg-red-900/30 rounded-lg mr-4">
                  <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-400">{formatCurrency(totalExpenses)}</p>
                </div>
              </div>
            </div>

            {/* Balance Card */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700 p-4 shadow-lg hover:shadow-blue-900/10 hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-center">
                <div className="p-3 bg-blue-900/30 rounded-lg mr-4">
                  <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Net Balance</p>
                  <p className={`text-2xl font-bold ${netBalance >= 0 ? "text-blue-400" : "text-red-400"}`}>
                    {formatCurrency(netBalance)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="mb-6 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">
                Search Transactions
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  id="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white shadow-inner"
                  placeholder="Search by description..."
                />
              </div>
            </div>
            <div className="w-full md:w-1/4">
              <label htmlFor="date-filter" className="block text-sm font-medium text-gray-300 mb-2">
                Date Range
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
                <select
                  id="date-filter"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white shadow-inner appearance-none"
                >
                  <option value="all">All time</option>
                  <option value="7days">Last 7 days</option>
                  <option value="30days">Last 30 days</option>
                  <option value="90days">Last 90 days</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-auto self-end">
              <button
                type="submit"
                className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-xl transition duration-300 shadow-lg shadow-blue-900/30 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Transactions Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-700">
          {isLoading ? (
            <div className="p-8 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-400">Loading transactions...</p>
            </div>
          ) : transactions && transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700/70">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      User ID
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/70">
                  {currentTransactions.map((txn) => (
                    <tr key={txn.id} className="hover:bg-gray-700/30 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{txn.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{txn.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{txn.userId}</td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${txn.type === "credit" ? "text-green-400" : "text-red-400"}`}
                      >
                        <span className="flex items-center justify-end">
                          {txn.type === "credit" ? (
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 11l5-5m0 0l5 5m-5-5v12"
                              />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 13l-5 5m0 0l-5-5m5 5V6"
                              />
                            </svg>
                          )}
                          {formatCurrency(txn.amount)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            txn.type === "credit" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
                          }`}
                        >
                          {txn.type === "credit" ? "Completed" : "Processed"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <p className="text-gray-400 text-lg">No transactions found</p>
              <p className="text-gray-500 mt-1">Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {transactions && transactions.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing <span className="font-medium text-gray-300">{filteredTransactions.length}</span> transactions
          </div>
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 rounded-md bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>
            <span className="px-3 py-1 rounded-md bg-blue-600 text-white">
              {currentPage}
            </span>
            <button
              className="px-3 py-1 rounded-md bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
              disabled={indexOfLastItem >= filteredTransactions.length}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredTransactions.length / itemsPerPage)))}
            >
              Next
            </button>
          </div>
        </div>
        
        )}
      </main>

      
        {/* Dispute Notice */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-6">
  <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700/50 rounded-xl p-6 shadow-lg backdrop-blur-sm">
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-blue-300 font-medium">
          Notice something unfamiliar?
        </p>
        <p className="mt-1 text-gray-400">
          If you see a charge that doesn't look right, please{" "}
          <Link href="/help-faq" className="text-blue-400 hover:text-blue-300 underline transition-colors">
            dispute it with us
          </Link>
          {" "}or find more information in our{" "}
          <Link href="/help-faq" className="text-blue-400 hover:text-blue-300 underline transition-colors">
            Help & FAQ
          </Link>
          {" "}section.
        </p>
      </div>
    </div>
  </div>
</div>


            {/* Floating Add Transaction Button */}
            <Link href="/dashboard/transactions/new">
        <div className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg cursor-pointer transition duration-200 z-50">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </Link>
    </div>
  )
}

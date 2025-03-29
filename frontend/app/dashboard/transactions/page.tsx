import Link from "next/link"

export default function Transactions() {
  // Sample transaction data
  const transactions = [
    { id: 1, date: "2025-03-15", description: "Deposit", amount: 1500.0, type: "credit" },
    { id: 2, date: "2025-03-14", description: "Withdrawal", amount: 500.0, type: "debit" },
    { id: 3, date: "2025-03-12", description: "Transfer to John", amount: 200.0, type: "debit" },
    { id: 4, date: "2025-03-10", description: "Salary", amount: 3000.0, type: "credit" },
    { id: 5, date: "2025-03-05", description: "Rent Payment", amount: 1200.0, type: "debit" },
  ]

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
                </div>
              </div>
            </div>
            <div>
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
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Transaction History
          </h1>

          {/* Search Form */}
          <div className="mb-6 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700">
            <form className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">
                  Search Transactions
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
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
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white shadow-inner"
                    placeholder="Search by description..."
                  />
                </div>
              </div>
              <div className="w-full md:w-1/4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                  Date Range
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <select
                    id="date"
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white shadow-inner appearance-none"
                  >
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>All time</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Transactions Table */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-700">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700/70">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/70">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-700/30 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{transaction.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{transaction.description}</td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                          transaction.type === "credit" ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        <span className="flex items-center justify-end">
                          {transaction.type === "credit" ? (
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
                                d="M7 11l5-5m0 0l5 5m-5-5v12"
                              />
                            </svg>
                          ) : (
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
                                d="M17 13l-5 5m0 0l-5-5m5 5V6"
                              />
                            </svg>
                          )}
                          ${transaction.amount.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


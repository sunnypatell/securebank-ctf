import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-xl font-bold">SecureBank</span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/dashboard" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/transactions"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Transactions
                  </Link>
                  <Link
                    href="/dashboard/feedback"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Feedback
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <Link
                href="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-700 rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">Welcome, you are now logged in!</h1>
            <p className="text-gray-300">
              This is your secure banking dashboard. You can manage transactions, view feedback, and more.
            </p>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-0">
          {/* Account Balance */}
          <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
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
                      <div className="text-lg font-medium text-white">$24,500.00</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <Link href="/dashboard/transactions" className="font-medium text-blue-400 hover:text-blue-300">
                  View all transactions
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
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
                      <div className="text-lg font-medium text-white">12 this week</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <Link href="/dashboard/transactions" className="font-medium text-blue-400 hover:text-blue-300">
                  View all transactions
                </Link>
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
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
                      <div className="text-lg font-medium text-white">3 unread</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <Link href="/dashboard/feedback" className="font-medium text-blue-400 hover:text-blue-300">
                  View all feedback
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


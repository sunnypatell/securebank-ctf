import Link from "next/link"

export default function Feedback() {
  // Sample feedback data
  const feedbacks = [
    {
      id: 1,
      user: "john_doe",
      date: "2025-03-15",
      message: "The new mobile app is fantastic! Much easier to use than the previous version.",
      read: false,
    },
    {
      id: 2,
      user: "alice_smith",
      date: "2025-03-12",
      message: "I had trouble transferring money to an external account. Could use some improvement.",
      read: false,
    },
    {
      id: 3,
      user: "robert_johnson",
      date: "2025-03-10",
      message: "Customer service was very helpful when I called about my account issue.",
      read: false,
    },
    {
      id: 4,
      user: "emily_wilson",
      date: "2025-03-05",
      message: "Love the new security features! Makes me feel safer using online banking.",
      read: true,
    },
    {
      id: 5,
      user: "michael_brown",
      date: "2025-03-01",
      message: "The website is much faster now after the recent update. Great job!",
      read: true,
    },
  ]

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
                  <Link
                    href="/dashboard"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
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
                    className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
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
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-bold mb-6">Customer Feedback</h1>

          {/* Feedback Form */}
          <div className="mb-6 bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Leave Feedback</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="Share your thoughts about our services..."
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>

          {/* Feedback List */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Recent Feedback</h2>

            {feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className={`bg-gray-800 p-4 rounded-lg shadow border-l-4 ${feedback.read ? "border-gray-600" : "border-blue-500"}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-medium">{feedback.user}</span>
                    <span className="text-gray-400 text-sm ml-2">{feedback.date}</span>
                  </div>
                  {!feedback.read && <span className="bg-blue-500 text-xs px-2 py-1 rounded-full text-white">New</span>}
                </div>
                <p className="text-gray-300">{feedback.message}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}


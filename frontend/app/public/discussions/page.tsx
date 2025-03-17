import Link from "next/link"

export default function PublicDiscussions() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Public Discussions</h1>
            <Link href="/" className="text-blue-400 hover:text-blue-300">
              Back to Home
            </Link>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-center py-8">
              No discussions available yet. Check back later or login to start a discussion.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">SecureBank</h1>
      <p className="text-xl text-gray-300 mb-8">Your Trusted Financial Partner</p>

      <div className="space-y-4 w-full max-w-xs">
        <a href="/login">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md">
            Login
          </button>
        </a>

        <a href="/register">
          <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-md border border-gray-600">
            Get Started
          </button>
        </a>
      </div>
    </main>
  )
}


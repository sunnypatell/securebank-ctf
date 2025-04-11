"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AddTransactionPage() {
  const router = useRouter()
  const [form, setForm] = useState({ date: "", description: "", amount: "", type: "credit" })
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push("/dashboard/transactions")
    } else {
      setMessage("Failed to add transaction.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <button
        onClick={() => router.push("/dashboard/transactions")}
        className="mb-6 text-sm text-blue-400 hover:text-blue-300"
      >
        ← Back to Transactions
      </button>

      <h1 className="text-2xl font-bold mb-4">Add New Transaction</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        <input
          type="date"
          required
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="p-2 bg-gray-800 border border-gray-600 rounded"
        />
        <input
          type="text"
          required
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="p-2 bg-gray-800 border border-gray-600 rounded"
        />
        <input
          type="number"
          required
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="p-2 bg-gray-800 border border-gray-600 rounded"
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value as "credit" | "debit" })}
          className="p-2 bg-gray-800 border border-gray-600 rounded"
        >
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>

        <button
          type="submit"
          className="col-span-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium"
        >
          Add Transaction
        </button>

        {message && <p className="text-red-400 col-span-full">{message}</p>}
      </form>
    </div>
  )
}
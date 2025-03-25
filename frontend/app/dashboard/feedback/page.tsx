"use client"; 

import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Feedback {
  id: number;
  user: string;
  message: string;
  date: string;
  read: boolean;
}

export default function Feedback() {
  const [user, setUser] = useState("");
  const [role, setRole] = useState(""); // Store user role
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    fetchUserSession();
    fetchFeedbacks();
  }, []);

  // Fetch logged-in user and role from session
  const fetchUserSession = async () => {
    try {
      const response = await fetch("/api/get-session");
      const data = await response.json();
      if (data.username) {
        setUser(data.username);
        setRole(data.role); // Store role
      } else {
        console.error("No user session found");
      }
    } catch (error) {
      console.error("Error fetching user session:", error);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch("/api/feedback");
      if (!response.ok) {
        console.error("Error fetching feedbacks:", await response.text());
        return;
      }
      const data = await response.json();
      if (Array.isArray(data.feedbacks)) {
        setFeedbacks(data.feedbacks);
      } else {
        console.error("Unexpected feedback format:", data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      alert("Error: No logged-in user found.");
      return;
    }

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, message }),
      });

      if (!response.ok) {
        console.error("Error submitting feedback:", await response.text());
        alert("Error submitting feedback.");
        return;
      }

      const data = await response.json();
      alert(data.message);

      setMessage(""); // Clear message field
      fetchFeedbacks(); // Refresh feedback list
    } catch (error) {
      console.error("Submit error:", error);
      alert("An error occurred while submitting feedback.");
    }
  };

  // Handle delete feedback (Admins only)
  const handleDelete = async (id: number) => {
    try {
        const response = await fetch("/api/feedback", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        if (!response.ok) {
            console.error("Error deleting feedback:", await response.text());
            return;
        }

        fetchFeedbacks(); // Refresh the list
    } catch (error) {
        console.error("Delete error:", error);
    }
};

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold">SecureBank</span>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                  <Link href="/dashboard/transactions" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Transactions</Link>
                  <Link href="/dashboard/feedback" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Feedback</Link>
                </div>
              </div>
            </div>
            <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Customer Feedback</h1>

        <div className="mb-6 bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Leave Feedback</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Your Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Share your thoughts about our services..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md">
              Submit Feedback
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium">Recent Feedback</h2>
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="bg-gray-800 p-4 rounded-lg shadow border-l-4 border-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-medium">{feedback.user}</span>
                  <p className="text-gray-300">{feedback.message}</p>
                </div>
                {role === "admin" && (
                  <button onClick={() => handleDelete(feedback.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

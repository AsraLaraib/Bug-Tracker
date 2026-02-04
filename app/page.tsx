"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4">
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-green-600 dark:text-green-400">
          Mini Bug Tracker
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-xl mx-auto">
          Submit, track, and manage bugs effortlessly. Perfect for small projects or teams.
        </p>
        <div className="space-x-4">
          <Link
            href="/submit-bug"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Submit a Bug
          </Link>
          <Link
            href="/bug-list"
            className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 dark:hover:bg-gray-800 transition"
          >
            View Bugs
          </Link>
        </div>
      </section>
    </main>
  );
}

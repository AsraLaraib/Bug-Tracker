"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Bug = {
  id: number;
  title: string;
  description: string;
  severity: string;
  status: string;
  url?: string;
  screenshot?: string;
  createdAt: string;
};

export default function AdminPage() {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);

  // Fetch bugs after login
  useEffect(() => {
    if (authorized) {
      fetch("/api/bugs")
        .then((res) => res.json())
        .then((data) => setBugs(data.bugs || []))
        .catch((err) => console.error(err));
    }
  }, [authorized]);

  // Login handler
  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthorized(true);
    } else {
      alert("Incorrect password");
    }
  };

  // Delete bug
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this bug?")) return;

    const res = await fetch(`/api/bugs/${id}`, { method: "DELETE" });
    if (res.ok) {
      setBugs((prev) => prev.filter((b) => b.id !== id));
    } else {
      alert("Failed to delete bug");
    }
  };

  // Update status
  const handleStatusUpdate = async (id: number, status: string) => {
    const nextStatus =
      status === "Open"
        ? "In Progress"
        : status === "In Progress"
        ? "Done"
        : "Open";

    const res = await fetch(`/api/bugs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });

    if (res.ok) {
      setBugs((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, status: nextStatus } : b
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {!authorized ? (
          /* Login */
          <div className="flex flex-col items-center justify-center mt-32">
            <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border px-4 py-2 rounded mb-4 w-72"
            />
            <button
              onClick={handleLogin}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        ) : (
          /* Admin Panel */
          <>
            <h1 className="text-3xl font-bold mb-8 text-center">
              Admin Panel
            </h1>

            {bugs.length === 0 ? (
              <p className="text-center text-gray-500">
                No bugs reported yet.
              </p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {bugs.map((bug) => (
                  <div
                    key={bug.id}
                    className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
                  >
                    {/* Clickable title */}
                    <Link href={`/bug/${bug.id}`}>
                      <h2 className="text-xl font-semibold mb-2 hover:underline cursor-pointer">
                        {bug.title}
                      </h2>
                    </Link>

                    <p className="text-gray-700 mb-3 line-clamp-3">
                      {bug.description}
                    </p>

                    <p className="text-sm text-gray-500 mb-2">
                      Severity: <span className="font-medium">{bug.severity}</span>
                    </p>

                    <p className="text-xs text-gray-400 mb-3">
                      {new Date(bug.createdAt).toLocaleDateString()}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleStatusUpdate(bug.id, bug.status || "Open")
                        }
                        className={`px-3 py-1 rounded text-sm ${
                          bug.status === "Open"
                            ? "bg-gray-300 text-gray-800"
                            : bug.status === "In Progress"
                            ? "bg-blue-500 text-white"
                            : "bg-green-600 text-white"
                        }`}
                      >
                        {bug.status || "Open"}
                      </button>

                      <button
                        onClick={() => handleDelete(bug.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>

                    {/* Links */}
                    {bug.url && (
                      <a
                        href={bug.url}
                        target="_blank"
                        className="text-blue-600 hover:underline text-sm block mt-2"
                      >
                        Related URL
                      </a>
                    )}
                    {bug.screenshot && (
                      <a
                        href={bug.screenshot}
                        target="_blank"
                        className="text-blue-600 hover:underline text-sm block mt-1"
                      >
                        Screenshot
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Bug = {
  id: number;
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Done";
  url?: string;
  screenshot?: string;
};

export default function BugListPage() {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/bugs")
      .then((res) => res.json())
      .then((data) => setBugs(data.bugs || []))
      .catch((err) => console.error("Error fetching bugs:", err));
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-red-100 text-red-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Done":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-6 text-center">
        All Bugs
      </h1>

      {bugs.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300 text-center">
          No bugs submitted yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bugs.map((bug) => (
            <div
              key={bug.id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex flex-col justify-between cursor-pointer hover:shadow-md transition"
              onClick={() => router.push(`/bug/${bug.id}`)} // Navigate to detail page
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {bug.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  {bug.description.length > 100
                    ? bug.description.slice(0, 100) + "..."
                    : bug.description}
                </p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${getSeverityColor(
                    bug.severity
                  )}`}
                >
                  {bug.severity}
                </span>
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(
                    bug.status
                  )}`}
                >
                  {bug.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

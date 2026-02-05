"use client";

import { useState } from "react";

export default function SubmitBugPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("Low");
  const [url, setUrl] = useState("");
  const [screenshot, setScreenshot] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/bugs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, severity, url, screenshot }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Bug submitted successfully!");
        setTitle("");
        setDescription("");
        setSeverity("Low");
        setUrl("");
        setScreenshot("");
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while submitting the bug.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gray-900">
      <form className="bg-gray-800 text-gray-100 p-6 rounded shadow-md w-full max-w-md space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-green-400 mb-4">Submit a Bug</h1>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md bg-gray-700 border border-gray-600 text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md bg-gray-700 border border-gray-600 text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          className="w-full rounded-md bg-gray-700 border border-gray-600 text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input
          type="url"
          placeholder="Related URL (optional)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded-md bg-gray-700 border border-gray-600 text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="url"
          placeholder="Screenshot URL (optional)"
          value={screenshot}
          onChange={(e) => setScreenshot(e.target.value)}
          className="w-full rounded-md bg-gray-700 border border-gray-600 text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? "Submitting..." : "Submit Bug"}
        </button>
      </form>
    </main>
  );
}

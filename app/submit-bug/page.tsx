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
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-green-600 mb-4">Submit a Bug</h1>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          className="w-full border px-3 py-2 rounded"
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
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="url"
          placeholder="Screenshot URL (optional)"
          value={screenshot}
          onChange={(e) => setScreenshot(e.target.value)}
          className="w-full border px-3 py-2 rounded"
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

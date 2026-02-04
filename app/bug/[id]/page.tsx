import { prisma } from "@/lib/prisma";

type Bug = {
  id: number;
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Done";
  url?: string;
  screenshot?: string;
  createdAt: string;
};

interface PageProps {
  params: {
    id: string;
  };
}

export default async function BugDetailPage({ params }: PageProps) {
  // UNWRAP id from params directly
  const id = Number(params.id);

  if (!id) {
    return <p className="p-6 text-red-600">Invalid bug ID.</p>;
  }

  const bug = await prisma.bug.findUnique({
    where: { id },
  });

  if (!bug) {
    return <p className="p-6 text-red-600">Bug not found.</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-12">
      <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
        {bug.title}
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{bug.description}</p>

      <div className="flex gap-4 mb-4">
        <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-medium">
          Severity: {bug.severity}
        </span>
        <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-medium">
          Status: {bug.status}
        </span>
      </div>

      {bug.url && (
        <a
          href={bug.url}
          target="_blank"
          className="text-blue-600 dark:text-blue-400 hover:underline block mb-2"
        >
          Related URL
        </a>
      )}
      {bug.screenshot && (
        <img
          src={bug.screenshot}
          alt="Screenshot"
          className="mt-2 rounded border dark:border-gray-700 max-w-full"
        />
      )}

      <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm">
        Submitted on: {new Date(bug.createdAt).toLocaleString()}
      </p>
    </main>
  );
}

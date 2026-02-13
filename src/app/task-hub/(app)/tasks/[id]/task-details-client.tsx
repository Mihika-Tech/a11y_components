"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TaskDetailsClient({ id }: { id: string }) {
  const router = useRouter();

  // Placeholder: dynamic task data is runtime-only for GitHub Pages.
  // You can re-connect localStorage store after export passes.
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Task details</h2>
          <p className="mt-1 text-sm text-mutedFg">
            Task id: <span className="font-medium text-fg">{id}</span>
          </p>
          <p className="mt-3 text-sm text-mutedFg">
            This page is statically exported for GitHub Pages. Task data is loaded on the client at runtime.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-md border border-border bg-card px-3 py-2 text-sm hover:bg-muted"
            onClick={() => router.push("/a11y_components/task-hub/dashboard")}
          >
            Back to dashboard
          </button>

          <Link
            className="rounded-md border border-border bg-card px-3 py-2 text-sm hover:bg-muted"
            href="/a11y_components/task-hub/tasks/new"
          >
            Create task
          </Link>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-border bg-card p-4">
        <div className="text-sm font-medium">Next steps</div>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-mutedFg">
          <li>After export succeeds, reconnect this page to your existing task store.</li>
          <li>Handle missing tasks with an empty state and a link back to dashboard.</li>
          <li>Optional: add tabs and activity feed using your existing Tabs component API.</li>
        </ul>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { hasSession, setSession } from "@/lib/task-hub/storage";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function TaskHubAppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (!hasSession()) {
      router.replace("/task-hub/login");
      return;
    }
    setReady(true);
  }, [router, pathname]);

  if (!ready) {
    return (
      <main id="main" className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-lg border border-border bg-card p-5 shadow-soft">
          <div className="text-sm text-mutedFg">Loading…</div>
        </div>
      </main>
    );
  }

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Accessible Task Hub</h1>
          <p className="mt-1 text-sm text-mutedFg">Demo app that proves real flows with accessible components.</p>
        </div>

        <div className="flex items-center gap-3">
          <nav className="flex gap-3 text-sm">
            <a className="text-mutedFg hover:text-fg" href="/task-hub/dashboard">Dashboard</a>
            <Link className="text-mutedFg hover:text-fg" href="/task-hub/tasks/new">Create</Link>
            <a className="text-mutedFg hover:text-fg" href="/task-hub/settings">Settings</a>
          </nav>
          <Button
            variant="secondary"
            onClick={() => {
              setSession(false);
              router.replace("/task-hub/login");
            }}
          >
            Sign out
          </Button>
        </div>
      </div>

      <div className="mt-6">{children}</div>
    </main>
  );
}

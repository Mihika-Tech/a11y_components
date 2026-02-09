"use client";

import * as React from "react";
import { DocsShell } from "@/components/patterns/docs/docs-shell";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";

export default function DrawerDocs() {
  const [open, setOpen] = React.useState(false);

  return (
    <DocsShell title="Drawer" description="Sheet style drawer with focus trap and restore focus.">
      <div className="rounded-lg border border-border bg-card p-4 shadow-soft">
        <Button onClick={() => setOpen(true)}>Open drawer</Button>
      </div>

      <Drawer open={open} onOpenChange={setOpen} title="Filters">
        <p className="text-sm text-mutedFg">This drawer traps focus and closes with Escape.</p>
        <div className="mt-3">
          <label className="text-sm font-medium" htmlFor="drawer-input">
            Example input
          </label>
          <input
            id="drawer-input"
            className="mt-1 w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
            placeholder="Focusable input"
          />
        </div>
      </Drawer>

      <h2 className="mt-6 text-lg font-semibold">Keyboard interactions</h2>
      <ul className="list-disc space-y-1 pl-5 text-sm text-mutedFg">
        <li>Escape closes the drawer.</li>
        <li>Tab and Shift+Tab cycle inside the drawer.</li>
        <li>On close, focus returns to the trigger.</li>
      </ul>
    </DocsShell>
  );
}

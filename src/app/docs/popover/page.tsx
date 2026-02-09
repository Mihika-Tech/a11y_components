"use client";

import * as React from "react";
import { DocsShell } from "@/components/patterns/docs/docs-shell";
import { Popover, PopoverItem } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function PopoverDocs() {
  const [open, setOpen] = React.useState(false);

  return (
    <DocsShell title="Popover" description="Menu style popover with keyboard navigation and escape close.">
      <div className="rounded-lg border border-border bg-card p-4 shadow-soft">
        <Popover
          open={open}
          onOpenChange={setOpen}
          trigger={(props) => (
            <Button variant="secondary" {...props}>
              Open menu
            </Button>
          )}
        >
          <PopoverItem onSelect={() => setOpen(false)}>First action</PopoverItem>
          <PopoverItem onSelect={() => setOpen(false)}>Second action</PopoverItem>
          <PopoverItem danger onSelect={() => setOpen(false)}>
            Destructive action
          </PopoverItem>
        </Popover>
      </div>

      <h2 className="mt-6 text-lg font-semibold">Keyboard interactions</h2>
      <ul className="list-disc space-y-1 pl-5 text-sm text-mutedFg">
        <li>Enter or Space opens the menu.</li>
        <li>Arrow keys move between items.</li>
        <li>Home and End jump to first or last item.</li>
        <li>Escape closes and restores focus to the trigger.</li>
      </ul>

      <h2 className="mt-6 text-lg font-semibold">ARIA notes</h2>
      <ul className="list-disc space-y-1 pl-5 text-sm text-mutedFg">
        <li>Trigger uses aria-haspopup and aria-expanded.</li>
        <li>Menu uses role menu and items use role menuitem.</li>
      </ul>
    </DocsShell>
  );
}

"use client";

import * as React from "react";
import { DocsShell } from "@/components/patterns/docs/docs-shell";
import { PropsTable } from "@/components/patterns/docs/props-table";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

export default function ModalDocs() {
  const [open, setOpen] = React.useState(false);

  return (
    <DocsShell title="Modal" description="Focus trap, restore focus, escape close, and labeled dialog.">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Example</h2>

        <div className="rounded-lg border border-border bg-card p-4 shadow-soft">
          <Button onClick={() => setOpen(true)}>Open modal</Button>
        </div>

        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Confirm action"
          description="This dialog traps focus and restores focus when it closes."
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </>
          }
        >
          <p className="text-sm text-mutedFg">
            Try keyboard navigation. Tab should stay inside. Escape should close.
          </p>
          <div className="mt-3">
            <label className="text-sm font-medium" htmlFor="modal-input">
              Sample input
            </label>
            <input
              id="modal-input"
              className="mt-1 w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
              placeholder="Focusable input"
            />
          </div>
        </Modal>

        <h2 className="text-lg font-semibold">Props</h2>
        <PropsTable
          rows={[
            { name: "open", type: "boolean", notes: "Controls visibility." },
            { name: "onOpenChange", type: "(open: boolean) => void", notes: "Called on close events." },
            { name: "title", type: "string", notes: "Used for aria-labelledby." },
            { name: "description", type: "string", notes: "Used for aria-describedby when provided." },
            { name: "footer", type: "ReactNode", notes: "Optional footer actions area." }
          ]}
        />

        <h2 className="text-lg font-semibold">Keyboard interactions</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-mutedFg">
          <li>Escape closes the dialog.</li>
          <li>Tab and Shift+Tab cycle focus inside the dialog.</li>
          <li>On close, focus returns to the trigger element.</li>
        </ul>

        <h2 className="text-lg font-semibold">ARIA notes</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-mutedFg">
          <li>Uses role=&quot;dialog&quot; and aria-modal=&quot;true&quot;.</li>
          <li>Title is linked via aria-labelledby.</li>
          <li>Description is linked via aria-describedby when provided.</li>
        </ul>
      </section>
    </DocsShell>
  );
}

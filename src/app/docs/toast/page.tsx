"use client";

import { DocsShell } from "@/components/patterns/docs/docs-shell";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/patterns/toast/toast-provider";

export default function ToastDocs() {
  const toast = useToast();

  return (
    <DocsShell title="Toast" description="Notifications with aria-live support. Does not steal focus.">
      <div className="rounded-lg border border-border bg-card p-4 shadow-soft">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => toast.info("Info", "Polite announcement.")}>Info</Button>
          <Button onClick={() => toast.success("Saved", "Your changes are stored.")}>Success</Button>
          <Button variant="danger" onClick={() => toast.error("Error", "Assertive announcement.")}>
            Error
          </Button>
        </div>
      </div>

      <h2 className="mt-6 text-lg font-semibold">Keyboard interactions</h2>
      <ul className="list-disc space-y-1 pl-5 text-sm text-mutedFg">
        <li>Toasts do not take focus automatically.</li>
        <li>Dismiss button is keyboard reachable if you tab into the stack.</li>
      </ul>

      <h2 className="mt-6 text-lg font-semibold">ARIA notes</h2>
      <ul className="list-disc space-y-1 pl-5 text-sm text-mutedFg">
        <li>Polite region for info and success.</li>
        <li>Assertive region for error.</li>
        <li>Keep messages short and actionable.</li>
      </ul>
    </DocsShell>
  );
}

import { DocsShell } from "@/components/patterns/docs/docs-shell";

export default function DocsHome() {
  return (
    <DocsShell
      title="Component documentation"
      description="Each component includes props, examples, keyboard interactions, and ARIA notes."
    >
      <div className="rounded-lg border border-border bg-card p-5 shadow-soft">
        <h2 className="font-semibold">How to use these docs</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-mutedFg">
          <li>Try examples with keyboard only.</li>
          <li>Read the keyboard interaction section before shipping.</li>
          <li>Use the a11y notes as review checklist items.</li>
        </ul>
      </div>
    </DocsShell>
  );
}

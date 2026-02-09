"use client";

import * as React from "react";
import { DocsShell } from "@/components/patterns/docs/docs-shell";
import { Combobox, type ComboOption } from "@/components/ui/combobox";

const all: ComboOption[] = [
  { value: "open", label: "Open" },
  { value: "done", label: "Done" },
  { value: "blocked", label: "Blocked" },
  { value: "in-review", label: "In review" }
];

export default function ComboboxDocs() {
  const [val, setVal] = React.useState<ComboOption | null>(null);

  async function loadOptions(query: string) {
    await new Promise((r) => setTimeout(r, 250));
    const q = query.toLowerCase();
    return all.filter((o) => o.label.toLowerCase().includes(q));
  }

  return (
    <DocsShell title="Combobox" description="Typeahead with async options and aria-activedescendant.">
      <div className="max-w-md rounded-lg border border-border bg-card p-4 shadow-soft">
        <Combobox
          label="Status"
          value={val}
          onChange={setVal}
          loadOptions={loadOptions}
          hint="Type to filter. Use arrow keys then Enter to select."
        />
        <div className="mt-3 text-sm text-mutedFg">Selected: {val ? val.label : "None"}</div>
      </div>

      <h2 className="mt-6 text-lg font-semibold">Keyboard interactions</h2>
      <ul className="list-disc space-y-1 pl-5 text-sm text-mutedFg">
        <li>ArrowDown opens list and moves active option.</li>
        <li>ArrowUp moves active option up.</li>
        <li>Enter selects the active option.</li>
        <li>Escape closes the list.</li>
      </ul>
    </DocsShell>
  );
}

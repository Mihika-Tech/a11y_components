"use client";

import { DocsShell } from "@/components/patterns/docs/docs-shell";
import { DataTable } from "@/components/ui/data-table";

type Row = { id: string; name: string; status: "open" | "done" };

const rows: Row[] = [
  { id: "1", name: "Write tests", status: "open" },
  { id: "2", name: "Fix focus states", status: "done" },
  { id: "3", name: "Ship table", status: "open" }
];

export default function DataTableDocs() {
  return (
    <DocsShell title="DataTable" description="Sortable headers, row actions, empty state, and keyboard row navigation.">
      <DataTable<Row>
        caption="Example tasks"
        columns={[
          {
            key: "name",
            header: "Name",
            sortable: true,
            sortValue: (r) => r.name,
            cell: (r) => r.name
          },
          {
            key: "status",
            header: "Status",
            sortable: true,
            sortValue: (r) => r.status,
            cell: (r) => (r.status === "open" ? "Open" : "Done")
          }
        ]}
        rows={rows}
        rowKey={(r) => r.id}
        onRowAction={(action, row) => {
          alert(`${action} ${row.name}`);
        }}
      />

      <h2 className="mt-6 text-lg font-semibold">Keyboard interactions</h2>
      <ul className="list-disc space-y-1 pl-5 text-sm text-mutedFg">
        <li>Tab enters the first cell in a row.</li>
        <li>ArrowUp and ArrowDown move focus between rows.</li>
        <li>Sortable headers are buttons and can be activated with Enter or Space.</li>
      </ul>
    </DocsShell>
  );
}

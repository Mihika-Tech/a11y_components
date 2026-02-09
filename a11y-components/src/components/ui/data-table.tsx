"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

export type Column<T> = {
  key: string;
  header: string;
  sortable?: boolean;
  cell: (row: T) => React.ReactNode;
  sortValue?: (row: T) => string | number;
  widthClassName?: string;
};

type SortState = { key: string; dir: "asc" | "desc" } | null;

export function DataTable<T>({
  caption,
  columns,
  rows,
  rowKey,
  emptyTitle = "No results",
  emptyDescription = "Try adjusting filters or create a new item.",
  onRowAction
}: {
  caption?: string;
  columns: Array<Column<T>>;
  rows: T[];
  rowKey: (row: T) => string;
  emptyTitle?: string;
  emptyDescription?: string;
  onRowAction?: (action: "open" | "delete", row: T) => void;
}) {
  const [sort, setSort] = React.useState<SortState>(null);

  const sorted = React.useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    if (!col?.sortable) return rows;

    const getter = col.sortValue ?? ((r: T) => String(col.cell(r)));
    const dir = sort.dir === "asc" ? 1 : -1;

    return [...rows].sort((a, b) => {
      const av = getter(a);
      const bv = getter(b);
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  }, [rows, sort, columns]);

  function toggleSort(key: string) {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, dir: "asc" };
      return { key, dir: prev.dir === "asc" ? "desc" : "asc" };
    });
  }

  function onTableKeyDown(e: React.KeyboardEvent<HTMLTableElement>) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;

    const active = document.activeElement as HTMLElement | null;
    if (!active) return;

    const currentRow = active.closest("tr[data-row='true']") as HTMLTableRowElement | null;
    if (!currentRow) return;

    const allRows = Array.from(
      (currentRow.closest("tbody") ?? document).querySelectorAll<HTMLTableRowElement>("tr[data-row='true']")
    );
    const idx = allRows.indexOf(currentRow);
    if (idx < 0) return;

    const nextIdx = e.key === "ArrowDown" ? Math.min(allRows.length - 1, idx + 1) : Math.max(0, idx - 1);
    if (nextIdx === idx) return;

    e.preventDefault();
    const nextRow = allRows[nextIdx];
    const focusTarget =
      nextRow.querySelector<HTMLElement>('[data-row-focus="true"]') ??
      nextRow.querySelector<HTMLElement>('button, a, [tabindex]:not([tabindex="-1"])');
    focusTarget?.focus();
  }

  return (
    <div className="rounded-lg border border-border bg-card shadow-soft">
      <div className="px-4 py-3">
        {caption ? <div className="text-sm font-medium">{caption}</div> : null}
      </div>

      {rows.length === 0 ? (
        <div className="border-t border-border px-4 py-8">
          <div className="text-sm font-medium">{emptyTitle}</div>
          <div className="mt-1 text-sm text-mutedFg">{emptyDescription}</div>
        </div>
      ) : (
        <div className="overflow-x-auto border-t border-border">
          <table className="w-full text-left text-sm" onKeyDown={onTableKeyDown}>
            <thead className="bg-muted">
              <tr>
                {columns.map((c) => {
                  const isSorted = sort?.key === c.key;
                  const ariaSort =
                    !c.sortable ? undefined : isSorted ? (sort?.dir === "asc" ? "ascending" : "descending") : "none";

                  return (
                    <th key={c.key} className={cn("px-4 py-2 font-medium", c.widthClassName)} aria-sort={ariaSort as "ascending" | "descending" | "none" | undefined}>
                      {c.sortable ? (
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 hover:underline"
                          onClick={() => toggleSort(c.key)}
                        >
                          {c.header}
                          <span className="text-xs text-mutedFg" aria-hidden="true">
                            {isSorted ? (sort?.dir === "asc" ? "▲" : "▼") : ""}
                          </span>
                        </button>
                      ) : (
                        c.header
                      )}
                    </th>
                  );
                })}
                {onRowAction ? <th className="px-4 py-2 font-medium">Actions</th> : null}
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => (
                <tr key={rowKey(r)} data-row="true" className="border-t border-border">
                  {columns.map((c, idx) => (
                    <td key={c.key} className="px-4 py-3">
                      <div data-row-focus={idx === 0 ? "true" : undefined} tabIndex={idx === 0 ? 0 : -1} className="outline-none">
                        {c.cell(r)}
                      </div>
                    </td>
                  ))}
                  {onRowAction ? (
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="secondary" onClick={() => onRowAction("open", r)}>
                          Open
                        </Button>
                        <Button variant="danger" onClick={() => onRowAction("delete", r)}>
                          Delete
                        </Button>
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

"use client";

import * as React from "react";
import { TextInput } from "@/components/ui/text-input";
import { Skeleton } from "@/components/ui/skeleton";
import { loadTasks, updateTaskStatus, deleteTask, type Task } from "@/lib/task-hub/storage";
import { DataTable } from "@/components/ui/data-table";
import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Combobox, type ComboOption } from "@/components/ui/combobox";
import { Popover, PopoverItem } from "@/components/ui/popover";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/patterns/toast/toast-provider";

const statusOptions: ComboOption[] = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "done", label: "Done" }
];

export default function DashboardPage() {
  const toast = useToast();

  const [q, setQ] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [status, setStatus] = React.useState<ComboOption | null>(statusOptions[0]);

  const [menuOpenId, setMenuOpenId] = React.useState<string | null>(null);
  const [confirmId, setConfirmId] = React.useState<string | null>(null);

  function refresh() {
    setTasks(loadTasks());
  }

  React.useEffect(() => {
    const t = window.setTimeout(() => {
      refresh();
      setLoading(false);
    }, 250);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    function onFocus() {
      refresh();
    }
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = tasks
    .filter((t) => t.title.toLowerCase().includes(q.toLowerCase()))
    .filter((t) => {
      if (!status || status.value === "all") return true;
      return t.status === status.value;
    });

  async function loadStatuses(query: string) {
    await new Promise((r) => setTimeout(r, 150));
    const qq = query.toLowerCase();
    return statusOptions.filter((o) => o.label.toLowerCase().includes(qq));
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-card p-5 shadow-soft">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Dashboard</h2>
            <p className="mt-1 text-sm text-mutedFg">Search, filter, and manage tasks with keyboard.</p>
          </div>
          <Button variant="secondary" onClick={() => setFiltersOpen(true)}>
            Filters
          </Button>
        </div>

        <div className="mt-4 max-w-md">
          <TextInput label="Search" value={q} onChange={(e) => setQ(e.target.value)} hint="Filters by title." />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 shadow-soft">
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <>
            <DataTable<Task>
              caption="Tasks"
              columns={[
                {
                  key: "title",
                  header: "Title",
                  sortable: true,
                  sortValue: (r) => r.title,
                  cell: (r) => (
                    <a className="hover:underline" href={`/task-hub/tasks/${r.id}`}>
                      {r.title}
                    </a>
                  )
                },
                {
                  key: "status",
                  header: "Status",
                  sortable: true,
                  sortValue: (r) => r.status,
                  cell: (r) => (r.status === "open" ? "Open" : "Done")
                },
                {
                  key: "actions",
                  header: "Actions",
                  widthClassName: "w-[140px]",
                  cell: (r) => (
                    <Popover
                      open={menuOpenId === r.id}
                      onOpenChange={(o) => setMenuOpenId(o ? r.id : null)}
                      trigger={(props) => (
                        <Button variant="secondary" {...props}>
                          Actions
                        </Button>
                      )}
                    >
                      <PopoverItem
                        onSelect={() => {
                          window.location.href = `/task-hub/tasks/${r.id}`;
                        }}
                      >
                        Open
                      </PopoverItem>

                      {r.status === "open" ? (
                        <PopoverItem
                          onSelect={() => {
                            updateTaskStatus(r.id, "done");
                            refresh();
                            toast.success("Marked as done", "Task status updated.");
                          }}
                        >
                          Mark as done
                        </PopoverItem>
                      ) : (
                        <PopoverItem
                          onSelect={() => {
                            updateTaskStatus(r.id, "open");
                            refresh();
                            toast.success("Reopened task", "Task status updated.");
                          }}
                        >
                          Reopen
                        </PopoverItem>
                      )}

                      <PopoverItem
                        danger
                        onSelect={() => {
                          setConfirmId(r.id);
                        }}
                      >
                        Delete
                      </PopoverItem>
                    </Popover>
                  )
                }
              ]}
              rows={filtered}
              rowKey={(r) => r.id}
              emptyTitle="No tasks match"
              emptyDescription="Try a different search or create a new task."
            />

            <Modal
              open={confirmId !== null}
              onOpenChange={(o) => setConfirmId(o ? confirmId : null)}
              title="Delete task"
              description="This action cannot be undone."
              footer={
                <>
                  <Button variant="secondary" onClick={() => setConfirmId(null)}>
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      if (!confirmId) return;
                      deleteTask(confirmId);
                      setConfirmId(null);
                      refresh();
                      toast.success("Task deleted", "Task removed from the list.");
                    }}
                  >
                    Delete
                  </Button>
                </>
              }
            >
              <p className="text-sm text-mutedFg">Are you sure you want to delete this task?</p>
            </Modal>
          </>
        )}
      </div>

      <Drawer open={filtersOpen} onOpenChange={setFiltersOpen} title="Filters">
        <div className="space-y-4">
          <Combobox
            label="Status"
            value={status}
            onChange={(o) => setStatus(o ?? statusOptions[0])}
            loadOptions={loadStatuses}
            hint="Type to filter options. Use arrow keys then Enter to select."
          />
          <Button variant="secondary" onClick={() => setFiltersOpen(false)}>
            Apply
          </Button>
        </div>
      </Drawer>
    </div>
  );
}

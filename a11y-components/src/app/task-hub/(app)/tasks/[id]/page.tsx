"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { getTask, updateTaskStatus, deleteTask, type Task } from "@/lib/task-hub/storage";
import { Tabs, TabsList, TabsPanel, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/patterns/toast/toast-provider";
import { Modal } from "@/components/ui/modal";

export default function TaskDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const toast = useToast();

  const id = params.id;

  const [tab, setTab] = React.useState("details");
  const [task, setTask] = React.useState<Task | null>(null);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  React.useEffect(() => {
    setTask(getTask(id));
  }, [id]);

  const title = task?.title ?? "Task not found";
  const desc = task?.description ?? "This task does not exist.";

  function toggleStatus() {
    if (!task) return;

    const nextStatus = task.status === "open" ? "done" : "open";
    const updated = updateTaskStatus(task.id, nextStatus);

    if (!updated) {
      toast.error("Update failed", "Task could not be updated.");
      return;
    }

    setTask(updated);
    toast.success(
      nextStatus === "done" ? "Marked as done" : "Reopened task",
      "Status updated successfully."
    );
  }

  function confirmDelete() {
    if (!task) return;
    deleteTask(task.id);
    toast.success("Task deleted", "Returning to dashboard.");
    router.push("/task-hub/dashboard");
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-mutedFg">Use arrow keys to navigate tabs.</p>
          {task ? (
            <p className="mt-2 text-sm">
              Status:{" "}
              <span className="font-medium">
                {task.status === "open" ? "Open" : "Done"}
              </span>
            </p>
          ) : null}
        </div>

        {task ? (
          <div className="flex gap-2">
            <Button variant="secondary" onClick={toggleStatus}>
              {task.status === "open" ? "Mark as done" : "Reopen"}
            </Button>
            <Button variant="danger" onClick={() => setConfirmOpen(true)}>
              Delete
            </Button>
          </div>
        ) : null}
      </div>

      <div className="mt-4">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsPanel value="details">
            <p className="text-sm text-mutedFg">{desc}</p>
          </TabsPanel>

          <TabsPanel value="activity">
            <ul className="space-y-2 text-sm text-mutedFg">
              <li>Created event placeholder</li>
              <li>Status change placeholder</li>
              <li>Comment placeholder</li>
            </ul>
          </TabsPanel>
        </Tabs>
      </div>

      <Modal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete task"
        description="This action cannot be undone."
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-mutedFg">Are you sure you want to delete this task?</p>
      </Modal>
    </div>
  );
}

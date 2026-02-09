"use client";

import * as React from "react";
import { TextInput } from "@/components/ui/text-input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/patterns/toast/toast-provider";
import { createTask } from "@/lib/task-hub/storage";
import { required, minLen, type FieldErrors } from "@/lib/forms/validate";
import { useRouter } from "next/navigation";

type Fields = "title" | "description";

export default function NewTaskPage() {
  const router = useRouter();
  const toast = useToast();

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [errors, setErrors] = React.useState<FieldErrors<Fields>>({});
  const [loading, setLoading] = React.useState(false);

  function validate(): FieldErrors<Fields> {
    const next: FieldErrors<Fields> = {};
    const t1 = required(title, "Title is required.");
    const t2 = minLen(title, 3, "Title must be at least 3 characters.");
    next.title = t1 || t2 || "";

    const d1 = required(description, "Description is required.");
    const d2 = minLen(description, 10, "Description must be at least 10 characters.");
    next.description = d1 || d2 || "";

    if (!next.title) delete next.title;
    if (!next.description) delete next.description;
    return next;
  }

  async function onSubmit() {
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Task not created", "Fix the form errors and try again.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));

    const t = createTask({ title, description });
    toast.success("Task created", "Redirecting to task details.");
    router.push(`/task-hub/tasks/${t.id}`);
  }

  return (
    <div className="max-w-xl rounded-lg border border-border bg-card p-5 shadow-soft">
      <h2 className="text-lg font-semibold">Create task</h2>
      <p className="mt-1 text-sm text-mutedFg">Validation, loading state, and toast feedback included.</p>

      <div className="mt-4 space-y-4">
        <TextInput
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
          hint="Keep it short and specific."
        />
        <div>
          <label className="block text-sm font-medium" htmlFor="desc">
            Description
          </label>
          <textarea
            id="desc"
            className="mt-1 w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-invalid={errors.description ? true : undefined}
            aria-describedby={errors.description ? "desc-error" : undefined}
            rows={4}
          />
          {errors.description ? (
            <p id="desc-error" className="mt-1 text-sm text-danger">
              {errors.description}
            </p>
          ) : (
            <p className="mt-1 text-sm text-mutedFg">Write at least 10 characters.</p>
          )}
        </div>

        <Button type="button" onClick={onSubmit} isLoading={loading}>
          Create
        </Button>
      </div>
    </div>
  );
}

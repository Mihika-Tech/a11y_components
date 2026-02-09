import { DocsShell } from "@/components/patterns/docs/docs-shell";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonDocs() {
  return (
    <DocsShell title="Skeleton" description="Decorative loading placeholder. Hidden from assistive tech.">
      <div className="rounded-lg border border-border bg-card p-4 shadow-soft">
        <div className="space-y-3">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </DocsShell>
  );
}

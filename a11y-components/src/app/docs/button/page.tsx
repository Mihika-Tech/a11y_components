import { DocsShell } from "@/components/patterns/docs/docs-shell";
import { PropsTable } from "@/components/patterns/docs/props-table";
import { Button } from "@/components/ui/button";

export default function ButtonDocs() {
  return (
    <DocsShell title="Button" description="Accessible button with loading state and pressed state support.">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Examples</h2>

        <div className="flex flex-wrap gap-3 rounded-lg border border-border bg-card p-4 shadow-soft">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
          <Button isLoading>Saving</Button>
          <Button aria-pressed={true} variant="secondary">
            Pressed
          </Button>
          <Button disabled>Disabled</Button>
        </div>

        <h2 className="text-lg font-semibold">Props</h2>
        <PropsTable
          rows={[
            { name: "variant", type: '"primary" | "secondary" | "danger" | "ghost"', defaultValue: '"primary"' },
            { name: "isLoading", type: "boolean", defaultValue: "false", notes: "Sets aria-busy and disables the button." },
            { name: "aria-pressed", type: "boolean", notes: "Use for toggle buttons." }
          ]}
        />

        <h2 className="text-lg font-semibold">Keyboard interactions</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-mutedFg">
          <li>Enter activates the button.</li>
          <li>Space activates the button.</li>
          <li>When aria-pressed is used, screen readers announce pressed state.</li>
        </ul>

        <h2 className="text-lg font-semibold">ARIA notes</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-mutedFg">
          <li>Use a real button element for actions, not a div.</li>
          <li>Use aria-pressed only for toggle behavior.</li>
          <li>Loading uses aria-busy and keeps label available via sr-only.</li>
        </ul>
      </section>
    </DocsShell>
  );
}

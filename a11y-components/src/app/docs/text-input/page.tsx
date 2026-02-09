"use client";

import * as React from "react";
import { DocsShell } from "@/components/patterns/docs/docs-shell";
import { PropsTable } from "@/components/patterns/docs/props-table";
import { TextInput } from "@/components/ui/text-input";
import { Button } from "@/components/ui/button";

export default function TextInputDocs() {
  const [email, setEmail] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const emailError = submitted && !email.includes("@") ? "Enter a valid email address." : undefined;
  const pwdError = submitted && pwd.length < 8 ? "Password must be at least 8 characters." : undefined;

  return (
    <DocsShell title="TextInput" description="Label, hint, error, prefix, suffix, and password reveal support.">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Example form</h2>

        <div className="max-w-lg rounded-lg border border-border bg-card p-4 shadow-soft">
          <div className="space-y-4">
            <TextInput
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              hint="We will not share your email."
              error={emailError}
              inputMode="email"
              autoComplete="email"
            />

            <TextInput
              label="Password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              hint="Use 8 or more characters."
              error={pwdError}
              isPasswordReveal
              autoComplete="current-password"
            />

            <Button
              onClick={() => setSubmitted(true)}
              type="button"
              className="w-full"
            >
              Validate
            </Button>
          </div>
        </div>

        <h2 className="text-lg font-semibold">Props</h2>
        <PropsTable
          rows={[
            { name: "label", type: "string", notes: "Required visible label. Linked via htmlFor." },
            { name: "hint", type: "string", notes: "Announced via aria-describedby." },
            { name: "error", type: "string", notes: "Sets aria-invalid and is announced via aria-describedby." },
            { name: "prefix", type: "ReactNode", notes: "Decorative content, keep it non interactive." },
            { name: "suffix", type: "ReactNode", notes: "Decorative content, keep it non interactive." },
            { name: "isPasswordReveal", type: "boolean", defaultValue: "false", notes: "Adds a toggle button with aria-pressed." }
          ]}
        />

        <h2 className="text-lg font-semibold">Keyboard interactions</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-mutedFg">
          <li>Tab moves focus into the input, and to the reveal button when present.</li>
          <li>Space and Enter activate the reveal toggle button.</li>
        </ul>

        <h2 className="text-lg font-semibold">ARIA notes</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-mutedFg">
          <li>Labels use a native label element for reliable announcement.</li>
          <li>Hint and error messages are linked via aria-describedby.</li>
          <li>Error also sets aria-invalid.</li>
        </ul>
      </section>
    </DocsShell>
  );
}

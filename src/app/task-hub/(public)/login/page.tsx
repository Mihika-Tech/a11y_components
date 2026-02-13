"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { TextInput } from "@/components/ui/text-input";
import { Button } from "@/components/ui/button";
import { setSession } from "@/lib/task-hub/storage";
import { useToast } from "@/components/patterns/toast/toast-provider";

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();

  const [email, setEmail] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const emailError = submitted && !email.includes("@") ? "Enter a valid email." : undefined;
  const pwdError = submitted && pwd.trim().length < 8 ? "Enter at least 8 characters." : undefined;

  async function onSubmit() {
    setSubmitted(true);

    const nextEmailError = !email.includes("@") ? "Enter a valid email." : "";
    const nextPwdError = pwd.trim().length < 8 ? "Enter at least 8 characters." : "";

    if (nextEmailError || nextPwdError) {
      toast.error("Fix the form errors", "Review the highlighted fields and try again.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));

    setSession(true);
    toast.success("Signed in", "Welcome to Task Hub.");
    router.push("/a11y_components/task-hub/dashboard");
  }

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-10">
      <div className="max-w-md rounded-lg border border-border bg-card p-5 shadow-soft">
        <h1 className="text-lg font-semibold">Login</h1>
        <p className="mt-1 text-sm text-mutedFg">Mock auth for demo flows.</p>

        <div className="mt-4 space-y-4">
          <TextInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            autoComplete="email"
          />

          <TextInput
            label="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            error={pwdError}
            isPasswordReveal
            autoComplete="current-password"
          />

          <Button className="w-full" onClick={onSubmit} isLoading={loading} type="button">
            Sign in
          </Button>
        </div>
      </div>
    </main>
  );
}

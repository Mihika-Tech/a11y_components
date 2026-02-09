"use client";

import * as React from "react";
import { DocsShell } from "@/components/patterns/docs/docs-shell";
import { Tabs, TabsList, TabsPanel, TabsTrigger } from "@/components/ui/tabs";

export default function TabsDocs() {
  const [v, setV] = React.useState("one");

  return (
    <DocsShell title="Tabs" description="Roving tabindex and expected arrow key navigation.">
      <div className="rounded-lg border border-border bg-card p-4 shadow-soft">
        <Tabs value={v} onValueChange={setV}>
          <TabsList>
            <TabsTrigger value="one">One</TabsTrigger>
            <TabsTrigger value="two">Two</TabsTrigger>
            <TabsTrigger value="three">Three</TabsTrigger>
          </TabsList>

          <TabsPanel value="one">
            <div className="text-sm text-mutedFg">Panel one content.</div>
          </TabsPanel>
          <TabsPanel value="two">
            <div className="text-sm text-mutedFg">Panel two content.</div>
          </TabsPanel>
          <TabsPanel value="three">
            <div className="text-sm text-mutedFg">Panel three content.</div>
          </TabsPanel>
        </Tabs>
      </div>

      <h2 className="mt-6 text-lg font-semibold">Keyboard interactions</h2>
      <ul className="list-disc space-y-1 pl-5 text-sm text-mutedFg">
        <li>Arrow keys move between tabs.</li>
        <li>Home and End jump to first or last.</li>
        <li>Tab moves into the active panel.</li>
      </ul>
    </DocsShell>
  );
}

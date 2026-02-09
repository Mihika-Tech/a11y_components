"use client";

import * as React from "react";

export function useStableId(prefix: string) {
  const rid = React.useId();
  // rid is stable across server and client
  return `${prefix}-${rid.replace(/:/g, "")}`;
}

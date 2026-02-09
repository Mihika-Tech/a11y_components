export type FieldErrors<T extends string> = Partial<Record<T, string>>;

export function required(value: string, message: string) {
  return value.trim().length === 0 ? message : "";
}

export function minLen(value: string, n: number, message: string) {
  return value.trim().length < n ? message : "";
}

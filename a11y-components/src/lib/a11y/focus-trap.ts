const FOCUSABLE =
  'a[href], area[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );
}

export function trapFocus(container: HTMLElement, event: KeyboardEvent) {
  if (event.key !== "Tab") return;

  const focusables = getFocusable(container);
  if (focusables.length === 0) return;

  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = document.activeElement as HTMLElement | null;

  if (event.shiftKey) {
    if (!active || active === first) {
      event.preventDefault();
      last.focus();
    }
  } else {
    if (active === last) {
      event.preventDefault();
      first.focus();
    }
  }
}

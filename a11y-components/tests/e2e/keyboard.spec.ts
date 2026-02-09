import { test, expect } from "@playwright/test";

test("skip link moves focus to main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeVisible();
});

test("modal traps focus and escape closes", async ({ page }) => {
  await page.goto("/docs/modal");
  await page.getByRole("button", { name: "Open modal" }).click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Escape");

  await expect(dialog).toHaveCount(0);
});

import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("dashboard has no serious a11y violations", async ({ page }) => {
  await page.goto("/task-hub/login");
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByRole("button", { name: "Sign in" }).click();

  await page.goto("/task-hub/dashboard");

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();

  const serious = results.violations.filter((v) => ["serious", "critical"].includes(v.impact ?? ""));
  expect(serious).toEqual([]);
});

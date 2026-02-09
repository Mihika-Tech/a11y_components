import { test, expect } from "@playwright/test";

test("dashboard actions menu supports keyboard and can mark done", async ({ page }) => {
  // Login
  await page.goto("/task-hub/login");
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page).toHaveURL(/\/task-hub\/dashboard/);

  // Create a task
  await page.goto("/task-hub/tasks/new");
  await expect(page).toHaveURL(/\/task-hub\/tasks\/new/);

  const title = "Keyboard action task";
  await page.getByLabel("Title").fill(title);
  await page.getByLabel("Description").fill("This task is used to test the actions menu.");
  await page.getByRole("button", { name: "Create" }).click();

  await expect(page).toHaveURL(/\/task-hub\/tasks\/t_/);

  // Back to dashboard
  await page.goto("/task-hub/dashboard");
  await expect(page).toHaveURL(/\/task-hub\/dashboard/);

  // Wait for at least one actions button
  const actions = page.getByRole("button", { name: "Actions" }).first();
  await expect(actions).toBeVisible();

  // Open menu with keyboard and select Mark as done
  await actions.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("menu")).toBeVisible();

  await page.keyboard.press("ArrowDown"); // move from Open -> Mark as done
  await page.keyboard.press("Enter");

  // Assert the row for this title shows Done (scoped to the row)
  const row = page.getByRole("row").filter({ hasText: title });
  await expect(row).toContainText("Done");
});

import { test, expect } from "@playwright/test";

test("login -> create task -> view details -> mark done from dashboard", async ({ page }) => {
  // Login
  await page.goto("/task-hub/login");
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page).toHaveURL(/\/task-hub\/dashboard/);

  // Create task
  await page.getByRole("link", { name: "Create" }).click();
  await expect(page).toHaveURL(/\/task-hub\/tasks\/new/);

  const title = "Ship Milestone 5";
  await page.getByLabel("Title").fill(title);
  await page.getByLabel("Description").fill("Use popover actions menu and confirm status updates.");
  await page.getByRole("button", { name: "Create" }).click();

  await expect(page).toHaveURL(/\/task-hub\/tasks\/t_/);
  await expect(page.getByRole("heading", { level: 2 })).toContainText(title);

  // Back to dashboard and use Actions menu
  await page.goto("/task-hub/dashboard");
  await expect(page).toHaveURL(/\/task-hub\/dashboard/);

  const actions = page.getByRole("button", { name: "Actions" }).first();
  await expect(actions).toBeVisible();

  await actions.click();
  await expect(page.getByRole("menu")).toBeVisible();

  await page.getByRole("menuitem", { name: "Mark as done" }).click();

  // Assert status change in a row (scoped)
  const row = page.getByRole("row").filter({ hasText: title });
  await expect(row).toContainText("Done");
});

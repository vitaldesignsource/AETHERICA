import { expect, test } from "@playwright/test";

test("home page renders primary experience", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Aetherica", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Listen Now" }).first()).toBeVisible();
  await expect(page.getByRole("region", { name: "Persistent audio player" })).toBeVisible();
});

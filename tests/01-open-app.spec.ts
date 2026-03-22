import { test, expect } from "@playwright/test";

test("01 - open app", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Tere tulemast viktoriinirakendusse!" })).toBeVisible();

  const startButton = page.getByRole("link", { name: "Alusta viktoriiniga" });
  await expect(startButton).toBeVisible();
});

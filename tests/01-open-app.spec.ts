import { test, expect } from "@playwright/test";

// Testime rakenduse pealehte - kus peavad olema tervitustekst ja nupp "Alusta viktoriiniga" 
test("01 - open app", async ({ page }) => {
  // Navigeerime rakenduse pealehele
  await page.goto("/");

  // Tervitusteksti olemasolu kontroll
  await expect(page.getByRole("heading", { name: "Tere tulemast viktoriinirakendusse!" })).toBeVisible();

  // Nupu "Alusta viktoriiniga" olemasolu kontroll
  const startButton = page.getByRole("link", { name: "Alusta viktoriiniga" });
  await expect(startButton).toBeVisible();
});

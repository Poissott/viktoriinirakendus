import { test, expect } from "@playwright/test";

test("04 - wrong answer behavior", async ({ page }) => {
  await page.goto("/");
  const startButton = page.getByRole("link", { name: "Alusta viktoriiniga" });
  await startButton.click();

  await expect(page.getByRole("heading", { level: 2, name: "Mis on Eesti pealinn?" })).toBeVisible();

  const wrongAnswerButton = page.getByRole("button", { name: "Narva" });
  await wrongAnswerButton.click();

  const controlAnswerButton = page.getByRole("button", { name: "Kontrolli vastust" });
  await controlAnswerButton.click();

  await expect(controlAnswerButton).toBeDisabled();

  const buttonClass = await wrongAnswerButton.getAttribute("class");
  
  expect(buttonClass).toContain("bg-[#DC1919]");
  expect(buttonClass).toContain("text-white");
});

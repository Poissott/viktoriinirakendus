import { test, expect } from "@playwright/test";

test("03 - score changes", async ({ page }) => {
  await page.goto("/");
  const startButton = page.getByRole("link", { name: "Alusta viktoriiniga" });
  await startButton.click();

  const answerButtons = page.locator("button").filter({ hasNot: page.locator("text=Kontrolli vastust") });
  await answerButtons.first().click();

  const controlAnswerButton = page.getByRole("button", { name: "Kontrolli vastust" });
  
  await expect(controlAnswerButton).toBeEnabled();

  await controlAnswerButton.click();

  await expect(controlAnswerButton).toBeDisabled();

  await page.goto("/tulemused");

  const scoreText = await page.getByText(/^Skoor:/).textContent();
  expect(scoreText).toBeTruthy();

  const match = scoreText?.match(/Skoor:\s*(\d+)\/(\d+)/);
  expect(match).toBeTruthy();

  const score = match ? parseInt(match[1], 10) : -1;
  const totalQuestions = match ? parseInt(match[2], 10) : 0;

  expect(score).toBe(1);
  expect(totalQuestions).toBeGreaterThan(0);
});

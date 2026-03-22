import { test, expect } from "@playwright/test";

test("05 - final result verification", async ({ page }) => {
  await page.goto("/");
  const startButton = page.getByRole("link", { name: "Alusta viktoriiniga" });
  await startButton.click();

  while (true) {
    const answerButtons = page.locator("button").filter({ hasNotText: "Kontrolli vastust" });
    await expect(answerButtons.first()).toBeVisible();
    await answerButtons.first().click();

    const controlAnswerButton = page.getByRole("button", { name: "Kontrolli vastust" });
    await expect(controlAnswerButton).toBeEnabled();
    await controlAnswerButton.click();

    const nextButton = page.getByRole("link", { name: /Järgmine küsimus|Vaata tulemusi/ });
    await expect(nextButton).toBeVisible();

    const buttonText = await nextButton.textContent();
    await nextButton.click();

    if (buttonText?.includes("Vaata tulemusi")) {
      break;
    }
  }

  const scoreText = await page.locator("p").first().textContent();
  expect(scoreText).toMatch(/Skoor: \d+\/\d+/);

  const match = scoreText?.match(/(\d+)\/(\d+)/);
  const score = match ? parseInt(match[1]) : -1;
  const totalQuestions = match ? parseInt(match[2]) : 0;

  expect(score).toBe(2);
  expect(totalQuestions).toBeGreaterThan(0);

  const feedbackText = await page.locator("p").nth(1).textContent();
  expect(feedbackText).toBeTruthy();
  expect(feedbackText?.length).toBeGreaterThan(0);

  const backButton = page.getByRole("link", { name: "Tagasi pealehele" });
  await expect(backButton).toBeVisible();
});

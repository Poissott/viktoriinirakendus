import { test, expect } from "@playwright/test";

// Testime skoori muutumist õige vastuse korral, mis peab suurenema ühe võrra
test("03 - score changes", async ({ page }) => {
  // Alustame viktoriiniga
  await page.goto("/");
  const startButton = page.getByRole("link", { name: "Alusta viktoriiniga" });
  await startButton.click();

  // Valime teadlikult õige esimese vastusevariandi ja vajutame selle peale
  const answerButtons = page.locator("button").filter({ hasNot: page.locator("text=Kontrolli vastust") });
  await answerButtons.first().click();

  // Vajutame "Kontrolli vastust" nupule
  const controlAnswerButton = page.getByRole("button", { name: "Kontrolli vastust" });
  await expect(controlAnswerButton).toBeEnabled();
  await controlAnswerButton.click();
  await expect(controlAnswerButton).toBeDisabled();

  // Tuvastame, kas vastus oli õige
  let checkScoreChange = 0;
  const answerButtonClassAfter = await answerButtons.first().getAttribute("class");
  if (answerButtonClassAfter?.includes("bg-[#4DC14D]")) {
    checkScoreChange++;
  }

  // Navigeerime tulemuste lehele
  await page.goto("/tulemused");

  // Skoori formaadi kontroll
  const scoreText = await page.getByText(/^Skoor:/).textContent();
  expect(scoreText).toBeTruthy();

  // Skoor pean olema 1 ja küsimuste arv peab olema suurem kui 0
  const match = scoreText?.match(/Skoor:\s*(\d+)\/(\d+)/);
  expect(match).toBeTruthy();

  const score = match ? parseInt(match[1], 10) : -1;
  const totalQuestions = match ? parseInt(match[2], 10) : 0;
  expect(score).toBe(checkScoreChange);
  expect(totalQuestions).toBeGreaterThan(0);
});

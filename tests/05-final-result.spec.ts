import { test, expect } from "@playwright/test";

// Lõpptulemuse kontrollimine: valitakse kõikidele küsimustele esimene vastusevariant
// Skoor peab olema 2/7 praeguste küsimuste korral
test("05 - final result verification", async ({ page }) => {
  // Alustame viktoriiniga
  await page.goto("/");
  const startButton = page.getByRole("link", { name: "Alusta viktoriiniga" });
  await startButton.click();

  // Kontrollime küsimuste ja õigete vastuste arvu
  let checkTotalQuestions = 0;
  let checkCorrectAnswers = 0;
  // While-tsükkel käib läbi kõikide küsimuste, kuni jõuab nupuni "Vaata tulemusi"
  while (true) {
    // Valime esimese vastusevariandi ja vajutame selle peale
    const answerButtons = page.locator("button").filter({ hasNotText: "Kontrolli vastust" });
    await expect(answerButtons.first()).toBeVisible();
    await answerButtons.first().click();

    // Vajutame "Kontrolli vastust" nupule
    const controlAnswerButton = page.getByRole("button", { name: "Kontrolli vastust" });
    await expect(controlAnswerButton).toBeEnabled();
    await controlAnswerButton.click();

    // Suurendame õigete vastuste arvu, kui see esimene vastusevariant oli õige
    const answerButtonClassAfter = await answerButtons.first().getAttribute("class");
    if (answerButtonClassAfter?.includes("bg-[#4DC14D]")) {
      checkCorrectAnswers++;
    }

    // Otsime nuppe "Järgmine küsimus" või "Vaata tulemusi" 
    const nextButton = page.getByRole("link", { name: /Järgmine küsimus|Vaata tulemusi/ });
    await expect(nextButton).toBeVisible();

    // Ning vajutame vastavalt sellele nupule
    const buttonText = await nextButton.textContent();
    await nextButton.click();

    // Suurendame küsimuste arvu kontrolli
    checkTotalQuestions++;

    // Kui jõuame nupuni "Vaata tulemusi", siis katkestame tsükli
    if (buttonText?.includes("Vaata tulemusi")) {
      break;
    }
  }

  // Tulemuste leht

  // Skoori formaadi kontroll
  const scoreText = await page.locator("p").first().textContent();
  expect(scoreText).toMatch(/Skoor: \d+\/\d+/);

  // Tagasiside sõnumi kontroll
  const messageText = await page.locator("p").nth(1).textContent();
  expect(messageText).toBeTruthy();
  expect(messageText).toBe("Sinu teadmistele Eestist on veel arenguruumi. Aga kõige olulisem on see, et sa üritasid.");

  // Skoori ja küsimuste arvu kontroll
  const match = scoreText?.match(/(\d+)\/(\d+)/);
  const score = match ? parseInt(match[1]) : -1;
  const totalQuestions = match ? parseInt(match[2]) : 0;

  expect(score).toBe(checkCorrectAnswers);
  expect(totalQuestions).toBe(checkTotalQuestions);

  // Tulemuste tabeli kontroll
  const feedbackText = await page.locator("p").nth(1).textContent();
  expect(feedbackText).toBeTruthy();
  expect(feedbackText?.length).toBeGreaterThan(0);

  // Tagasiminemise nupu kontroll
  const backButton = page.getByRole("link", { name: "Tagasi pealehele" });
  await expect(backButton).toBeVisible();
});

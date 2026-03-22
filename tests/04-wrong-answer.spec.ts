import { test, expect } from "@playwright/test";

// Testime vale vastuse käitumist - vale vastuse nupp peab minema punaseks ja selle tekst valgeks
test("04 - wrong answer behavior", async ({ page }) => {
  // Alustame viktoriiniga
  await page.goto("/");
  const startButton = page.getByRole("link", { name: "Alusta viktoriiniga" });
  await startButton.click();

  // Küsimuse teksti olemasolu kontroll
  await expect(page.getByRole("heading", { level: 2, name: "Mis on Eesti pealinn?" })).toBeVisible();

  // Valime teadlikult vale vastuse
  const wrongAnswerButton = page.getByRole("button", { name: "Narva" });
  await wrongAnswerButton.click();

  // Vajutame "Kontrolli vastust" nupule
  const controlAnswerButton = page.getByRole("button", { name: "Kontrolli vastust" });
  await controlAnswerButton.click();

  // Kontrollnupp peab olema nüüd keelatud
  await expect(controlAnswerButton).toBeDisabled();

  // Vale vastuse nupul peab olema punane taust ja valge tekst
  const buttonClass = await wrongAnswerButton.getAttribute("class");
  expect(buttonClass).toContain("bg-[#DC1919]");
  expect(buttonClass).toContain("text-white");
});

import { test, expect } from "@playwright/test";

// Testime küsimusele vastamist - pärast vastuse valimist ja nupule "Kontrolli vastust" vajutamist peab see nupp keelatuks muutuma
test("02 - answer question", async ({ page }) => {
    // Alustame viktoriiniga
    await page.goto("/");
    const startButton = page.getByRole("link", { name: "Alusta viktoriiniga" });
    await startButton.click();

    // Küsimuse kirjelduse kontroll
    const questionHeading = page.locator("h2");
    await expect(questionHeading).toBeVisible();

    // Vastusevariantide olemasolu kontroll
    const answerButtons = page.locator("button").filter({ hasNot: page.locator("text=Kontrolli vastust") });
    const answerCount = await answerButtons.count();
  
    // Peab olema vähemalt üks vastusevariant
    expect(answerCount).toBeGreaterThan(0);

    // Valime esimese vastusevariandi ja vajutame selle peale
    await answerButtons.first().click();
    await expect(answerButtons.first()).toBeFocused();

    // Vajutame "Kontrolli vastust" nupule
    const controlAnswerButton = page.getByRole("button", { name: "Kontrolli vastust" });
    await expect(controlAnswerButton).toBeEnabled();    
    await controlAnswerButton.click();

    // Nupp "Kontrolli vastust" peab nüüd olema keelatud
    await expect(controlAnswerButton).toBeDisabled();
});

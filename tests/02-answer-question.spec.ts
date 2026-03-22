import { test, expect } from "@playwright/test";

test("02 - answer question", async ({ page }) => {
    await page.goto("/");
    const startButton = page.getByRole("link", { name: "Alusta viktoriiniga" });
    await startButton.click();

    const questionHeading = page.locator("h2");
    await expect(questionHeading).toBeVisible();

    const answerButtons = page.locator("button").filter({ hasNot: page.locator("text=Kontrolli vastust") });
    const answerCount = await answerButtons.count();
  
    expect(answerCount).toBeGreaterThan(0);

    await answerButtons.first().click();

    await expect(answerButtons.first()).toBeFocused();

    const controlAnswerButton = page.getByRole("button", { name: "Kontrolli vastust" });
    await expect(controlAnswerButton).toBeEnabled();    
    await controlAnswerButton.click();

    await expect(controlAnswerButton).toBeDisabled();
});

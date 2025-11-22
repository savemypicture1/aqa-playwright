import { expect, test } from "@playwright/test";
import { REGISTRATION_SELECTORS } from "../../src/selectors.js";
import { WRONG_EMAILS } from "../../src/wrongEmails.js";

test.describe("Registration form - Email field validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator(REGISTRATION_SELECTORS.signUpButton).click();
  });

  test("should show error when Email field is empty", async ({ page }) => {
    const emailInput = page.locator(REGISTRATION_SELECTORS.emailInput);
    await emailInput.focus();
    await emailInput.blur();

    const errorMessage = emailInput
      .locator("..")
      .locator(REGISTRATION_SELECTORS.errorMessage);
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText("Email required");
    await expect(emailInput).toHaveClass(/is-invalid/);
  });

  test("should show error for all incorrect email formats", async ({
    page,
  }) => {
    const emailInput = page.locator(REGISTRATION_SELECTORS.emailInput);

    for (const email of WRONG_EMAILS) {
      //   await emailInput.clear();
      await emailInput.fill(email);
      await emailInput.blur();

      const errorMessage = emailInput
        .locator("..")
        .locator(REGISTRATION_SELECTORS.errorMessage);
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toContainText("Email is incorrect");
      await expect(emailInput).toHaveClass(/is-invalid/);
    }
  });
});

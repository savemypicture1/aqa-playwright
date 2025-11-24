import { expect, test } from "@playwright/test";
import { REGISTRATION_SELECTORS } from "../../src/selectors.js";

test.describe("Registration form - Base UI", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator(REGISTRATION_SELECTORS.signUpButton).click();
  });

  test("should display registration form with all required fields", async ({
    page,
  }) => {
    await expect(page.locator(REGISTRATION_SELECTORS.modalTitle)).toContainText(
      "Registration",
    );
    await expect(
      page.locator(REGISTRATION_SELECTORS.closeButton),
    ).toBeVisible();
    await expect(page.locator(REGISTRATION_SELECTORS.nameInput)).toBeVisible();
    await expect(
      page.locator(REGISTRATION_SELECTORS.lastNameInput),
    ).toBeVisible();
    await expect(page.locator(REGISTRATION_SELECTORS.emailInput)).toBeVisible();
    await expect(
      page.locator(REGISTRATION_SELECTORS.passwordInput),
    ).toBeVisible();
    await expect(
      page.locator(REGISTRATION_SELECTORS.repeatPasswordInput),
    ).toBeVisible();
    await expect(
      page.locator(REGISTRATION_SELECTORS.registerButton),
    ).toBeVisible();
  });
});

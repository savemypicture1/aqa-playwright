import { expect, test } from "@playwright/test";
import { REGISTRATION_SELECTORS } from "../../src/selectors.js";
import { faker } from "@faker-js/faker";

test.describe("Registration form - Re-enter Password field validation", () => {
  const generateValidPassword = () => {
    return `${faker.string.alpha({ length: 8, casing: "mixed" })}1`;
  };

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator(REGISTRATION_SELECTORS.signUpButton).click();
  });

  test("should show error when Re-enter Password field is empty", async ({
    page,
  }) => {
    const repeatPasswordInput = page.locator(
      REGISTRATION_SELECTORS.repeatPasswordInput,
    );
    await repeatPasswordInput.focus();
    await repeatPasswordInput.blur();

    const errorMsg = repeatPasswordInput
      .locator("..")
      .locator(REGISTRATION_SELECTORS.errorMessage);
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText("Re-enter password required");
    await expect(repeatPasswordInput).toHaveClass(/is-invalid/);
  });

  test("should show error when passwords do not match", async ({ page }) => {
    const password = generateValidPassword();
    const repeatPassword = generateValidPassword();

    const passwordInput = page.locator(REGISTRATION_SELECTORS.passwordInput);
    const repeatPasswordInput = page.locator(
      REGISTRATION_SELECTORS.repeatPasswordInput,
    );

    await passwordInput.fill(password);
    await passwordInput.blur();
    await repeatPasswordInput.fill(repeatPassword);
    await repeatPasswordInput.blur();

    const errorMsg = repeatPasswordInput
      .locator("..")
      .locator(REGISTRATION_SELECTORS.errorMessage);
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText("Passwords do not match");
    await expect(repeatPasswordInput).toHaveClass(/is-invalid/);
  });

  test("should accept matching passwords", async ({ page }) => {
    const validPassword = generateValidPassword();

    const passwordInput = page.locator(REGISTRATION_SELECTORS.passwordInput);
    const repeatPasswordInput = page.locator(
      REGISTRATION_SELECTORS.repeatPasswordInput,
    );

    await passwordInput.fill(validPassword);
    await passwordInput.blur();
    await repeatPasswordInput.fill(validPassword);
    await repeatPasswordInput.blur();

    await expect(repeatPasswordInput).toHaveClass(/ng-valid/);
  });
});
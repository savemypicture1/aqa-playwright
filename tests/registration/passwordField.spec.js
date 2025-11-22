import { expect, test } from "@playwright/test";
import { REGISTRATION_SELECTORS } from "../../src/selectors.js";
import { faker } from "@faker-js/faker";

test.describe("Registration form - Password field validation", () => {
  const errorMessage =
    "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter";

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator(REGISTRATION_SELECTORS.signUpButton).click();
  });

  test("should show error when Password field is empty", async ({ page }) => {
    const passwordInput = page.locator(REGISTRATION_SELECTORS.passwordInput);
    await passwordInput.focus();
    await passwordInput.blur();

    const errorMsg = passwordInput
      .locator("..")
      .locator(REGISTRATION_SELECTORS.errorMessage);
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText("Password required");
    await expect(passwordInput).toHaveClass(/is-invalid/);
  });

  test("should show error when password is less than 8 characters", async ({
    page,
  }) => {
    const shortPassword = faker.string.alpha({ length: 7, casing: "mixed" });
    const passwordInput = page.locator(REGISTRATION_SELECTORS.passwordInput);
    await passwordInput.fill(shortPassword);
    await passwordInput.blur();

    const errorMsg = passwordInput
      .locator("..")
      .locator(REGISTRATION_SELECTORS.errorMessage);
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText(errorMessage);
    await expect(passwordInput).toHaveClass(/is-invalid/);
  });

  test("should show error when password is more than 15 characters", async ({
    page,
  }) => {
    const longPassword = `${faker.string.alpha({
      length: 16,
      casing: "mixed",
    })}1`;
    const passwordInput = page.locator(REGISTRATION_SELECTORS.passwordInput);
    await passwordInput.fill(longPassword);
    await passwordInput.blur();

    const errorMsg = passwordInput
      .locator("..")
      .locator(REGISTRATION_SELECTORS.errorMessage);
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText(errorMessage);
    await expect(passwordInput).toHaveClass(/is-invalid/);
  });

  test("should show error when password has no integer", async ({ page }) => {
    const noIntPassword = faker.string.alpha({ length: 8, casing: "mixed" });
    const passwordInput = page.locator(REGISTRATION_SELECTORS.passwordInput);
    await passwordInput.fill(noIntPassword);
    await passwordInput.blur();

    const errorMsg = passwordInput
      .locator("..")
      .locator(REGISTRATION_SELECTORS.errorMessage);
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText(errorMessage);
    await expect(passwordInput).toHaveClass(/is-invalid/);
  });

  test("should show error when password has no capital letter", async ({
    page,
  }) => {
    const noCapitalPassword = `${faker.string.alpha({
      length: 8,
      casing: "lower",
    })}1`;
    const passwordInput = page.locator(REGISTRATION_SELECTORS.passwordInput);
    await passwordInput.fill(noCapitalPassword);
    await passwordInput.blur();

    const errorMsg = passwordInput
      .locator("..")
      .locator(REGISTRATION_SELECTORS.errorMessage);
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText(errorMessage);
    await expect(passwordInput).toHaveClass(/is-invalid/);
  });

  test("should show error when password has no small letter", async ({
    page,
  }) => {
    const noSmallPassword = `${faker.string.alpha({
      length: 8,
      casing: "upper",
    })}1`;
    const passwordInput = page.locator(REGISTRATION_SELECTORS.passwordInput);
    await passwordInput.fill(noSmallPassword);
    await passwordInput.blur();

    const errorMsg = passwordInput
      .locator("..")
      .locator(REGISTRATION_SELECTORS.errorMessage);
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText(errorMessage);
    await expect(passwordInput).toHaveClass(/is-invalid/);
  });
});

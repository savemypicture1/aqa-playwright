import { expect, test } from "@playwright/test";
import { REGISTRATION_SELECTORS } from "../../src/selectors.js";
import { faker } from "@faker-js/faker";

test.describe("Registration form - Last Name field validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator(REGISTRATION_SELECTORS.signUpButton).click();
  });

  test("should show error when Last Name field is empty", async ({ page }) => {
    const lastNameInput = page.locator(REGISTRATION_SELECTORS.lastNameInput);
    await lastNameInput.focus();
    await lastNameInput.blur();

    const errorMessage = lastNameInput
      .locator("..")
      .locator(REGISTRATION_SELECTORS.errorMessage);
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText("Last name required");
    await expect(lastNameInput).toHaveClass(/is-invalid/);
  });

  test("should show error for invalid characters in Last Name", async ({
    page,
  }) => {
    const lastNameInput = page.locator(REGISTRATION_SELECTORS.lastNameInput);
    await lastNameInput.fill("123");
    await lastNameInput.blur();

    const errorMessage = lastNameInput
      .locator("..")
      .locator(REGISTRATION_SELECTORS.errorMessage);
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText("Last name is invalid");
    await expect(lastNameInput).toHaveClass(/is-invalid/);
  });

  test("should show error when Last Name is less than 2 characters", async ({
    page,
  }) => {
    const lastNameInput = page.locator(REGISTRATION_SELECTORS.lastNameInput);
    await lastNameInput.fill("A");
    await lastNameInput.blur();

    const errorMessage = lastNameInput
      .locator("..")
      .locator(REGISTRATION_SELECTORS.errorMessage);
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
      "Last name has to be from 2 to 20 characters long",
    );
    await expect(lastNameInput).toHaveClass(/is-invalid/);
  });

  test("should show error when Last Name is more than 20 characters", async ({
    page,
  }) => {
    const longName = faker.string.alpha(21);
    const lastNameInput = page.locator(REGISTRATION_SELECTORS.lastNameInput);
    await lastNameInput.fill(longName);
    await lastNameInput.blur();

    const errorMessage = lastNameInput
      .locator("..")
      .locator(REGISTRATION_SELECTORS.errorMessage);
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
      "Last name has to be from 2 to 20 characters long",
    );
    await expect(lastNameInput).toHaveClass(/is-invalid/);
  });

  test("should trim spaces at the beginning and end", async ({ page }) => {
    const validLastName = faker.person.lastName();
    const validName = faker.person.firstName();
    const validEmail = `aqa-${faker.internet.email()}`;
    const validPassword = `${faker.string.alpha({
      length: 8,
      casing: "mixed",
    })}1`;

    await page
      .locator(REGISTRATION_SELECTORS.lastNameInput)
      .fill(`  ${validLastName}  `);
    await page.locator(REGISTRATION_SELECTORS.nameInput).fill(validName);
    await page.locator(REGISTRATION_SELECTORS.emailInput).fill(validEmail);
    await page
      .locator(REGISTRATION_SELECTORS.passwordInput)
      .fill(validPassword);
    await page
      .locator(REGISTRATION_SELECTORS.repeatPasswordInput)
      .fill(validPassword);
    await page.locator(REGISTRATION_SELECTORS.registerButton).click();

    const errorMessage = page
      .locator(REGISTRATION_SELECTORS.lastNameInput)
      .locator("..")
      .locator(REGISTRATION_SELECTORS.errorMessage);
    await expect(errorMessage).not.toBeVisible();
  });
});

import { expect, test } from "@playwright/test";
import { REGISTRATION_SELECTORS } from "../../src/selectors.js";
import { faker } from "@faker-js/faker";

test.describe("Registration form - Name field validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator(REGISTRATION_SELECTORS.signUpButton).click();
  });

  test("should show error when Name field is empty", async ({ page }) => {
    const nameInput = page.locator(REGISTRATION_SELECTORS.nameInput);
    await nameInput.focus();
    await nameInput.blur();

    const errorMessage = nameInput
      .locator("..")
      .locator(REGISTRATION_SELECTORS.errorMessage);
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText("Name required");
    await expect(nameInput).toHaveClass(/is-invalid/);
  });

  test("should show error for invalid characters in Name", async ({ page }) => {
    const nameInput = page.locator(REGISTRATION_SELECTORS.nameInput);
    await nameInput.fill("123");
    await nameInput.blur();

    const errorMessage = nameInput
      .locator("..")
      .locator(REGISTRATION_SELECTORS.errorMessage);
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText("Name is invalid");
    await expect(nameInput).toHaveClass(/is-invalid/);
  });

  test("should show error when Name is less than 2 characters", async ({
    page,
  }) => {
    const nameInput = page.locator(REGISTRATION_SELECTORS.nameInput);
    await nameInput.fill("A");
    await nameInput.blur();

    const errorMessage = nameInput
      .locator("..")
      .locator(REGISTRATION_SELECTORS.errorMessage);
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
      "Name has to be from 2 to 20 characters long",
    );
    await expect(nameInput).toHaveClass(/is-invalid/);
  });

  test("should show error when Name is more than 20 characters", async ({
    page,
  }) => {
    const longName = faker.string.alpha(21);
    const nameInput = page.locator(REGISTRATION_SELECTORS.nameInput);
    await nameInput.fill(longName);
    await nameInput.blur();

    const errorMessage = nameInput
      .locator("..")
      .locator(REGISTRATION_SELECTORS.errorMessage);
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
      "Name has to be from 2 to 20 characters long",
    );
    await expect(nameInput).toHaveClass(/is-invalid/);
  });

  test("should trim spaces at the beginning and end", async ({ page }) => {
    const validName = faker.person.firstName();
    const validLastName = faker.person.lastName();
    const validEmail = `aqa-${faker.internet.email()}`;
    const validPassword = `${faker.string.alpha({
      length: 8,
      casing: "mixed",
    })}1`;

    await page
      .locator(REGISTRATION_SELECTORS.nameInput)
      .fill(`  ${validName}  `);
    await page
      .locator(REGISTRATION_SELECTORS.lastNameInput)
      .fill(validLastName);
    await page.locator(REGISTRATION_SELECTORS.emailInput).fill(validEmail);
    await page
      .locator(REGISTRATION_SELECTORS.passwordInput)
      .fill(validPassword);
    await page
      .locator(REGISTRATION_SELECTORS.repeatPasswordInput)
      .fill(validPassword);
    await page.locator(REGISTRATION_SELECTORS.registerButton).click();

    const errorMessage = page
      .locator(REGISTRATION_SELECTORS.nameInput)
      .locator("..")
      .locator(REGISTRATION_SELECTORS.errorMessage);
    await expect(errorMessage).not.toBeVisible();
  });
});

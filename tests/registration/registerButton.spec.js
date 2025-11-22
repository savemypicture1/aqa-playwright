import { expect, test } from "@playwright/test";
import { REGISTRATION_SELECTORS } from "../../src/selectors.js";
import { faker } from "@faker-js/faker";

test.describe("Registration form - Register button", () => {
  const generateValidPassword = () => {
    return `${faker.string.alpha({ length: 8, casing: "mixed" })}1`;
  };

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator(REGISTRATION_SELECTORS.signUpButton).click();
  });

  test("should be disabled when form has invalid data", async ({ page }) => {
    const validName = faker.person.firstName();
    const validLastName = faker.person.lastName();
    const invalidEmail = "invalid-email";
    const validPassword = generateValidPassword();

    await page.locator(REGISTRATION_SELECTORS.nameInput).fill(validName);
    await page
      .locator(REGISTRATION_SELECTORS.lastNameInput)
      .fill(validLastName);
    await page.locator(REGISTRATION_SELECTORS.emailInput).fill(invalidEmail);
    await page
      .locator(REGISTRATION_SELECTORS.passwordInput)
      .fill(validPassword);
    await page
      .locator(REGISTRATION_SELECTORS.repeatPasswordInput)
      .fill(validPassword);

    await expect(
      page.locator(REGISTRATION_SELECTORS.registerButton),
    ).toBeDisabled();
  });

  test("should be enabled when all fields are valid", async ({ page }) => {
    const validName = faker.person.firstName();
    const validLastName = faker.person.lastName();
    const validEmail = `aqa-${faker.internet.email()}`;
    const validPassword = generateValidPassword();

    await page.locator(REGISTRATION_SELECTORS.nameInput).fill(validName);
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

    await expect(
      page.locator(REGISTRATION_SELECTORS.registerButton),
    ).toBeEnabled();
  });

  test("should create new user when clicked Register buttton with valid data", async ({
    page,
  }) => {
    const validName = faker.person.firstName();
    const validLastName = faker.person.lastName();
    const validEmail = `aqa-${faker.internet.email()}`;
    const validPassword = generateValidPassword();

    await page.locator(REGISTRATION_SELECTORS.nameInput).fill(validName);
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

    await expect(page).toHaveURL(/.*\/panel\/garage/);
  });
});

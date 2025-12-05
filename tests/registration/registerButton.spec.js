import { expect, test } from "@playwright/test";
import { FakerHelper } from "#src/helpers/faker.js";
import { SignupResponseSchema } from "#src/models/signupResponse.js";
import { GaragePage } from "#src/pageObjects/garage/GaragePage.js";
import { SignUpForm } from "#src/pageObjects/main/components/SignUpForm.js";
import { MainPage } from "#src/pageObjects/main/MainPage.js";

test.describe("Registration form - Register button", () => {
  let mainPage;
  let signUpForm;
  let garagePage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    signUpForm = new SignUpForm(page);
    garagePage = new GaragePage(page);
    await mainPage.openPage();
    await mainPage.clickSignUpButton();
  });

  test("should be disabled when form has invalid data", async () => {
    const validLastName = FakerHelper.generateLastName();
    const validName = FakerHelper.generateName();
    const invalidEmail = FakerHelper.getRandomWrongEmail();
    const validPassword = FakerHelper.generatePassword();

    await signUpForm.fillSignUpForm({
      name: validName,
      lastName: validLastName,
      email: invalidEmail,
      password: validPassword,
      repeatPassword: validPassword,
    });
    await expect(signUpForm.registerButton).toBeDisabled();
  });

  test("should be enabled when all fields are valid", async () => {
    const validLastName = FakerHelper.generateLastName();
    const validName = FakerHelper.generateName();
    const validEmail = FakerHelper.generateEmail();
    const validPassword = FakerHelper.generatePassword();

    await signUpForm.fillSignUpForm({
      name: validName,
      lastName: validLastName,
      email: validEmail,
      password: validPassword,
      repeatPassword: validPassword,
    });
    await expect(signUpForm.registerButton).toBeEnabled();
  });

  test("should create new user when clicked Register buttton with valid data", async () => {
    const validLastName = FakerHelper.generateLastName();
    const validName = FakerHelper.generateName();
    const validEmail = FakerHelper.generateEmail();
    const validPassword = FakerHelper.generatePassword();

    await signUpForm.fillSignUpForm({
      name: validName,
      lastName: validLastName,
      email: validEmail,
      password: validPassword,
      repeatPassword: validPassword,
    });
    const signUpResponsePromise = signUpForm.waitForSignUpResponse(201);

    await signUpForm.clickRegisterButton();

    await test.step("Check Sign up response", async () => {
      const signupResponse = await signUpResponsePromise;
      const signupData = await signupResponse.json();
      const validatedSignupData = SignupResponseSchema.parse(signupData);

      expect(validatedSignupData.status).toBe("ok");
    });

    await expect(garagePage.page).toHaveURL(garagePage._url);
  });
});

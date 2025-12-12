import { test } from "@playwright/test";
import { SIGN_UP_TEXT } from "#src/enums/signup.js";
import { FakerHelper } from "#src/helpers/faker.js";
import { SignUpForm } from "#src/pageObjects/main/components/SignUpForm.js";
import { MainPage } from "#src/pageObjects/main/MainPage.js";

test.describe("Registration form - Name field validation", () => {
  let mainPage;
  let signUpForm;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    signUpForm = new SignUpForm(page);
    await mainPage.openPage();
    await mainPage.clickSignUpButton();
  });

  test("should show error when Name field is empty", async () => {
    await signUpForm.focusAndBlurInput(signUpForm.nameInput);
    await signUpForm.checkInputHasError(
      signUpForm.nameInput,
      signUpForm.nameFieldErrorMessage,
      SIGN_UP_TEXT.NAME_REQUIRED,
    );
  });

  test("should show error for invalid characters in Name", async () => {
    await signUpForm.fillNameField("123");
    await signUpForm.focusAndBlurInput(signUpForm.nameInput);
    await signUpForm.checkInputHasError(
      signUpForm.nameInput,
      signUpForm.nameFieldErrorMessage,
      SIGN_UP_TEXT.NAME_INVALID,
    );
  });

  test("should show error when Name is less than 2 characters", async () => {
    const shortName = FakerHelper.generateString(1);

    await signUpForm.fillNameField(shortName);
    await signUpForm.focusAndBlurInput(signUpForm.nameInput);
    await signUpForm.checkInputHasError(
      signUpForm.nameInput,
      signUpForm.nameFieldErrorMessage,
      SIGN_UP_TEXT.NAME_RANGE,
    );
  });

  test("should show error when Name is more than 20 characters", async () => {
    const longName = FakerHelper.generateString(21);

    await signUpForm.fillNameField(longName);
    await signUpForm.focusAndBlurInput(signUpForm.nameInput);
    await signUpForm.checkInputHasError(
      signUpForm.nameInput,
      signUpForm.nameFieldErrorMessage,
      SIGN_UP_TEXT.NAME_RANGE,
    );
  });

  test("should trim spaces at the beginning and end", async () => {
    const validLastName = FakerHelper.generateLastName();
    const validName = FakerHelper.generateName();
    const validEmail = FakerHelper.generateEmail();
    const validPassword = FakerHelper.generatePassword();

    await signUpForm.fillSignUpForm({
      name: `  ${validName}  `,
      lastName: validLastName,
      email: validEmail,
      password: validPassword,
      repeatPassword: validPassword,
    });
    await signUpForm.checkInputHasError(
      signUpForm.nameInput,
      signUpForm.nameFieldErrorMessage,
      SIGN_UP_TEXT.NAME_INVALID,
    );
  });
});

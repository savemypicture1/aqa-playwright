import { test } from "@playwright/test";
import { SignUpEnum } from "#src/enums/signup.js";
import { FakerHelper } from "#src/helpers/faker.js";
import { SignUpForm } from "#src/pageObjects/main/components/SignUpForm.js";
import { MainPage } from "#src/pageObjects/main/MainPage.js";

test.describe("Registration form - Password field validation", () => {
  let mainPage;
  let signUpForm;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    signUpForm = new SignUpForm(page);
    await mainPage.openMainPage();
    await mainPage.clickSignUpButton();
  });

  test("should show error when Password field is empty", async () => {
    await signUpForm.focusAndBlurInput(signUpForm.passwordInput);
    await signUpForm.checkInputHasError(
      signUpForm.passwordInput,
      signUpForm.passwordFieldErrorMessage,
      SignUpEnum.PASSWORD_REQUIRED,
    );
  });

  test("should show error when password is less than 8 characters", async () => {
    const shortPassword = FakerHelper.generateString(7);

    await signUpForm.enterText(signUpForm.passwordInput, shortPassword);
    await signUpForm.focusAndBlurInput(signUpForm.passwordInput);
    await signUpForm.checkInputHasError(
      signUpForm.passwordInput,
      signUpForm.passwordFieldErrorMessage,
      SignUpEnum.PASSWORD_INVALID,
    );
  });

  test("should show error when password is more than 15 characters", async () => {
    const longPassword = FakerHelper.generateString(16);

    await signUpForm.enterText(signUpForm.passwordInput, longPassword);
    await signUpForm.focusAndBlurInput(signUpForm.passwordInput);
    await signUpForm.checkInputHasError(
      signUpForm.passwordInput,
      signUpForm.passwordFieldErrorMessage,
      SignUpEnum.PASSWORD_INVALID,
    );
  });

  test("should show error when password has no integer", async () => {
    const noIntPassword = FakerHelper.generatePassword(8, false);

    await signUpForm.enterText(signUpForm.passwordInput, noIntPassword);
    await signUpForm.focusAndBlurInput(signUpForm.passwordInput);
    await signUpForm.checkInputHasError(
      signUpForm.passwordInput,
      signUpForm.passwordFieldErrorMessage,
      SignUpEnum.PASSWORD_INVALID,
    );
  });

  test("should show error when password has no capital letter", async () => {
    const noCapitalPassword = FakerHelper.generatePassword(8, true, "lower");

    await signUpForm.enterText(signUpForm.passwordInput, noCapitalPassword);
    await signUpForm.focusAndBlurInput(signUpForm.passwordInput);
    await signUpForm.checkInputHasError(
      signUpForm.passwordInput,
      signUpForm.passwordFieldErrorMessage,
      SignUpEnum.PASSWORD_INVALID,
    );
  });

  test("should show error when password has no small letter", async () => {
    const noSmallPassword = FakerHelper.generatePassword(8, true, "upper");

    await signUpForm.enterText(signUpForm.passwordInput, noSmallPassword);
    await signUpForm.focusAndBlurInput(signUpForm.passwordInput);
    await signUpForm.checkInputHasError(
      signUpForm.passwordInput,
      signUpForm.passwordFieldErrorMessage,
      SignUpEnum.PASSWORD_INVALID,
    );
  });
});

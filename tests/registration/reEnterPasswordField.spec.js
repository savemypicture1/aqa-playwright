import { test } from "@playwright/test";
import { SignUpEnum } from "#src/enums/signup.js";
import { FakerHelper } from "#src/helpers/faker.js";
import { SignUpForm } from "#src/pageObjects/main/components/SignUpForm.js";
import { MainPage } from "#src/pageObjects/main/MainPage.js";

test.describe("Registration form - Re-enter Password field validation", () => {
  let mainPage;
  let signUpForm;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    signUpForm = new SignUpForm(page);
    await mainPage.openMainPage();
    await mainPage.clickSignUpButton();
  });

  test("should show error when Re-enter Password field is empty", async () => {
    await signUpForm.focusAndBlurInput(signUpForm.repeatPasswordInput);
    await signUpForm.checkInputHasError(
      signUpForm.repeatPasswordInput,
      signUpForm.reEnterPasswordFieldErrorMessage,
      SignUpEnum.REENTER_PASSWORD_REQUIRED,
    );
  });

  test("should show error when passwords do not match", async () => {
    const password = FakerHelper.generatePassword();
    const repeatPassword = FakerHelper.generatePassword();

    await signUpForm.enterText(signUpForm.passwordInput, password);
    await signUpForm.enterText(signUpForm.repeatPasswordInput, repeatPassword);
    await signUpForm.focusAndBlurInput(signUpForm.repeatPasswordInput);
    await signUpForm.checkInputHasError(
      signUpForm.repeatPasswordInput,
      signUpForm.reEnterPasswordFieldErrorMessage,
      SignUpEnum.PASSWORDS_DO_NOT_MATCH,
    );
  });

  test("should accept matching passwords", async () => {
    const validPassword = FakerHelper.generatePassword();

    await signUpForm.enterText(signUpForm.passwordInput, validPassword);
    await signUpForm.enterText(signUpForm.repeatPasswordInput, validPassword);
    await signUpForm.focusAndBlurInput(signUpForm.repeatPasswordInput);
    await signUpForm.toHaveClass(signUpForm.repeatPasswordInput, /ng-valid/);
  });
});

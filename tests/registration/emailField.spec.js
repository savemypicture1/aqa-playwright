import { test } from "@playwright/test";
import { SignUpEnum } from "#src/enums/signup.js";
import { SignUpForm } from "#src/pageObjects/main/components/SignUpForm.js";
import { MainPage } from "#src/pageObjects/main/MainPage.js";
import { WRONG_EMAILS } from "#src/wrongEmails.js";

test.describe("Registration form - Email field validation", () => {
  let mainPage;
  let signUpForm;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    signUpForm = new SignUpForm(page);
    await mainPage.openMainPage();
    await mainPage.clickSignUpButton();
  });

  test("should show error when Email field is empty", async () => {
    await signUpForm.focusAndBlurInput(signUpForm.emailInput);
    await signUpForm.checkInputHasError(
      signUpForm.emailInput,
      signUpForm.emailFieldErrorMessage,
      SignUpEnum.EMAIL_REQUIRED,
    );
  });

  test("should show error for all incorrect email formats", async () => {
    for (const email of WRONG_EMAILS) {
      await signUpForm.enterText(signUpForm.emailInput, email);
      await signUpForm.focusAndBlurInput(signUpForm.emailInput);
      await signUpForm.checkInputHasError(
        signUpForm.emailInput,
        signUpForm.emailFieldErrorMessage,
        SignUpEnum.EMAIL_IS_INCORRECT,
      );
    }
  });
});

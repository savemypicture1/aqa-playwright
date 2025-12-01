import { test } from "@playwright/test";
import { SIGN_UP_TEXT } from "#src/enums/signup.js";
import { SignUpForm } from "#src/pageObjects/main/components/SignUpForm.js";
import { MainPage } from "#src/pageObjects/main/MainPage.js";

test.describe("Registration form - Base UI", () => {
  let mainPage;
  let signUpForm;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    signUpForm = new SignUpForm(page);
    await mainPage.openPage();
    await mainPage.clickSignUpButton();
  });

  test("should display registration form with all required fields", async () => {
    await signUpForm.areElementsDisplayed();
    await signUpForm.checkModalTitle(SIGN_UP_TEXT.TITLE);
  });
});

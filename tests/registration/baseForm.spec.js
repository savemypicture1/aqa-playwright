import { test } from "@playwright/test";
import { SignUpEnum } from "#src/enums/signup.js";
import { SignUpForm } from "#src/pageObjects/main/components/SignUpForm.js";
import { MainPage } from "#src/pageObjects/main/MainPage.js";

test.describe("Registration form - Base UI", () => {
  let mainPage;
  let signUpForm;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    signUpForm = new SignUpForm(page);
    await mainPage.openMainPage();
    await mainPage.clickSignUpButton();
  });

  test("should display registration form with all required fields", async () => {
    await signUpForm.areElementsDisplayed();
    await signUpForm.checkModalTitle(SignUpEnum.TITLE);
  });
});

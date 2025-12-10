import { expect, test as setup } from "@playwright/test";
import { config } from "../../config/config.js";
import { Header } from "#src/pageObjects/main/components/Header.js";
import { SignInForm } from "#src/pageObjects/main/components/SignInForm.js";
import { MainPage } from "#src/pageObjects/main/MainPage.js";

setup("Login as user", async ({ page, context }) => {
  const credentials = {
    email: config.userCredentials.email,
    password: config.userCredentials.password,
  };

  const mainPage = new MainPage(page);
  const header = new Header(page);
  const signInForm = new SignInForm(page);

  await mainPage.openPage();
  await header.clickSignInButton();
  await signInForm.fillSignInForm(credentials);
  await signInForm.clickLoginButton();
  await expect(signInForm.page.getByText("Log out")).toBeVisible();
  await context.storageState({
    path: config.userStatePath,
  });
});

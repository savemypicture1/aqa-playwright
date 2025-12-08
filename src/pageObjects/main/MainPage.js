import { test } from "@playwright/test";
import { BasePage } from "#src/pageObjects/BasePage.js";

export class MainPage extends BasePage {
  signUpButton = this.page.locator(".hero-descriptor button");

  constructor(page) {
    super(page, "/");
  }

  async clickSignUpButton() {
    await test.step("Click Sign up button", async () => {
      await this.signUpButton.click();
    });
  }
}

import { test } from "@playwright/test";
import { BaseComponent } from "#src/pageObjects/BaseComponent.js";

export class Header extends BaseComponent {
  header = this.page.locator(".header");
  signInButton = this.header.locator(".header_right button:nth-of-type(2)");

  constructor(page) {
    super(page);
  }

  async clickSignInButton() {
    await test.step("Click Sign in button", async () => {
      await this.signInButton.click();
    });
  }
}

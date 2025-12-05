import { test } from "@playwright/test";
import { BaseComponent } from "#src/pageObjects/BaseComponent.js";

export class SignInForm extends BaseComponent {
  signInForm = this.page.locator(".modal-body");
  emailInput = this.signInForm.locator("#signinEmail");
  passwordInput = this.signInForm.locator("#signinPassword");
  loginButton = this.page.locator(".modal-footer button:nth-of-type(2)");

  constructor(page) {
    super(page);
  }

  async fillSignInForm({ email, password }) {
    await test.step("Fill Sign in form", async () => {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
    });
  }

  async clickLoginButton() {
    await test.step("Click Login button", async () => {
      await this.loginButton.click();
    });
  }
}

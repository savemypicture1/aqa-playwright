import { expect, test } from "@playwright/test";
import { BaseComponent } from "#src/pageObjects/BaseComponent.js";

export class SignUpForm extends BaseComponent {
  modalTitle = ".modal-title";
  closeButton = ".close";
  nameInput = "#signupName";
  lastNameInput = "#signupLastName";
  emailInput = "#signupEmail";
  passwordInput = "#signupPassword";
  repeatPasswordInput = "#signupRepeatPassword";
  registerButton = ".modal-footer button";
  nameFieldErrorMessage =
    ".modal-body .form-group:nth-child(1) .invalid-feedback p";
  lastNameFieldErrorMessage =
    ".modal-body .form-group:nth-child(2) .invalid-feedback p";
  emailFieldErrorMessage =
    ".modal-body .form-group:nth-child(3) .invalid-feedback p";
  passwordFieldErrorMessage =
    ".modal-body .form-group:nth-child(4) .invalid-feedback p";
  reEnterPasswordFieldErrorMessage =
    ".modal-body .form-group:nth-child(5) .invalid-feedback p";

  constructor(page) {
    super(page);
  }

  async checkModalTitle(expectedText) {
    await test.step(`Check modal title contains "${expectedText}"`, async () => {
      await expect(this.page.locator(this.modalTitle)).toContainText(
        expectedText,
      );
    });
  }

  async areElementsDisplayed() {
    await test.step("Check all Sign up form elements are displayed", async () => {
      await Promise.all([
        this.isElementDisplayed(this.modalTitle),
        this.isElementDisplayed(this.closeButton),
        this.isElementDisplayed(this.nameInput),
        this.isElementDisplayed(this.lastNameInput),
        this.isElementDisplayed(this.emailInput),
        this.isElementDisplayed(this.passwordInput),
        this.isElementDisplayed(this.repeatPasswordInput),
        this.isElementDisplayed(this.registerButton),
      ]);
    });
  }

  async fillSignUpForm({ name, lastName, email, password, repeatPassword }) {
    await test.step("Fill Sign up form", async () => {
      await this.enterText(this.nameInput, name);
      await this.enterText(this.lastNameInput, lastName);
      await this.enterText(this.emailInput, email);
      await this.enterText(this.passwordInput, password);
      await this.enterText(this.repeatPasswordInput, repeatPassword);
    });
  }

  async checkRegisterButtonIsDisabled() {
    await test.step("Check Register button is disabled", async () => {
      const element = await this.isElementDisplayed(this.registerButton);
      await expect(element).toBeDisabled();
    });
  }

  async checkRegisterButtonIsEnabled() {
    await test.step("Check Register button is enabled", async () => {
      const element = await this.isElementDisplayed(this.registerButton);
      await expect(element).toBeEnabled();
    });
  }

  async clickRegisterButton() {
    await this.click(this.registerButton);
  }

  async waitForSignUpResponse(statusCode) {
    return await this.waitForApiResponse("/api/auth/signup", statusCode);
  }
}

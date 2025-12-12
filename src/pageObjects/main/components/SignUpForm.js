import { expect, test } from "@playwright/test";
import { BaseComponent } from "#src/pageObjects/BaseComponent.js";

export class SignUpForm extends BaseComponent {
  modalTitle = this.page.locator(".modal-title");
  closeButton = this.page.locator(".close");
  sigUpForm = this.page.locator(".modal-body");
  nameInput = this.sigUpForm.locator("#signupName");
  lastNameInput = this.sigUpForm.locator("#signupLastName");
  emailInput = this.sigUpForm.locator("#signupEmail");
  passwordInput = this.sigUpForm.locator("#signupPassword");
  repeatPasswordInput = this.sigUpForm.locator("#signupRepeatPassword");
  registerButton = this.page.locator(".modal-footer button");
  nameFieldErrorMessage = this.page.locator(
    ".modal-body .form-group:nth-child(1) .invalid-feedback p",
  );
  lastNameFieldErrorMessage = this.page.locator(
    ".modal-body .form-group:nth-child(2) .invalid-feedback p",
  );
  emailFieldErrorMessage = this.page.locator(
    ".modal-body .form-group:nth-child(3) .invalid-feedback p",
  );
  passwordFieldErrorMessage = this.page.locator(
    ".modal-body .form-group:nth-child(4) .invalid-feedback p",
  );
  reEnterPasswordFieldErrorMessage = this.page.locator(
    ".modal-body .form-group:nth-child(5) .invalid-feedback p",
  );

  constructor(page) {
    super(page);
  }

  async areElementsDisplayed() {
    await test.step("Check all Sign up form elements are displayed", async () => {
      await Promise.all([
        expect(this.modalTitle).toBeVisible(),
        expect(this.closeButton).toBeVisible(),
        expect(this.nameInput).toBeVisible(),
        expect(this.lastNameInput).toBeVisible(),
        expect(this.emailInput).toBeVisible(),
        expect(this.passwordInput).toBeVisible(),
        expect(this.repeatPasswordInput).toBeVisible(),
        expect(this.registerButton).toBeVisible(),
      ]);
    });
  }

  async fillNameField(name) {
    await test.step("Fill Name field", async () => {
      await this.nameInput.fill(name);
    });
  }

  async fillLastNameField(lastName) {
    await test.step("Fill Last Name field", async () => {
      await this.lastNameInput.fill(lastName);
    });
  }

  async fillEmailField(email) {
    await test.step("Fill Email field", async () => {
      await this.emailInput.fill(email);
    });
  }

  async fillPasswordField(password) {
    await test.step("Fill Password field", async () => {
      await this.passwordInput.fill(password);
    });
  }

  async fillRepeatPasswordField(repeatPassword) {
    await test.step("Fill Repeat Password field", async () => {
      await this.repeatPasswordInput.fill(repeatPassword);
    });
  }

  async fillSignUpForm({ name, lastName, email, password, repeatPassword }) {
    await test.step("Fill Sign up form", async () => {
      await this.fillNameField(name);
      await this.fillLastNameField(lastName);
      await this.fillEmailField(email);
      await this.fillPasswordField(password);
      await this.fillRepeatPasswordField(repeatPassword);
    });
  }

  async clickRegisterButton() {
    await test.step("Click Register button", async () => {
      await this.registerButton.click();
    });
  }

  async waitForSignUpResponse(statusCode) {
    return await this.waitForApiResponse("/api/auth/signup", statusCode);
  }

  async checkInputHasError(inputLocator, errorLocator, expectedErrorText) {
    await test.step(`Check input "${inputLocator}" has error: "${expectedErrorText}"`, async () => {
      await expect(errorLocator).toHaveText(expectedErrorText);
      await expect(inputLocator).toHaveClass(/is-invalid/);
    });
  }
}

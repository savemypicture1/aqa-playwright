import { expect, test } from "@playwright/test";
import { BasePage } from "#src/pageObjects/BasePage.js";

export class BaseComponent extends BasePage {
  constructor(page) {
    super(page, "");
  }

  async checkInputHasError(inputLocator, errorLocator, expectedErrorText) {
    await test.step(`Check input "${inputLocator}" has error: "${expectedErrorText}"`, async () => {
      const errorMessage = await this.getText(errorLocator);
      expect(errorMessage).toBe(expectedErrorText);

      await this.toHaveClass(inputLocator, /is-invalid/);
    });
  }
}

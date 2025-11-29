import { expect, test } from "@playwright/test";

export class BasePage {
  constructor(page, url) {
    this.page = page;
    this._url = url;
  }

  async openPage() {
    await this.page.goto(this._url, { waitUntil: "domcontentloaded" });
  }

  async assertElementVisible(locator) {
    const element = this.page.locator(locator);
    await expect(element).toBeVisible();

    return element;
  }

  async assertElementHidden(locator) {
    const element = this.page.locator(locator);
    await expect(element).toBeHidden();

    return element;
  }

  async focusAndBlurInput(locator) {
    await test.step(`Focus and blur ${locator}`, async () => {
      const input = await this.assertElementVisible(locator);
      await input.focus();
      await input.blur();
    });
  }

  async click(locator) {
    await test.step(`Click ${locator}`, async () => {
      const button = await this.assertElementVisible(locator);

      await button.click();
    });
  }

  async enterText(locator, text) {
    await test.step(`Enter ${text} to ${locator}`, async () => {
      const element = await this.assertElementVisible(locator);

      await element.fill(text);

      if ((await element.inputValue()) !== text) {
        throw new Error(`Text is not entered correctly in element: ${locator}`);
      }
    });
  }

  async toHaveText(locator, expectedText) {
    const element = await this.assertElementVisible(locator);
    await expect(element).toHaveText(expectedText);
  }

  async toHaveClass(locator, expectedClass) {
    const element = await this.assertElementVisible(locator);
    await expect(element).toHaveClass(expectedClass);
  }

  async waitForApiResponse(urlPattern, expectedStatus) {
    const response = await this.page.waitForResponse(
      (res) =>
        res.url().endsWith(urlPattern) && res.status() === expectedStatus,
    );

    return response;
  }
}

import { expect, test } from "@playwright/test";

export class BasePage {
  constructor(page, url) {
    this.page = page;
    this._url = url;
  }

  async openPage(url) {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
  }

  async isOpened(url) {
    await expect(this.page).toHaveURL(url);
  }

  async isElementDisplayed(locator) {
    const element = this.page.locator(locator);
    await expect(element).toBeVisible();

    return element;
  }

  async isElementNotDisplayed(locator) {
    const element = this.page.locator(locator);
    await expect(element).toBeHidden();

    return element;
  }

  async getText(locator) {
    return await test.step(`Get text from ${locator}`, async () => {
      const element = await this.isElementDisplayed(locator);

      return (await element.textContent()) ?? "";
    });
  }

  async focusAndBlurInput(locator) {
    await test.step(`Focus and blur ${locator}`, async () => {
      const input = await this.isElementDisplayed(locator);
      await input.focus();
      await input.blur();
    });
  }

  async click(locator) {
    await test.step(`Click ${locator}`, async () => {
      const button = await this.isElementDisplayed(locator);

      await button.click();
    });
  }

  getUrl() {
    return this.page.url();
  }

  async enterText(locator, text) {
    await test.step(`Enter ${text} to ${locator}`, async () => {
      const element = await this.isElementDisplayed(locator);

      await element.fill(text);

      if ((await element.inputValue()) !== text) {
        throw new Error(`Text is not entered correctly in element: ${locator}`);
      }
    });
  }

  async toHaveClass(locator, expectedClass) {
    const element = await this.isElementDisplayed(locator);
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

import { test } from "@playwright/test";

export class BasePage {
  constructor(page, url) {
    this.page = page;
    this._url = url;
  }

  async openPage() {
    await this.page.goto(this._url, { waitUntil: "domcontentloaded" });
  }

  async focusAndBlurInput(locator) {
    await test.step(`Focus and blur ${locator}`, async () => {
      await locator.focus();
      await locator.blur();
    });
  }

  async waitForApiResponse(urlPattern, expectedStatus) {
    const response = await this.page.waitForResponse(
      (res) =>
        res.url().endsWith(urlPattern) && res.status() === expectedStatus,
    );

    return response;
  }
}

import { test as base } from "playwright/test";
import { MainPage } from "#src/pageObjects/main/MainPage.js";

export const baseCustomFixture = base.extend({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await mainPage.openPage();
    await use(mainPage);
  },
});

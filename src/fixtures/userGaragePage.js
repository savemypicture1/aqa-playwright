import { config } from "../../config/config.js";
import { baseCustomFixture as base } from "./baseFixture.js";
import { GaragePage } from "#src/pageObjects/garage/GaragePage.js";

export const userGaragePage = base.extend({
  page: async ({ browser }, use) => {
    const ctx = await browser.newContext({
      storageState: config.userStatePath,
    });
    const page = await ctx.newPage();
    await use(page);
  },
  garagePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);
    await garagePage.openPage();
    await use(garagePage);
  },
});

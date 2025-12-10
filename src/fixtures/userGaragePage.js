import { baseLoggedInFixture as base } from "./baseLoggedInFixture.js";
import { GaragePage } from "#src/pageObjects/garage/GaragePage.js";

export const userGaragePage = base.extend({
  garagePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);
    await garagePage.openPage();
    await use(garagePage);
  },
});

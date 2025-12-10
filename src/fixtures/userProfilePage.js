import { baseLoggedInFixture as base } from "./baseLoggedInFixture.js";
import { ProfilePage } from "#src/pageObjects/profile/ProfilePage.js";

export const userProfilePage = base.extend({
  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);
    await use(profilePage);
  },
});

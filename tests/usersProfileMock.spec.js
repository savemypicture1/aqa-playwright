import { expect } from "@playwright/test";
import { userProfilePage } from "#src/fixtures/userProfilePage.js";

userProfilePage.describe("User Profile - Mocked Response", () => {
  userProfilePage(
    "should display user profile data matching mocked API response",
    async ({ page, profilePage }) => {
      const mockedUserProfile = {
        status: "ok",
        data: {
          userId: 309700,
          photoFilename: "default-user.png",
          name: "Hello",
          lastName: "World",
        },
      };

      await page.route("**api/users/profile", async (route) => {
        await route.fulfill({
          status: 200,
          body: JSON.stringify(mockedUserProfile),
        });
      });

      await profilePage.openPage();

      await expect(profilePage.profileName).toHaveText(
        `${mockedUserProfile.data.name} ${mockedUserProfile.data.lastName}`,
      );
    },
  );
});

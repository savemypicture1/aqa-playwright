import { expect } from "@playwright/test";
import { userGaragePage } from "#src/fixtures/userGaragePage.js";

userGaragePage.describe("Sign in", () => {
  userGaragePage(
    "should navigate to garage page when user is logged in",
    async ({ garagePage }) => {
      await expect(garagePage.page).toHaveURL(garagePage._url);
    },
  );
});

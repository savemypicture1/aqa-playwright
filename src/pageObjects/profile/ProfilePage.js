import { BasePage } from "#src/pageObjects/BasePage.js";

export class ProfilePage extends BasePage {
  profileName = this.page.locator(".profile_name");

  constructor(page) {
    super(page, "/panel/profile");
  }
}

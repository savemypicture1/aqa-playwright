import { BasePage } from "#src/pageObjects/BasePage.js";

export class MainPage extends BasePage {
  signUpButton = ".hero-descriptor button";

  constructor(page) {
    super(page, "/");
  }

  async clickSignUpButton() {
    await this.click(this.signUpButton);
  }
}

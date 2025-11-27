import { BasePage } from "#src/pageObjects/BasePage.js";

export class MainPage extends BasePage {
  signUpButton = ".hero-descriptor button";

  constructor(page) {
    super(page, "/");
  }

  async openMainPage() {
    await this.openPage(this._url);
  }

  async clickSignUpButton() {
    await this.click(this.signUpButton);
  }
}

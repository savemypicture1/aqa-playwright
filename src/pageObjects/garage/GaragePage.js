import { BasePage } from "#src/pageObjects/BasePage.js";

export class GaragePage extends BasePage {
  constructor(page) {
    super(page, "/panel/garage");
  }
}

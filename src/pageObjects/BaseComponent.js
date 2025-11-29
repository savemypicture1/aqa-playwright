import { BasePage } from "#src/pageObjects/BasePage.js";

export class BaseComponent extends BasePage {
  constructor(page) {
    super(page, "");
  }
}

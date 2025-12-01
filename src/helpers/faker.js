import { faker } from "@faker-js/faker";
import { WRONG_EMAILS } from "#src/wrongEmails.js";

export class FakerHelper {
  static generateString(length) {
    return faker.string.alpha(length);
  }

  static generateName() {
    return faker.person.lastName();
  }

  static generateLastName() {
    return faker.person.lastName();
  }

  static generateEmail() {
    return `aqa-${faker.internet.email()}`;
  }

  static generatePassword(length = 8, withDigit = true, casing = "mixed") {
    if (!withDigit) {
      return faker.string.alpha({ length: length, casing: casing });
    }

    const letter = faker.string.alpha({ length: length - 1, casing: casing });
    const digit = faker.number.int({ min: 0, max: 9 });

    return `${letter}${digit}`;
  }

  static getRandomWrongEmail() {
    return faker.helpers.arrayElement(WRONG_EMAILS);
  }
}

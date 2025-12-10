import { CarsAPIController } from "#src/clients/controllers/CarsApiController.js";

export class ApiClient {
  constructor(request) {
    this.cars = new CarsAPIController(request);
  }
}

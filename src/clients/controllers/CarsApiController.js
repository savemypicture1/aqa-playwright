import { BaseController } from "#src/clients/controllers/BaseController.js";

export class CarsAPIController extends BaseController {
  _GET_CAR_MODELS_PATH = "/api/cars/models";
  _CREATE_CAR_PATH = "/api/cars";

  constructor(request) {
    super(request);
  }

  getCarModels() {
    return this.request.get(this._GET_CAR_MODELS_PATH);
  }

  createCar(carData) {
    return this.request.post(this._CREATE_CAR_PATH, {
      data: carData,
    });
  }

  getUserCars() {
    return this.request.get(this._CREATE_CAR_PATH);
  }

  deleteCar(id) {
    return this.request.delete(`${this._CREATE_CAR_PATH}/${id}`);
  }
}

import { baseLoggedInFixture as base } from "./baseLoggedInFixture.js";
import { FakerHelper } from "#src/helpers/faker.js";
import { carModelsResponseSchema } from "#src/models/carModelsResponseModel.js";

export const carTestDataFixture = base.extend({
  carData: async ({ apiClient }, use) => {
    const carModelsResponse = await apiClient.cars.getCarModels();
    const carModelsData = await carModelsResponse.json();
    const carModelsParsed = carModelsResponseSchema.parse(carModelsData);
    const randomModel = FakerHelper.getRandomArray(carModelsParsed.data);
    const carData = {
      carBrandId: randomModel.carBrandId,
      carModelId: randomModel.id,
      mileage: FakerHelper.generateRandomMileage(),
    };

    await use(carData);
  },
});

export const expect = base.expect;

import {
  carTestDataFixture as testWithCarData,
  expect,
} from "#src/fixtures/carTestDataFixture.js";
import { createdCarResponseSchema } from "#src/models/createCarResponseModel.js";
import { userCarsResponseSchema } from "#src/models/userCarsResponseModel.js";

testWithCarData.describe.only("Create car", () => {
  testWithCarData(
    "Should return array with one car after adding one car",
    async ({ apiClient, carData }) => {
      const createCarResponse = await apiClient.cars.createCar(carData);

      expect(createCarResponse.status()).toBe(201);

      const createCarResponseData = await createCarResponse.json();
      const createCarParsed = createdCarResponseSchema.parse(
        createCarResponseData,
      );

      expect(createCarParsed.data).toMatchObject({
        carBrandId: carData.carBrandId,
        carModelId: carData.carModelId,
        initialMileage: carData.mileage,
      });

      const userCarsResponse = await apiClient.cars.getUserCars();
      const userCarsResponseData = await userCarsResponse.json();
      const userCarsParsed = userCarsResponseSchema.parse(userCarsResponseData);

      expect(userCarsParsed.data).toHaveLength(1);
      expect(userCarsParsed.data[0]).toMatchObject({
        carBrandId: carData.carBrandId,
        carModelId: carData.carModelId,
        initialMileage: carData.mileage,
      });

      const deleteCarResponse = await apiClient.cars.deleteCar(
        createCarParsed.data.id,
      );

      expect(deleteCarResponse.status()).toBe(200);
    },
  );

  testWithCarData(
    "Should return 404 when creating car with invalid brand ID",
    async ({ apiClient, carData }) => {
      const invalidCarData = {
        ...carData,
        carBrandId: 99999,
      };

      const createCarResponse = await apiClient.cars.createCar(invalidCarData);

      expect(createCarResponse.status()).toBe(404);
      const errorData = await createCarResponse.json();
      expect(errorData.status).toBe("error");
    },
  );

  testWithCarData(
    "Should return 400 when creating car with negative mileage",
    async ({ apiClient, carData }) => {
      const invalidCarData = {
        ...carData,
        mileage: -100,
      };

      const createCarResponse = await apiClient.cars.createCar(invalidCarData);

      expect(createCarResponse.status()).toBe(400);
      const errorData = await createCarResponse.json();
      expect(errorData.status).toBe("error");
    },
  );
});

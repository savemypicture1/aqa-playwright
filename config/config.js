import dotenv from "dotenv";

dotenv.config();

export const config = {
  baseURL: process.env.BASE_URL,
  httpCredentials: {
    username: process.env.HTTP_CREDENTIALS_USERNAME,
    password: process.env.HTTP_CREDENTIALS_PASSWORD,
  },
  userCredentials: {
    email: process.env.USER_EMAIL,
    password: process.env.USER_PASSWORD,
  },
  userStatePath: "state/userStorageState.json",
};

import { defineConfig, devices } from "@playwright/test";
import { config } from "./config/config.js";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: true,
  retries: 1,
  workers: 3,
  reporter: [
    ["html", { open: "never" }],
    ["list", { printSteps: true }],
  ],
  timeout: 60000,
  use: {
    baseURL: config.baseURL,
    httpCredentials: {
      username: config.httpCredentials.username,
      password: config.httpCredentials.password,
    },
    trace: "retain-on-failure",
    screenshot: {
      mode: "only-on-failure",
      fullPage: true,
    },
    video: "retain-on-failure",
    actionTimeout: 20000,
    navigationTimeout: 30000,
    headless: true,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],
});

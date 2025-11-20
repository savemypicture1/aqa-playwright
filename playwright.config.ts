import { defineConfig, devices } from "@playwright/test";

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
    baseURL: "https://qauto.forstudy.space/",
    httpCredentials: {
      username: "guest",
      password: "welcome2qauto",
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

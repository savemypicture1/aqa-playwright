import { test as base, request as pwRequest } from "playwright/test";
import { config } from "../../config/config.js";
import { ApiClient } from "#src/clients/ApiClient.js";

export const baseLoggedInFixture = base.extend({
  page: async ({ browser }, use) => {
    const ctx = await browser.newContext({
      storageState: config.userStatePath,
    });
    const page = await ctx.newPage();
    await use(page);
  },
  request: async ({}, use) => {
    const ctx = await pwRequest.newContext({
      storageState: config.userStatePath,
    });

    await use(ctx);
  },
  apiClient: async ({ request }, use) => {
    const apiClient = new ApiClient(request);
    await use(apiClient);
  },
});

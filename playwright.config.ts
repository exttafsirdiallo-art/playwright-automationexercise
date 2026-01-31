import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // ✅ HTML + console lisible
  reporter: [["html"], ["line"]],

  // ✅ garde-fous
  timeout: 30_000,
  expect: { timeout: 5_000 },

  use: {
    baseURL: "https://automationexercise.com",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",

    // optionnel (mais utile)
    // actionTimeout: 10_000,
    // navigationTimeout: 15_000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});

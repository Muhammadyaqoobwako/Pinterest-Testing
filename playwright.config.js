const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 100000,
  use: {
    baseURL: "https://staging.meandem.vercel.app",
    browserName: "chromium",
    headless: true,
    fullyParallel: false,

  },
});

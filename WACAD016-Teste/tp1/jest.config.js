/** @type {import('jest').Config} */

const config = {
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/"],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/**/*.spec.js",
    "!src/**/*.test,js",
  ],
  // coverageDirectory: "coverage",
  // coverageProvider: "v8",
};

module.exports = config;

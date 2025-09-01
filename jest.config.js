module.exports = {
  testPathIgnorePatterns: [
    "<rootDir>/tests/",
    "<rootDir>/tests-examples/",
    "<rootDir>/playwright-report/",
    "<rootDir>/test-results/",
  ],
  testMatch: [
    "<rootDir>/packages/**/__tests__/**/*.test.ts",
    "<rootDir>/packages/**/__tests__/**/*.test.tsx",
  ],
};

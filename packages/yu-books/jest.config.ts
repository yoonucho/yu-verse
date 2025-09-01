import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig: Config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["<rootDir>/__tests__/**/*.test.ts"],
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};

export default createJestConfig(customJestConfig);

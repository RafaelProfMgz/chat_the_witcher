import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.ts and .env files
  dir: "./",
});

const config: Config = {
  // Use jsdom environment for DOM testing
  testEnvironment: "jsdom",

  // Setup files to run after jest is installed
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Module name mapper for @/* alias (matches tsconfig paths)
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // Test file patterns
  testMatch: ["**/__tests__/**/*.test.ts", "**/__tests__/**/*.test.tsx"],

  // Coverage configuration
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/layout.tsx",
    "!src/**/loading.tsx",
    "!src/**/not-found.tsx",
    "!src/**/error.tsx",
  ],

  // Coverage output directory
  coverageDirectory: "coverage",
};

// createJestConfig is exported this way to ensure that next/jest can load the
// Next.js config which is async
export default createJestConfig(config);

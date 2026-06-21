/* eslint-disable @typescript-eslint/no-require-imports */
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/app/**/*.{ts,tsx}',
    'src/lib/**/*.{ts,tsx}',
    'src/components/**/*.{ts,tsx}',
    '!src/app/layout.tsx',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^uuid$': '<rootDir>/__mocks__/uuid.js',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/', '<rootDir>/tests/'],
};

module.exports = createJestConfig(customJestConfig);

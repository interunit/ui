const path = require('path')

/** @type {import("jest").Config} */
module.exports = {
  verbose: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  collectCoverage: true,
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {presets: ['next/babel']}]
  },
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  testMatch: ['<rootDir>/**/*.test.{ts,tsx}'],
  setupFilesAfterEnv: [path.join(__dirname, './setupTests.js')]
}

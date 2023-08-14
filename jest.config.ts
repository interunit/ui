import type {Config} from 'jest'

const config: Config = {
  verbose: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  collectCoverage: true,
  testEnvironment: 'jsdom',
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['packages/**/*.{ts,tsx}'],
  testMatch: ['<rootDir>/packages/**/*.test.{ts,tsx}'],
  setupFilesAfterEnv: ['<rootDir>/tests/web/setupTests.ts']
}

export default config

import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const webConfig = {
  displayName: 'web',
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testMatch: ['**/*.test.{ts,tsx}'],
  setupFilesAfterEnv: [path.resolve(__dirname, './setupTests.js')],
  moduleNameMapper: {
    '^@interunit/((?!jest|babel|eslint|prettier|tsconfig|api-extractor).*)':
      path.resolve(__dirname, '../../$1/dist/index.js')
  }
}

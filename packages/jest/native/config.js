import path from 'path'
import {default as tsjPreset} from 'ts-jest/presets/index.js'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const nativeConfig = {
  ...tsjPreset.defaults,
  displayName: 'native',
  preset: 'react-native',
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  testEnvironment: 'node',
  setupFilesAfterEnv: [path.resolve(__dirname, './setupTests.js')],
  testMatch: ['**/*.test.native.{ts,tsx}'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)?$': [
      'babel-jest',
      {
        configFile: path.resolve(__dirname, './babel.cjs')
      }
    ]
  },
  globals: {
    __DEV__: true
  },
  moduleNameMapper: {
    '^@interunit/((?!jest|babel|eslint|prettier|tsconfig|api-extractor).*)':
      path.resolve(__dirname, '../../$1/src/index.ts')
  }
}

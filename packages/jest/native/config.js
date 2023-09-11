import path from 'path'
import {default as tsjPreset} from 'ts-jest/presets/index.js'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const nativeConfig = {
  ...tsjPreset.defaults,
  displayName: 'native',
  preset: 'jest-expo',
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  testMatch: ['**/*.test.native.{ts,tsx}'],
  transform: {
    '^.+\\.[t|j]sx?$': [
      'babel-jest',
      {
        configFile: path.resolve(__dirname, './native/babel.cjs')
      }
    ]
  },
  globals: {
    __DEV__: true
  },
  moduleNameMapper: {
    '^@testing-library/react-native$': path.resolve(
      __dirname,
      '../../node_modules/@testing-library/react-native/build'
    ),
    '^react-native$': path.resolve(__dirname, '../../node_modules/react-native')
  }
}

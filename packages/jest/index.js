import {nativeConfig} from './native/config.js'
import {webConfig} from './web/config.js'

export default {
  projects: [webConfig, nativeConfig],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.test.*',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**'
  ]
}

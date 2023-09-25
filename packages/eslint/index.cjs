/** @type {import("eslint").Linter.Config} */
module.exports = {
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    node: true,
    browser: true
  },
  plugins: ['@typescript-eslint', 'import'],
  overrides: [
    {
      env: {
        jest: true
      },
      files: ['*.test.js']
    }
  ],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off'
  },
  globals: {
    React: true,
    JSX: true
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/', 'coverage/', 'public/']
}

const sortImports = require('@trivago/prettier-plugin-sort-imports')
const packageJson = require('prettier-plugin-packagejson')

/** @type {import("prettier").Options} */
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: false,
  arrowParens: 'avoid',
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@/(.*|\\/.)',
    '^(..)\\/.*',
    '^(.)\\/.*'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [sortImports, packageJson]
}

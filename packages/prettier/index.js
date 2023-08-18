import sortImports from '@trivago/prettier-plugin-sort-imports'
import packageJson from 'prettier-plugin-packagejson'

/** @type {import("prettier").Options} */
export default {
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

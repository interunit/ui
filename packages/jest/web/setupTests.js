require('@testing-library/jest-dom')
require('@testing-library/jest-dom/jest-globals.js')
const pkg = require('jest-axe')

const toHaveNoViolations = pkg.toHaveNoViolations

// eslint-disable-next-line no-undef
expect.extend(toHaveNoViolations)

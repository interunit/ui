require('@testing-library/jest-dom')
const pkg = require('jest-axe')

const toHaveNoViolations = pkg.toHaveNoViolations

// eslint-disable-next-line no-undef
expect.extend(toHaveNoViolations)

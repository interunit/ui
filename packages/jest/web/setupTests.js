require('@testing-library/jest-dom')
require('@testing-library/jest-dom/jest-globals.js')
const {toHaveNoViolations} = require('jest-axe')
// eslint-disable-next-line no-undef
expect.extend(toHaveNoViolations)

const axe = require('./axe')
const rtl = require('./rtl')
const userEvent = require('./userEvent')

module.exports = {
  ...rtl,
  ...axe,
  userEvent
}

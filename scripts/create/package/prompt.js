module.exports = [
  {
    type: 'input',
    name: 'packageName',
    message: 'Name of package:'
  },
  {
    type: 'input',
    name: 'packageDescription',
    message: 'Description of package:'
  },
  {
    type: 'confirm',
    name: 'shouldIncludePrimitives',
    message: 'Should this package include @interunit/primitives?'
  }
]

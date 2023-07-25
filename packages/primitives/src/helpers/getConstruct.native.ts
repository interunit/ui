export const getConstruct = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const RN = require('react-native')
  if (!RN) {
    throw new Error('react-native is not installed')
  }

  return RN
}

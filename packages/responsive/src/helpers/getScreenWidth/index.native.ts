export const getScreenWidth = () => {
  // importing via require to avoid requiring react-native on web
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const {Dimensions} = require('react-native')
  return Dimensions.get('window').width
}

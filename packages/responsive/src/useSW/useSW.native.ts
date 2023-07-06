const useSW = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const {useWindowDimensions} = require('react-native')
  const {width} = useWindowDimensions()

  return {sw: width}
}

export {useSW}

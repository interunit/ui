// Need this so that the compilation
// for web works properly in with RN
// needing this function to get types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getConstruct: () => {Text: any; View: any} = () => {
  return {
    Text: null,
    View: null
  }
}

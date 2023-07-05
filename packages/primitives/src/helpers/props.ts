import {InterUnitInternals} from '@interunit/config'

const ENVIRONMENT = InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT.NAME

const nativeOnlyProps = [
  'onLayout',
  'collapsable',
  'accessible',
  'accessibilityLabel',
  'accessibilityHint',
  'accessibilityRole',
  'accessibilityState',
  'onPress'
]

const webOnlyProps = ['onClick']

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filterPropsByEnvironment = ({props}: {[prop: string]: any}) => {
  if (ENVIRONMENT === 'native') {
    Object.keys(props).forEach(prop => {
      if (webOnlyProps.includes(prop)) {
        delete props[prop]
      }
    })
  }
  if (ENVIRONMENT === 'web') {
    Object.keys(props).forEach(prop => {
      if (nativeOnlyProps.includes(prop)) {
        delete props[prop]
      }
    })
  }

  return props
}

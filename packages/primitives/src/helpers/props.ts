import {getEnvironmentName} from '@interunit/config'
import {platformStyleTranslation} from '@interunit/crossplatform'

const ENVIRONMENT = getEnvironmentName()

const nativeOnlyProps = [
  'onLayout',
  'collapsable',
  'accessible',
  'accessibilityLabel',
  'accessibilityHint',
  'accessibilityRole',
  'accessibilityState',
  'onPress',
  'testID'
]

const webOnlyProps = ['onClick']

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

  if (props?.style) {
    props.style = platformStyleTranslation(props.style)
  }

  return props
}

export type DiscriminatedProps<T> = T extends infer R
  ? R extends keyof React.JSX.IntrinsicElements
    ? {
        el: R
      } & React.JSX.IntrinsicElements[R]
    : never
  : never

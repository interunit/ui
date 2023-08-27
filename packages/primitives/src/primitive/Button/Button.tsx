import {getEnvironmentName} from '@interunit/config'
import {type MergeWithOverride} from '@interunit/toolbox'
import React from 'react'
import type {PressableProps} from 'react-native'

import {Construct} from '../../config'
import {
  type DiscriminatedProps,
  filterPropsByEnvironment
} from '../../helpers/props'

export const ButtonConstruct = {
  button: Construct.Button
}

export type ButtonPrimitiveProps<T extends keyof typeof ButtonConstruct> = Omit<
  PressableProps & DiscriminatedProps<T>,
  'style'
> & {
  style?: MergeWithOverride<
    DiscriminatedProps<T>['style'],
    PressableProps['style']
  >
  onClickOrPress?: (e: React.MouseEvent | React.TouchEvent) => void
}

const Button = React.forwardRef(
  <T extends keyof typeof ButtonConstruct>(
    {
      el = 'button' as T,
      type = 'button',
      children,
      ...props
    }: ButtonPrimitiveProps<T>,
    forwardedRef: any
  ) => {
    /*
     * Map similar accessibility props between React Native and Web
     */
    // TODO: probably makes sense to centralize this
    const accessibilityProps = {
      accessible: props.accessible ?? undefined,
      accessibilityLabel:
        props?.accessibilityLabel ?? props?.['aria-label'] ?? undefined,
      accessibilityRole: props?.accessibilityRole ?? props?.role ?? undefined,
      accessibilityState:
        props?.accessibilityState ?? props?.disabled ?? undefined
    }

    const onClickOrPress = () => {
      if (props.onClickOrPress) {
        if (getEnvironmentName() === 'native') {
          return {
            onPress: props.onClickOrPress
          }
        }

        return {
          onClick: props.onClickOrPress
        }
      }
    }

    const Button = ButtonConstruct?.[el] as React.ElementType

    if (Button === undefined) {
      throw new Error(
        `The element "${el}" doesn't exist in the Button component.`
      )
    }

    const filteredProps = filterPropsByEnvironment({
      props: {...props, ...accessibilityProps, ...onClickOrPress()}
    })

    return (
      <Button type={type} ref={forwardedRef} {...filteredProps}>
        {children}
      </Button>
    )
  }
)

export {Button}

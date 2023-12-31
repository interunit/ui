import {getEnvironmentName} from '@interunit/config'
import {type MergedCrossPlatformProps} from '@interunit/toolbox'
import React from 'react'
import type {Pressable} from 'react-native'

import {Construct} from '../../config'
import {filterPropsByEnvironment} from '../../helpers/props'

export const ButtonConstruct = {
  button: Construct.Button
}

export type ButtonPrimitiveProps<T extends keyof typeof ButtonConstruct> = {
  el?: T
  onClickOrPress?: (e: React.MouseEvent | React.TouchEvent) => void
}

const Button = React.forwardRef(function Button<
  T extends keyof typeof ButtonConstruct
>(
  {
    el = 'button' as T,
    type = 'button',
    children,
    ..._props
  }: ButtonPrimitiveProps<T> & MergedCrossPlatformProps<T, typeof Pressable>,
  forwardedRef
) {
  // TODO: Why does this need to be re-casted to work
  // internally?
  const props = _props as React.JSX.IntrinsicElements[T] &
    React.ComponentPropsWithoutRef<typeof Pressable> &
    ButtonPrimitiveProps<T>

  /*
   * Map similar accessibility props between React Native and Web
   */
  // TODO: probably makes sense to centralize this
  //
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
    props: {...accessibilityProps, ...onClickOrPress(), ...props}
  })

  if (filteredProps.hidden && getEnvironmentName() === 'native') {
    return
  }

  return (
    <Button type={type} ref={forwardedRef} {...filteredProps}>
      {children}
    </Button>
  )
}) as <T extends keyof typeof ButtonConstruct>(
  props: ButtonPrimitiveProps<T> & MergedCrossPlatformProps<T, typeof Pressable>
) => React.JSX.Element

export {Button}

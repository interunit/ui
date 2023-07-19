import React from 'react'
import type {PressableProps} from 'react-native'

import {Construct} from '../../config'
import {
  type DiscriminatedProps,
  filterPropsByEnvironment
} from '../../helpers/props'

const ButtonConstruct = {
  button: Construct.Button
}

export type ButtonPrimitiveProps<T extends keyof typeof ButtonConstruct> =
  PressableProps &
    DiscriminatedProps<T> & {
      onClickOrPress?: (e: React.MouseEvent | React.TouchEvent) => void
    }

const Button = React.forwardRef(
  <T extends keyof typeof ButtonConstruct>(
    {
      el = 'button',
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

    const Button = ButtonConstruct?.[el] as React.ElementType

    if (Button === undefined) {
      throw new Error(
        `The element "${el}" doesn't exist in the Button component.`
      )
    }

    const filteredProps = filterPropsByEnvironment({
      props: {...props, ...accessibilityProps}
    })

    return (
      <Button type={type} ref={forwardedRef} {...filteredProps}>
        {children}
      </Button>
    )
  }
)

export {Button}

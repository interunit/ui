import React from 'react'
import type {Pressable} from 'react-native'

import {Construct} from '../../config'

type ValidWebButtonConstruct = HTMLButtonElement
type ValidNativeButtonConstruct = typeof Pressable
type ValidButtonConstruct = ValidWebButtonConstruct & ValidNativeButtonConstruct
type ValidButtonConstructProps = React.HTMLProps<ValidButtonConstruct> &
  React.ComponentProps<typeof Pressable>

const ButtonConstruct = {
  button: Construct.Button
}

type ButtonConstructAs = 'button'

type ButtonPrimitiveProps = ValidButtonConstructProps & {
  as?: ButtonConstructAs
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  children: React.ReactNode
  ref?: React.Ref<ValidButtonConstruct>

  /*
   * Similar accessibility props between React Native and Web
   */
  // Web Accessibility
  'aria-label'?: string

  // Native Accessibility
  accessible?: boolean
  accessibilityLabel?: string
  accessibilityRole?: string
  accessibilityState?: {
    disabled?: boolean
  }
}

type ButtonPrimitiveRef = ValidButtonConstruct

const Button = React.forwardRef<ButtonPrimitiveRef, ButtonPrimitiveProps>(
  ({as = 'button', type = 'button', children, ...props}, forwardedRef) => {
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

    const Button = ButtonConstruct?.[as] as React.ElementType

    if (Button === undefined) {
      throw new Error(
        `The element "${as}" doesn't exist in the Button component.`
      )
    }

    return (
      <Button type={type} ref={forwardedRef} {...accessibilityProps} {...props}>
        {children}
      </Button>
    )
  }
)

export {Button}

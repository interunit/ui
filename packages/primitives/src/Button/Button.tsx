import React from 'react'
import type {Pressable} from 'react-native'

import {Element} from '../config'

type ValidWebButtonElement = HTMLButtonElement
type ValidNativeButtonElement = typeof Pressable
type ValidButtonElements = ValidWebButtonElement & ValidNativeButtonElement
type ValidButtonElementProps = React.HTMLProps<ValidButtonElements> &
  React.ComponentProps<typeof Pressable>

const ButtonElement = {
  button: Element.Button
}

type ButtonElementAs = 'button'

type ButtonPrimitiveProps = ValidButtonElementProps & {
  as?: ButtonElementAs
  type?: 'button' | 'submit' | 'reset'
  role?: 'button' | 'link'
  disabled?: boolean
  children: React.ReactNode
  ref?: React.Ref<ValidButtonElements>

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

type ButtonPrimitiveRef = ValidButtonElements

const Button = React.forwardRef<ButtonPrimitiveRef, ButtonPrimitiveProps>(
  (
    {
      as = 'button',
      type = 'button',
      role = 'button',
      disabled,
      children,
      ...props
    },
    forwardedRef
  ) => {
    /*
     * Map similar accessibility props between React Native and Web
     */
    const accessibilityProps = {
      accessible: props.accessible ?? true,
      accessibilityLabel: props.accessibilityLabel ?? props['aria-label'],
      accessibilityRole: props.accessibilityRole ?? role,
      accessibilityState: props.accessibilityState ?? {disabled}
    }

    const Button = ButtonElement?.[as]

    if (Button === undefined) {
      throw new Error(
        `The element "${as}" doesn't exist in the Button component.`
      )
    }


    return (
      <Button
        type={type}
        role={role}
        disabled={disabled}
        ref={forwardedRef}
        {...accessibilityProps}
        {...props}
      >
        {children}
      </Button>
    )
  }
)

export {Button}

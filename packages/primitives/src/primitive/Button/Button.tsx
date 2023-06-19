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
  role?: 'button' | 'link'
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

    const Button = ButtonConstruct?.[as] as React.ElementType

    if (Button === undefined) {
      throw new Error(
        `The element "${as}" doesn't exist in the Button component.`
      )
    }

    return (
      <Button
        as={as}
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

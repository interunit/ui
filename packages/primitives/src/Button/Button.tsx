import React from 'react'

import {Element} from '../config'
import {addOptionalProp, getElementFromAs} from '../helpers'
import type {AnyComponent} from '../types'

const ButtonElement = {
  button: Element.Button,
  a: Element.A
}

type ButtonElementAs = keyof typeof ButtonElement
type ButtonElementComponent = (typeof ButtonElement)[keyof typeof ButtonElement]
type ButtonElementProps = React.ComponentProps<ButtonElementComponent>

type ButtonPrimitiveProps = ButtonElementProps & {
  as?: ButtonElementAs | AnyComponent
  type?: 'button' | 'submit' | 'reset'
  role?: 'button' | 'link'
  disabled?: boolean
  children: React.ReactNode

  /*
   * Similar accessibility props between React Native and Web
   */

  // Web Accessibility
  'aria-label'?: string

  // React Native Accessibility
  accessible?: boolean
  accessibilityLabel?: string
  accessibilityRole?: string
  accessibilityState?: {
    disabled?: boolean
  }
}

const Button = React.forwardRef<ButtonElementComponent, ButtonPrimitiveProps>(
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

    const Button = getElementFromAs<typeof ButtonElement, ButtonPrimitiveProps>(
      {
        as: as,
        Element: ButtonElement
      }
    )

    return (
      <Button
        {...addOptionalProp(as)}
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

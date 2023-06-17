import React from 'react'

import {Element} from '../config'
import {styled} from '../createPrimitives'

const ButtonElement = {
  button: Element.Button,
  a: Element.A
}

type ButtonElementAs = 'button' | 'a'
type ButtonElementComponent = typeof Element.Button | typeof Element.A
type ButtonElementProps = React.ComponentProps<ButtonElementComponent>

type ButtonPrimitiveProps = ButtonElementProps & {
  as?: ButtonElementAs
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

// TODO: Type any
const Button = React.forwardRef<any, ButtonPrimitiveProps>(
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

    const StyledButton = styled(Button, {})

    return (
      <StyledButton
        type={type}
        role={role}
        disabled={disabled}
        ref={forwardedRef}
        {...accessibilityProps}
        {...props}
      >
        {children}
      </StyledButton>
    )
  }
)

export {Button}

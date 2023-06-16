import React from 'react'

import {Primitive} from '../Primitive'
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
  children: React.ReactNode
}

const Button = React.forwardRef<ButtonElementComponent, ButtonPrimitiveProps>(
  (
    {type = 'button', role = 'button', as = 'button', children, ...props},
    forwardedRef
  ) => {
    const Button = getElementFromAs<typeof ButtonElement, ButtonPrimitiveProps>(
      {
        as: as,
        Element: ButtonElement
      }
    )

    return (
      <Button
        type={type}
        role={role}
        ref={forwardedRef}
        {...addOptionalProp(as)}
        {...props}
      >
        {children}
      </Button>
    )
  }
)

export {Button}

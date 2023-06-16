import React from 'react'
import type {PressableProps} from 'react-native'

import {Element} from '../config'
import {optionalProp} from '../helpers'

interface ButtonPrimitiveSharedProps {
  as?: string | React.FunctionComponent
  type?: 'button' | 'submit' | 'reset'
}

interface ButtonPrimitiveNativeProps
  extends ButtonPrimitiveSharedProps,
    PressableProps {}

interface ButtonPrimitiveWebProps
  extends ButtonPrimitiveSharedProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {}

type ButtonPrimitiveProps = ButtonPrimitiveNativeProps | ButtonPrimitiveWebProps

interface ButtonPrimitiveRef extends HTMLButtonElement {}

const Button = React.forwardRef<ButtonPrimitiveRef, ButtonPrimitiveProps>(
  (
    {type = 'button', role = 'button', as, children, ...props},
    forwardedRef
  ) => {
    return (
      <Element.Button
        type={type}
        role={role}
        ref={forwardedRef}
        {...optionalProp(as)}
        {...props}
      >
        {children}
      </Element.Button>
    )
  }
)

export {Button}

import React from 'react'

import {InterUnitInternals} from '@interunit/config'

import {Box as BoxPrimitive, type BoxPrimitiveProps} from './Box'
import {Button as ButtonPrimitive, type ButtonPrimitiveProps} from './Button'
import type {TextPrimitiveProps} from './Text'
import {Text as TextPrimitive} from './Text'

const Text = <T extends unknown>({
  as,
  children,
  ...props
}: TextPrimitiveProps & T) => {
  const config = InterUnitInternals.useInterUnitInternalContext()
  const TextExtension = config.primitiveExtension?.['Text']

  if (TextExtension) {
    const TypedTextExtension = TextExtension
    return (
      <TypedTextExtension as={as} {...props}>
        {children}
      </TypedTextExtension>
    )
  }
  return (
    <TextPrimitive as={as} {...props}>
      {children}
    </TextPrimitive>
  )
}

const Button = React.forwardRef(
  <T extends unknown>(
    {as, children, ...props}: ButtonPrimitiveProps & T,
    forwardedRef: React.ForwardedRef<ButtonPrimitiveProps>
  ) => {
    const config = InterUnitInternals.useInterUnitInternalContext()
    const ButtonExtension = config?.primitiveExtension?.['Button']

    if (ButtonExtension) {
      const TypedButtonExtension = ButtonExtension
      return (
        <TypedButtonExtension as={as} {...props} ref={forwardedRef}>
          {children}
        </TypedButtonExtension>
      )
    }
    return (
      <ButtonPrimitive as={as} {...props} ref={forwardedRef}>
        {children}
      </ButtonPrimitive>
    )
  }
)

const Box = React.forwardRef(
  <T extends unknown>(
    {as, children, ...props}: BoxPrimitiveProps & T,
    forwardedRef: React.ForwardedRef<BoxPrimitiveProps>
  ) => {
    const config = InterUnitInternals.useInterUnitInternalContext()
    const BoxExtension = config?.primitiveExtension?.['Box']

    if (BoxExtension) {
      const TypedBoxExtension = BoxExtension
      return (
        <TypedBoxExtension as={as} ref={forwardedRef} {...props}>
          {children}
        </TypedBoxExtension>
      )
    }
    return (
      <BoxPrimitive as={as} ref={forwardedRef} {...props}>
        {children}
      </BoxPrimitive>
    )
  }
)

export interface PrimitiveToExtend<T> {
  Text: React.FC<TextPrimitiveProps & T>
  Button: React.FC<ButtonPrimitiveProps & T>
  Box: React.FC<BoxPrimitiveProps & T>
}

export const PrimitveComponentToExtend = {
  Text: TextPrimitive,
  Button: ButtonPrimitive,
  Box: BoxPrimitive
}

export const Primitive = {
  Box,
  Button,
  Text
}

import React from 'react'

import {Primitive} from '@interunit/primitives'
import {StylesExtender} from '@interunit/primitives'
import {type PrimitiveToExtend} from '@interunit/primitives'

type StyledPrimitiveProps = {
  $outline?: string
}

const StyledTextPrimitive = ({
  css,
  ...props
}: {
  css: string
  children: React.ReactNode
}) => {
  return StylesExtender({as: Primitive.Text, css, ...props})
}

const TextPrimitive: PrimitiveToExtend<StyledPrimitiveProps>['Text'] = ({
  children,
  $outline,
  ...props
}: React.ComponentProps<typeof Primitive.Text>) => {
  const css = `
    outline: ${$outline};
    `

  return (
    <StyledTextPrimitive css={css} {...props}>
      {children}
    </StyledTextPrimitive>
  )
}

export {TextPrimitive}

import React from 'react'
import styled from 'styled-components'

import {Primitive, type PrimitiveToExtend} from '@interunit/primitives'

const StyledTextPrimitive = styled(Primitive.Text)<{outline?: string}>`
  outline: ${props => props.outline};
`

const TextPrimitive: PrimitiveToExtend<{outline?: string}>['Text'] = ({
  as,
  children,
  outline,
  ...props
}: React.ComponentProps<typeof Primitive.Text>) => {
  return (
    <StyledTextPrimitive as={as} outline={outline} {...props}>
      {children}
    </StyledTextPrimitive>
  )
}

export {TextPrimitive}

import React from 'react'

import {Element} from '../config'
import {styled} from '../createPrimitives'
import {
  type Spacing,
  SpacingValueToCssString,
} from '../helpers'

const BoxElement = {
  div: Element.Div,
  span: Element.Span,
  child: Element.Child
}

type BoxElementAs = 'div' | 'span' | 'child'
type BoxElementComponent =
  | typeof Element.Div
  | typeof Element.Span
  | typeof Element.Child
type BoxElementProps = React.ComponentProps<BoxElementComponent>

type BoxPrimitiveProps = BoxElementProps & {
  as: BoxElementAs
  sp?: Spacing
  children: React.ReactNode
}

const Box = React.forwardRef<BoxElementComponent, BoxPrimitiveProps>(
  ({as, sp, children, ...props}, forwardedRef) => {
    const Box = BoxElement?.[as]

    if (Box === undefined) {
      throw new Error(`The element "${as}" doesn't exist in the Box component.`)
    }

    const StyledBox = styled(Box, {
      padding: sp?.p ? SpacingValueToCssString({value: sp.p}) : undefined,
      margin: sp?.m ? SpacingValueToCssString({value: sp.m}) : undefined
    })

    return (
      <StyledBox ref={forwardedRef} {...props}>
        {children}
      </StyledBox>
    )
  }
)

export {Box}

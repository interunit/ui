import React from 'react'
import type {View} from 'react-native'

import {Element} from '../config'
import {type Spacing, SpacingValueToCssString} from '../helpers'

type ValidWebBoxElement = HTMLDivElement | HTMLSpanElement
type ValidNativeBox = typeof View
type ValidBoxElement = ValidWebBoxElement & ValidNativeBox
type ValidBoxElementProps = React.HTMLProps<ValidBoxElement> &
  React.ComponentProps<typeof View>

const BoxElement = {
  div: Element.Div,
  span: Element.Span,
  child: Element.Child
}

type BoxElementAs = 'div' | 'span' | 'child'

type BoxPrimitiveProps = ValidBoxElementProps & {
  as: BoxElementAs
  sp?: Spacing
  children: React.ReactNode
  ref?: React.Ref<ValidBoxElement>
}

type BoxPrimitiveRef = ValidBoxElement

const StyledBox = Element.Div<{sp?: Spacing}>`
    padding: ${props =>
      props.sp?.p ? SpacingValueToCssString({value: props.sp.p}) : undefined};
    margin: ${props =>
      props.sp?.m ? SpacingValueToCssString({value: props.sp.m}) : undefined};
`
const Box = React.forwardRef<BoxPrimitiveRef, BoxPrimitiveProps>(
  ({as, sp, children, ...props}, forwardedRef) => {
    const Box = BoxElement?.[as]

    if (Box === undefined) {
      throw new Error(`The element "${as}" doesn't exist in the Box component.`)
    }

    // TODO: Can we avoid this by abstracting away the StyledBox styled call
    if (as === 'child') {
        // TODO: This doesn't have a way to pass styles on yet
      return (
        <Element.Child {...props} sp={sp} ref={forwardedRef}>
          {children}
        </Element.Child>
      )
    }

    return (
      <StyledBox as={as} sp={sp} ref={forwardedRef} {...props}>
        {children}
      </StyledBox>
    )
  }
)

export {Box}

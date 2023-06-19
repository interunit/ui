import React from 'react'
import type {View} from 'react-native'

import {Element} from '../config'
import {type Spacing} from '../helpers'

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

const Box = React.forwardRef<BoxPrimitiveRef, BoxPrimitiveProps>(
  ({as, sp, children, ...props}, forwardedRef) => {
    const Box = BoxElement?.[as] as React.ElementType

    if (Box === undefined) {
      throw new Error(`The element "${as}" doesn't exist in the Box component.`)
    }

    if (as === 'child') {
      return (
        <Element.Child sp={sp} {...props} ref={forwardedRef}>
          {children}
        </Element.Child>
      )
    }

    return (
      <Box as={as} sp={sp} ref={forwardedRef} {...props}>
        {children}
      </Box>
    )
  }
)

export {Box}

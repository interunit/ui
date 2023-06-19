import React from 'react'
import type {View} from 'react-native'

import {Construct} from '../../config'
import {type Spacing} from '../../helpers/spacing'
import {Child} from '../../utility/Child'

type ValidWebBoxConstruct = HTMLDivElement | HTMLSpanElement
type ValidNativeBoxConstruct = typeof View
type ValidBoxConstruct = ValidWebBoxConstruct & ValidNativeBoxConstruct
type ValidBoxConstructProps = React.HTMLProps<ValidBoxConstruct> &
  React.ComponentProps<typeof View>

const BoxConstruct = {
  div: Construct.Div,
  span: Construct.Span,
  child: Child
}

type BoxConstructAs = 'div' | 'span' | 'child'

type BoxPrimitiveProps = ValidBoxConstructProps & {
  as: BoxConstructAs
  sp?: Spacing
  children: React.ReactNode
  ref?: React.Ref<ValidBoxConstruct>
}

type BoxPrimitiveRef = ValidBoxConstruct

const Box = React.forwardRef<BoxPrimitiveRef, BoxPrimitiveProps>(
  ({as, sp, children, ...props}, forwardedRef) => {
    const Box = BoxConstruct?.[as] as React.ElementType

    if (Box === undefined) {
      throw new Error(`The element "${as}" doesn't exist in the Box component.`)
    }

    if (as === 'child') {
      return (
        <BoxConstruct.child sp={sp} {...props} ref={forwardedRef}>
          {children}
        </BoxConstruct.child>
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

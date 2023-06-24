import React from 'react'
import type {View} from 'react-native'

import {Construct} from '../../config'
import {Child} from '../../utility/Child'
import {type UtilityStyles} from '../../utility/Styles'

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

export type BoxPrimitiveProps = ValidBoxConstructProps &
  UtilityStyles & {
    as: BoxConstructAs
    children: React.ReactNode
    ref?: React.Ref<ValidBoxConstruct>
  }

type BoxPrimitiveRef = ValidBoxConstruct

const Box = React.forwardRef<BoxPrimitiveRef, BoxPrimitiveProps>(
  ({as, children, ...props}, forwardedRef) => {
    const Box = BoxConstruct?.[as] as React.ElementType

    if (Box === undefined) {
      throw new Error(`The element "${as}" doesn't exist in the Box component.`)
    }

    // TODO: probably makes sense to centralize this
    const accessibilityProps = {
      accessible: props.accessible ?? undefined,
      accessibilityLabel:
        props?.accessibilityLabel ?? props?.['aria-label'] ?? undefined,
      accessibilityRole: props?.accessibilityRole ?? props?.role ?? undefined,
      accessibilityState:
        props?.accessibilityState ?? props.disabled ?? undefined
    }

    if (as === 'child') {
      return (
        <BoxConstruct.child
          ref={forwardedRef}
          {...props}
          {...accessibilityProps}
        >
          {children}
        </BoxConstruct.child>
      )
    }

    return (
      <Box ref={forwardedRef} {...props}>
        {children}
      </Box>
    )
  }
)

export {Box}

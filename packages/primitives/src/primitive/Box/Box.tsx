import React from 'react'
import type {ViewComponent, ViewProps} from 'react-native'

import { filterPropsByEnvironment } from '../../helpers/props'

import {Construct} from '../../config'
import {Child} from '../../utility/Child'

type ValidWebBoxConstruct =
  | HTMLDivElement
  | HTMLSpanElement
  | HTMLUListElement
  | HTMLLIElement
type ValidNativeBoxConstruct = ViewComponent
type ValidBoxConstruct = ValidWebBoxConstruct & ValidNativeBoxConstruct
type ValidBoxConstructProps = React.HTMLProps<ValidBoxConstruct> & ViewProps

const BoxConstruct = {
  div: Construct.Div,
  span: Construct.Span,
  child: Child,
  section: Construct.Section,
  // TODO: shoudld these go here?
  ul: Construct.UL,
  li: Construct.LI
}

type BoxConstructAs = 'div' | 'span' | 'child' | 'ul' | 'li' | 'section'

export type BoxPrimitiveProps = ValidBoxConstructProps & {
  as: BoxConstructAs
  children: React.ReactNode
  ref?: React.Ref<ValidBoxConstruct>
}

export type BoxPrimitiveRef = ValidBoxConstruct

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
      accessibilityRole:
        props?.accessibilityRole ??
        (props?.role as typeof props.accessibilityRole) ??
        undefined,
      accessibilityState:
        props?.accessibilityState ?? props.disabled
          ? ('disabled' as typeof props.accessibilityState)
          : null ?? undefined
    }


    const filteredProps = filterPropsByEnvironment({props: {...props, ...accessibilityProps}})
    if (as === 'child') {
      return (
        <BoxConstruct.child ref={forwardedRef} {...filteredProps}>
          {children}
        </BoxConstruct.child>
      )
    }

    return (
      <Box ref={forwardedRef} {...filteredProps}>
        {children}
      </Box>
    )
  }
)

export {Box}

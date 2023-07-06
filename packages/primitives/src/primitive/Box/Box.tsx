import React from 'react'
import type {ViewComponent, ViewProps} from 'react-native'

import {Construct} from '../../config'
import {filterPropsByEnvironment} from '../../helpers/props'
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
  nav: Construct.Nav,
  // TODO: shoudld these go here?
  ul: Construct.UL,
  li: Construct.LI
}

type BoxConstructEl = 'div' | 'span' | 'child' | 'ul' | 'li' | 'section' | 'nav'

export type BoxPrimitiveProps = ValidBoxConstructProps & {
  el: BoxConstructEl
  children: React.ReactNode
  ref?: React.Ref<ValidBoxConstruct>
}

export type BoxPrimitiveRef = ValidBoxConstruct

const Box = React.forwardRef<BoxPrimitiveRef, BoxPrimitiveProps>(
  ({el, children, ...props}, forwardedRef) => {
    const Box = BoxConstruct?.[el] as React.ElementType

    if (Box === undefined) {
      throw new Error(`The element "${el}" doesn't exist in the Box component.`)
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

    const filteredProps = filterPropsByEnvironment({
      props: {...props, ...accessibilityProps}
    })

    if (el === 'child') {
      return (
        <Child ref={forwardedRef} {...filteredProps}>
          {children}
        </Child>
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

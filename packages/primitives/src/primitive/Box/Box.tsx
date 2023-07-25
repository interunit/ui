import React from 'react'
import type {ViewProps} from 'react-native'

import {Construct} from '../../config'
import {
  type DiscriminatedProps,
  filterPropsByEnvironment
} from '../../helpers/props'
import {Child} from '../../utility/Child'

const BoxConstruct = {
  div: Construct.Div,
  span: Construct.Span,
  child: Child,
  section: Construct.Section,
  nav: Construct.Nav,
  // TODO: should these go here?
  ul: Construct.UL,
  li: Construct.LI
}

export type BoxPrimitiveProps<T extends keyof typeof BoxConstruct> = ViewProps &
  DiscriminatedProps<T>

const Box = React.forwardRef(
  <T extends keyof typeof BoxConstruct>(
    {el, children, ...props}: BoxPrimitiveProps<T>,
    forwardedRef: any
  ) => {
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
        undefined
    }

    const filteredProps = filterPropsByEnvironment({
      props: {...props, ...accessibilityProps}
    })

    if (String(el) === 'child') {
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

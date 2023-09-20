import {getEnvironmentName} from '@interunit/config'
import {type MergedCrossPlatformProps} from '@interunit/toolbox'
import React from 'react'
import type {View} from 'react-native'

import {Construct} from '../../config'
import {filterPropsByEnvironment} from '../../helpers/props'

export const BoxConstruct = {
  div: Construct.Div,
  span: Construct.Span,
  section: Construct.Section,
  nav: Construct.Nav,
  // TODO: should these go here?
  ul: Construct.UL,
  li: Construct.LI
}

export type BoxPrimitiveProps<T extends keyof typeof BoxConstruct> = {
  el: T
}

const Box = React.forwardRef(
  <T extends keyof typeof BoxConstruct>(
    {
      el,
      children,
      ..._props
    }: BoxPrimitiveProps<T> & MergedCrossPlatformProps<T, typeof View>,
    forwardedRef: any
  ) => {
    // TODO: Why does this need to be re-casted to work
    // internally?
    const props = _props as React.JSX.IntrinsicElements[T] &
      React.ComponentPropsWithoutRef<typeof View> &
      BoxPrimitiveProps<T>

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

    // Might make sense to move this along with other things to some
    // sort of HOC pattern for matching parity on props across platforms
    if (filteredProps.hidden && getEnvironmentName() === 'native') {
      return
    }

    return (
      <Box ref={forwardedRef} {...filteredProps}>
        {children}
      </Box>
    )
  }
) as <T extends keyof typeof BoxConstruct>(
  props: BoxPrimitiveProps<T> & MergedCrossPlatformProps<T, typeof View>
) => React.JSX.Element

export {Box}

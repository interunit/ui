import {type MergeWithOverride} from '@interunit/toolbox'
import React from 'react'
import type {TextProps} from 'react-native'

import {Construct} from '../../config'
import {
  type DiscriminatedProps,
  filterPropsByEnvironment
} from '../../helpers/props'

// TODO: Add strong, em, etc
const TextConstruct = {
  h1: Construct.H1,
  h2: Construct.H2,
  h3: Construct.H3,
  h4: Construct.H4,
  h5: Construct.H5,
  h6: Construct.H6,
  p: Construct.P,
  span: Construct.Span,
  label: Construct.Label,
  a: Construct.A
} as const

type TextPrimitiveProps<T extends keyof typeof TextConstruct> = Omit<
  TextProps & DiscriminatedProps<T>,
  'style'
> & {
  style?: MergeWithOverride<DiscriminatedProps<T>['style'], TextProps['style']>
}
const Text = React.forwardRef(
  <T extends keyof typeof TextConstruct>(
    {el, children, ...props}: TextPrimitiveProps<T>,
    forwardedRef: any
  ) => {
    const Text = TextConstruct?.[el] as React.ElementType

    if (Text === undefined) {
      throw new Error(
        `The element "${el}" doesn't exist in the Text component.`
      )
    }

    const filteredProps = filterPropsByEnvironment({props})

    return (
      <Text ref={forwardedRef} {...filteredProps}>
        {children}
      </Text>
    )
  }
)

export {Text}

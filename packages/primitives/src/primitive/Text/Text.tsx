import {getEnvironmentName} from '@interunit/config'
import {type Merge} from '@interunit/toolbox'
import React from 'react'
import type {Text as RNText} from 'react-native'

import {Construct} from '../../config'
import {filterPropsByEnvironment} from '../../helpers/props'

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

type TextPrimitiveProps<T extends keyof typeof TextConstruct> = {
  el: T
}

const Text = React.forwardRef(
  <T extends keyof typeof TextConstruct>(
    {
      el,
      children,
      ...props
    }: TextPrimitiveProps<T> & {
      style?: Merge<
        [
          React.ComponentPropsWithoutRef<typeof RNText>,
          React.JSX.IntrinsicElements[T]['style']
        ]
      >
    } & Merge<
        [
          React.ComponentPropsWithoutRef<typeof RNText>,
          React.JSX.IntrinsicElements[T]
        ]
      >,
    forwardedRef: any
  ) => {
    const Text = TextConstruct?.[el] as React.ElementType
    if (Text === undefined) {
      throw new Error(
        `The element "${el}" doesn't exist in the Text component.`
      )
    }

    const filteredProps = filterPropsByEnvironment({props})

    // Might make sense to move this along with other things to some
    // sort of HOC pattern for matching parity on props across platforms
    if (filteredProps.hidden && getEnvironmentName() === 'native') {
      return
    }

    return (
      <Text ref={forwardedRef} {...filteredProps}>
        {children}
      </Text>
    )
  }
)

export {Text}

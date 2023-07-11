import React from 'react'
import type {TextProps} from 'react-native'

import {Construct} from '../../config'
import {filterPropsByEnvironment} from '../../helpers/props'

type ValidTextConstructProps<T extends TextConstructEl> =
  React.ComponentProps<T> & TextProps

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
}

export type TextConstructEl = keyof typeof TextConstruct
// TODO: This cuts out all HTML attributes that aren't an above element
// I'd ideally like it to use the "el" prop to determine which HTML attributes
// are valid for that specifc element.
export type TextPrimitiveProps<T extends TextConstructEl> =
  ValidTextConstructProps<T> & {
    el: T
  }

const Text = React.forwardRef(
  <T extends TextConstructEl>(
    {el, children, ...props}: TextPrimitiveProps<T>,
    forwardedRef: any
  ) => {
    const Text = TextConstruct?.[el as TextConstructEl]

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

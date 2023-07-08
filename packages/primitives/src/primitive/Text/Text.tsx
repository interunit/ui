import React from 'react'
import type {TextComponent, TextProps} from 'react-native'

import {Construct} from '../../config'
import {filterPropsByEnvironment} from '../../helpers/props'

type ValidWebTextConstruct =
  | HTMLHeadingElement
  | HTMLParagraphElement
  | HTMLSpanElement
  | HTMLAnchorElement
type ValidNativeTextConstruct = TextComponent
type ValidTextConstruct = ValidWebTextConstruct & ValidNativeTextConstruct
type ValidTextConstructProps = React.HTMLProps<ValidTextConstruct> & TextProps

// TODO: Add strong, em, etc
const TextConstruct = {
  h1: Construct.H1,
  h2: Construct.H2,
  h3: Construct.H3,
  h4: Construct.H4,
  h5: Construct.H5,
  h6: Construct.H6,
  label: Construct.Label,
  p: Construct.P,
  span: Construct.Span,
  a: Construct.A
}

export type TextConstructEl = keyof typeof TextConstruct

// TODO: cut out the HTML element types that are not valid for each TextConstructAs
export type TextPrimitiveProps = ValidTextConstructProps & {
  el: TextConstructEl
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Text = React.forwardRef<any, TextPrimitiveProps>(
  ({el, children, ...props}, forwardedRef) => {
    const Text = TextConstruct?.[el as TextConstructEl] as React.ElementType

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

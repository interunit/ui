import React from 'react'
import type {Text as RNText} from 'react-native'

import {Construct} from '../../config'
import type {UtilityStyles} from '../../utility/Styles'

type ValidWebTextConstruct =
  | HTMLHeadingElement
  | HTMLParagraphElement
  | HTMLSpanElement
type ValidNativeTextConstruct = RNText
type ValidTextConstruct = ValidWebTextConstruct & ValidNativeTextConstruct
type ValidTextConstructProps = React.HTMLProps<ValidTextConstruct> &
  React.ComponentProps<typeof RNText>

const TextConstruct = {
  h1: Construct.H1,
  h2: Construct.H2,
  h3: Construct.H3,
  h4: Construct.H4,
  h5: Construct.H5,
  h6: Construct.H6,
  label: Construct.Label,
  p: Construct.P,
  span: Construct.Span
}

type TextConstructAs =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label'
  | 'p'
  | 'span'

// TODO: cut out the HTML element types that are not valid for each TextConstructAs
type TextPrimitiveProps = ValidTextConstructProps &
  UtilityStyles & {
    as: TextConstructAs
    children: React.ReactNode
    ref?: React.Ref<ValidTextConstruct>
  }

type TextPrimitiveRef = ValidTextConstruct

const Text = React.forwardRef<TextPrimitiveRef, TextPrimitiveProps>(
  ({as, children, ...props}, forwardedRef) => {
    const Text = TextConstruct?.[as as TextConstructAs] as React.ElementType

    if (Text === undefined) {
      throw new Error(
        `The element "${as}" doesn't exist in the Text component.`
      )
    }

    return (
      <Text ref={forwardedRef} {...props}>
        {children}
      </Text>
    )
  }
)

export {Text}

import React from 'react'
import type {Text as RNText} from 'react-native'

import {Element} from '../config'

type ValidWebTextElement =
  | HTMLHeadingElement
  | HTMLParagraphElement
  | HTMLSpanElement
  | HTMLAnchorElement
type ValidNativeTextElement = RNText
type ValidTextElement = ValidWebTextElement & ValidNativeTextElement
type ValidTextElementProps = React.HTMLProps<ValidTextElement> &
  React.ComponentProps<typeof RNText>

const TextElement = {
  h1: Element.H1,
  h2: Element.H2,
  h3: Element.H3,
  h4: Element.H4,
  h5: Element.H5,
  h6: Element.H6,
  label: Element.Label,
  p: Element.P,
  span: Element.Span
}
type TextElementAs =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label'
  | 'p'
  | 'span'

// TODO: cut out the HTML element types that are not valid for each TextElementAs
type TextPrimitiveProps = ValidTextElementProps & {
  as: TextElementAs
  children: React.ReactNode
  ref?: React.Ref<ValidTextElement>
}

type TextPrimitiveRef = ValidTextElement

const StyledText = Element.Span``

const Text = React.forwardRef<TextPrimitiveRef, TextPrimitiveProps>(
  ({as, children, ...props}, forwardedRef) => {
    const Text = TextElement?.[as as TextElementAs]

    if (Text === undefined) {
      throw new Error(
        `The element "${as}" doesn't exist in the Text component.`
      )
    }

    return (
      <StyledText as={as} ref={forwardedRef} {...props}>
        {children}
      </StyledText>
    )
  }
)

export {Text}

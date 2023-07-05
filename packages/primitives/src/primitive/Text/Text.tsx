import React from 'react'
import type {TextComponent, TextProps} from 'react-native'
import { filterPropsByEnvironment } from '../../helpers/props'

import {Construct} from '../../config'

type ValidWebTextConstruct =
  | HTMLHeadingElement
  | HTMLParagraphElement
  | HTMLSpanElement
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
export interface TextPrimitiveProps extends ValidTextConstructProps {
  as: TextConstructAs
  children: React.ReactNode
  ref?: React.Ref<ValidTextConstruct>
}

export type TextPrimitiveRef = ValidTextConstruct

const Text = React.forwardRef<TextPrimitiveRef, TextPrimitiveProps>(
  ({as, children, ...props}, forwardedRef) => {
    const Text = TextConstruct?.[as as TextConstructAs] as React.ElementType

    if (Text === undefined) {
      throw new Error(
        `The element "${as}" doesn't exist in the Text component.`
      )
    }

    const filteredProps = filterPropsByEnvironment({props })
    return (
      <Text ref={forwardedRef} {...filteredProps}>
        {children}
      </Text>
    )
  }
)

export {Text}

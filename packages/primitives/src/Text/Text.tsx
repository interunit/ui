import React from 'react'

import {Element} from '../config'
import {addOptionalProp, getElementFromAs} from '../helpers'
import type {AnyComponent} from '../types'

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

type TextElementAs = keyof typeof TextElement
type TextElementComponent = (typeof TextElement)[keyof typeof TextElement]
type TextElementProps = React.ComponentProps<TextElementComponent>

type TextPrimitiveProps = TextElementProps & {
  as?: TextElementAs | AnyComponent
  children: React.ReactNode
}

const Text = React.forwardRef<TextElementComponent, TextPrimitiveProps>(
  ({as, children, ...props}, forwardedRef) => {
    const Text = getElementFromAs<typeof TextElement, TextPrimitiveProps>({
      as: as,
      Element: TextElement
    })

    return (
      <Text ref={forwardedRef} {...addOptionalProp(as)} {...props}>
        {children}
      </Text>
    )
  }
)

export {Text}

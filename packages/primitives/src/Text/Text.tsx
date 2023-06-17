import React from 'react'

import {Element} from '../config'
import {styled} from '../createPrimitives'

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
type TextElementComponent =
  | typeof Element.H1
  | typeof Element.H2
  | typeof Element.H3
  | typeof Element.H4
  | typeof Element.H5
  | typeof Element.H6
  | typeof Element.Label
  | typeof Element.P
  | typeof Element.Span

export type StyledComponentProps<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = Omit<React.ComponentProps<C>, 'css'>

type TextElementProps = StyledComponentProps<TextElementComponent>

type TextPrimitiveProps = TextElementProps & {
  as: TextElementAs
  children: React.ReactNode
}

// TODO: Type any
const Text = React.forwardRef<any, TextPrimitiveProps>(
  ({as, children, ...props}, forwardedRef) => {
    const Text = TextElement?.[as]

    if (Text === undefined) {
      throw new Error(
        `The element "${as}" doesn't exist in the Text component.`
      )
    }

    const StyledText = styled(Text, {})

    return (
      <StyledText ref={forwardedRef} {...props}>
        {children}
      </StyledText>
    )
  }
)

export {Text}

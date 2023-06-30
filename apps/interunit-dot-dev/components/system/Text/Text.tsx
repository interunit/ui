import React from 'react'
import styled from 'styled-components'

import {Primitive} from '@/components/primitives'

type TextProps = React.ComponentPropsWithoutRef<typeof Primitive.Text> & {
  kind?: 'body' | 'heading'
  weight?: 'normal' | 'bold' | 'light'
  variation?: 'sm' | 'md' | 'lg'
}

type StyledTextProps = TextProps & {
  kind: 'body' | 'heading'
  variation: 'sm' | 'md' | 'lg'
}

const BodyScale = {
  lg: '1.25rem',
  md: '1rem',
  sm: '0.85rem'
}

const HeadingScale = {
  lg: '4rem',
  md: '3rem',
  sm: '1.5rem'
}

const BodyLineHeightScale = {
  lg: '1.75rem',
  md: '1.5rem',
  sm: '1.25rem'
}

const HeadingLineHeightScale = {
  lg: '4.5rem',
  md: '3.5rem',
  sm: '2rem'
}

const StyledText = styled(Primitive.Text)<StyledTextProps>`
  ${props =>
    props.kind === 'body' || !props.kind
      ? `font-size: ${BodyScale[props.variation]};`
      : ''}
  ${props =>
    props.kind === 'heading'
      ? `font-size: ${HeadingScale[props.variation]};`
      : ''}
    ${props => props.weight && `font-weight: ${props.weight}`};
  color: ${props => props.theme?.color.text.primary};

  line-height: ${props =>
    props.kind === 'body' || !props.kind
      ? BodyLineHeightScale[props.variation]
      : HeadingLineHeightScale[props.variation]};
`
type TextRef = React.ElementRef<TextPrimitive>

const Text = React.forwardRef<TextRef, TextProps>(
  (
    {kind = 'body', variation = 'md', weight, children, ...props},
    forwardedRef
  ) => {
    return (
      <StyledText
        kind={kind}
        variation={variation}
        weight={weight}
        ref={forwardedRef}
        {...props}
      >
        {children}
      </StyledText>
    )
  }
)

export {Text}

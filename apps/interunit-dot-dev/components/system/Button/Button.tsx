import React from 'react'
import styled, {css} from 'styled-components'

import {Primitive} from '@interunit/primitives'

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof Primitive.Button> {
  color: string
  variation?: 'sm' | 'md' | 'lg'
  inverse?: boolean
}

type ButtonRef = React.ElementRef<typeof Primitive.Button>

const PaddingScale = {
  lg: '1.25rem 1.5rem',
  md: '1rem; 1.25rem;',
  sm: '0.5rem 0.75rem'
}
const StyledButton = styled(Primitive.Button)<ButtonProps>`
  appearance: none;
  background-color: ${props => props.color};
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.3) 0%,
    ${props => props.color} 20%
  );
  border: ${props => props.theme.border.width.primary}px solid
    ${props => props.color};
  border-radius: ${props => props.theme.border.radius.primary}px;
  color: ${props => props.theme.color.text.primary};
  cursor: pointer;
  filter: brightness(1);
  font-weight: bold;
  padding: ${props => props.variation && PaddingScale[props.variation]};
  transition: background-color 0.2s ease-in-out,
    background-image 0.2s ease-in-out, filter 0.2s ease-in-out;

  &:hover {
    filter: brightness(1.1);
  }

  ${props =>
    props.inverse &&
    css`
      background-color: transparent;
      background-image: none;
      border: 2px solid ${props.color};

      &:hover {
        background-color: ${props.color};
        background-image: linear-gradient(
          rgba(255, 255, 255, 0.3) 0%,
          ${props.color} 20%
        );
      }
    `}
`

const Button = React.forwardRef<ButtonRef, ButtonProps>(
  ({color, variation = 'md', inverse, children, ...props}, forwardedRef) => {
    return (
      <StyledButton
        color={color}
        variation={variation}
        inverse={inverse}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </StyledButton>
    )
  }
)

export {Button}

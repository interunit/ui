import React from 'react'
import styled, {css} from 'styled-components'

import {TinyColor, isReadable} from '@ctrl/tinycolor'
import {Primitive} from '@interunit/primitives'

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof Primitive.Button> {
  color: string
  variation?: 'xs' | 'sm' | 'md' | 'lg'
  kind?: 'primary' | 'secondary'
}

interface StyledButtonProps
  extends React.ComponentPropsWithoutRef<typeof Primitive.Button> {
  $color: ButtonProps['color']
  $variation?: ButtonProps['variation']
  $kind?: ButtonProps['kind']
}

type ButtonRef = React.ElementRef<typeof Primitive.Button>

interface ButtonAnchorProps
  extends React.ComponentPropsWithoutRef<typeof Primitive.Text> {
  color: string
  variation?: 'xs' | 'sm' | 'md' | 'lg'
  kind?: 'primary' | 'secondary'
}

interface StyledButtonAnchorProps
  extends React.ComponentPropsWithoutRef<typeof Primitive.Text> {
  $color: ButtonProps['color']
  $variation?: ButtonProps['variation']
  $kind?: ButtonProps['kind']
}

type ButtonAnchorRef = React.ElementRef<typeof Primitive.Text>
const PaddingScale = {
  lg: '1.25rem 1.5rem',
  md: '1rem; 1.25rem;',
  sm: '0.5rem 0.75rem',
  xs: '0.25rem 0.50em'
}

const StyledButton = styled(Primitive.Button)<StyledButtonProps>`
  appearance: none;
  background: linear-gradient(
        to top,
        ${props => new TinyColor(props.$color).lighten(3).toString()},
        ${props => props.$color}
      )
      padding-box,
    linear-gradient(
        to top,
        ${props => props.$color},
        ${props => new TinyColor(props.$color).lighten(10).toString()}
      )
      border-box;
  border-color: transparent;
  border-radius: ${props => props.theme.border.radius.primary}px;
  border-style: solid;
  border-width: 1px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  color: ${props =>
    isReadable(props.$color, props.theme.color.text.primary)
      ? props.theme.color.text.primary
      : props.theme.color.background.primary};
  cursor: pointer;

  filter: brightness(1);
  font-size: 1rem;
  font-weight: 400;
  padding: ${props => props.$variation && PaddingScale[props.$variation]};
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease-in-out,
    background-image 0.2s ease-in-out, filter 0.2s ease-in-out;

  ${props =>
    props.$kind === 'secondary' &&
    css`
      background: ${props.$color};
      border-color: ${new TinyColor(props.$color).lighten(
        5
      ) as unknown as string};
      border-style: solid;
      border-width: 1px;
      box-shadow: none;

      &:hover {
        filter: brightness(0.9);
      }
    `}
`

export const StyledButtonAnchor = styled(
  Primitive.Text
)<StyledButtonAnchorProps>`
  background: linear-gradient(
        to top,
        ${props => new TinyColor(props.$color).lighten(3).toString()},
        ${props => props.$color}
      )
      padding-box,
    linear-gradient(
        to top,
        ${props => props.$color},
        ${props => new TinyColor(props.$color).lighten(10).toString()}
      )
      border-box;
  border-color: transparent;
  border-radius: ${props => props.theme.border.radius.primary}px;
  border-style: solid;
  border-width: 1px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  color: ${props =>
    isReadable(props.$color, props.theme.color.text.primary)
      ? props.theme.color.text.primary
      : props.theme.color.background.primary};
  cursor: pointer;
  display: inline-block;

  filter: brightness(1);
  font-size: 1rem;
  font-weight: 400;
  padding: ${props => props.$variation && PaddingScale[props.$variation]};
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease-in-out,
    background-image 0.2s ease-in-out, filter 0.2s ease-in-out;


  &:hover {
    filter: brightness(1.1);
    text-decoration: none;
  }

  &:focus {
      text-decoration: none;
  }

  ${props =>
    props.$kind === 'secondary' &&
    css`
      background: ${props.$color};
      border-color: ${new TinyColor(props.$color).lighten(
        5
      ) as unknown as string};
      border-style: solid;
      border-width: 1px;
      box-shadow: none;

      &:hover {
        filter: brightness(0.9);
      }
    `}
`

const Button = React.forwardRef<ButtonRef, ButtonProps>(
  (
    {color, variation = 'md', kind = 'primary', children, ...props},
    forwardedRef
  ) => {
    return (
      <StyledButton
        $color={color}
        $kind={kind}
        $variation={variation}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </StyledButton>
    )
  }
)
const ButtonAnchor = React.forwardRef<ButtonAnchorRef, ButtonAnchorProps>(
  (
    {el = 'a', color, variation = 'md', kind = 'primary', children, ...props},
    forwardedRef
  ) => {
    return (
      <StyledButtonAnchor
        el={el}
        $color={color}
        $kind={kind}
        $variation={variation}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </StyledButtonAnchor>
    )
  }
)

export {Button, ButtonAnchor}

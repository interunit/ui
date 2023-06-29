import React from 'react'

import {useTheme} from '@interunit/config'
import type {Primitive} from '@interunit/primitives'
import {ExtendPrimitive} from '@interunit/primitives'
import {type PrimitiveToExtend} from '@interunit/primitives'

interface TextProps {
  kind?: 'body' | 'heading'
  weight?: 'normal' | 'bold' | 'light'
  variation?: 'sm' | 'md' | 'lg'
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

const Text: PrimitiveToExtend<TextProps>['Text'] = ({
  kind = 'body',
  variation = 'md',
  weight,
  children,
  ...props
}: React.ComponentProps<typeof Primitive.Text> & TextProps) => {
  const theme = useTheme()
  const css = `
    ${kind === 'body' || !kind ? `font-size: ${BodyScale[variation]};` : ''}
    ${kind === 'heading' ? `font-size: ${HeadingScale[variation]};` : ''}
    line-height: ${
      kind === 'body' || !kind
        ? BodyLineHeightScale[variation]
        : HeadingLineHeightScale[variation]
    };
    ${weight && `font-weight: ${weight}`};
    color: ${theme?.color.text.primary};
    `
  return (
    <ExtendPrimitive primitiveToExtend="Text" css={css} {...props}>
      {children}
    </ExtendPrimitive>
  )
}

export {Text}

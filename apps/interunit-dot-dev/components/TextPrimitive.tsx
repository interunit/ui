import React from 'react'

import {useTheme} from '@interunit/config'
import type {Primitive} from '@interunit/primitives'
import {ExtendPrimitive} from '@interunit/primitives'
import {type PrimitiveToExtend} from '@interunit/primitives'

interface TextPrimitiveProps {
  type?: 'body' | 'heading'
  wt?: 'normal' | 'bold' | 'light'
  sz?: 'sm' | 'md' | 'lg'
}

const BodyScale = {
  lg: '1.25rem',
  md: '1rem',
  sm: '0.75rem'
}

const HeadingScale = {
  lg: '4rem',
  md: '3rem',
  sm: '2rem'
}

const TextPrimitive: PrimitiveToExtend<TextPrimitiveProps>['Text'] = ({
  children,
  type,
  wt,
  sz,
  ...props
}: React.ComponentProps<typeof Primitive.Text>) => {
  const theme = useTheme()
  const css = `
    ${type === 'body' || !type ? `font-size: ${BodyScale[sz ?? 'md']};` : ''}
    ${type === 'heading' ? `font-size: ${HeadingScale[sz ?? 'md']};` : ''}
    font-weight: ${wt !== 'normal' ? wt : ''};
    color: ${theme.color.text.primary};
    `
  return (
    <ExtendPrimitive
      primitiveToExtend="Text"
      css={css}
      {...props}
    >
      {children}
    </ExtendPrimitive>
  )
}

export {TextPrimitive}

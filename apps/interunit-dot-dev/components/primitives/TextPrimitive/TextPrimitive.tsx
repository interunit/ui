import React from 'react'

import {useTheme} from '@interunit/config'
import type {Primitive} from '@interunit/primitives'
import {ExtendPrimitive} from '@interunit/primitives'
import {type PrimitiveToExtend} from '@interunit/primitives'

interface TextPrimitiveProps {
  kind?: 'body' | 'heading'
  weight?: 'normal' | 'bold' | 'light'
  variation?: 'sm' | 'md' | 'lg'
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
  kind,
  weight,
  variation,
  children,
  ...props
}: React.ComponentProps<typeof Primitive.Text> & TextPrimitiveProps) => {
  const theme = useTheme()
  const css = `
    ${
      kind === 'body' || !kind
        ? `font-size: ${BodyScale[variation ?? 'md']};`
        : ''
    }
    ${
      kind === 'heading' ? `font-size: ${HeadingScale[variation ?? 'md']};` : ''
    }
    font-weight: ${weight !== 'normal' ? weight : ''};
    color: ${theme?.color.text.primary};
    `
  return (
    <ExtendPrimitive primitiveToExtend="Text" css={css} {...props}>
      {children}
    </ExtendPrimitive>
  )
}

export {TextPrimitive}

import React from 'react'

import {useTheme} from '@interunit/config'
import type {Primitive} from '@interunit/primitives'
import {ExtendPrimitive} from '@interunit/primitives'
import {type PrimitiveToExtend} from '@interunit/primitives'

interface ButtonPrimitiveProps {
  variation?: 'sm' | 'md' | 'lg'
  intent?: 'default' | 'page',
  active?: boolean
}

// TODO: why?
const ButtonPrimitive: PrimitiveToExtend<ButtonPrimitiveProps>['Button'] =
  React.forwardRef(
    (
      {
        variation = 'md',
        intent = 'default',
        active,
        children,
        ...props
      }: React.ComponentProps<typeof Primitive.Button> & ButtonPrimitiveProps,
      forwardedRef: React.Ref<HTMLButtonElement>
    ) => {
      console.log('HEREE comp', forwardedRef)
      const theme = useTheme()
      const PaddingScale = {
        lg: '1.25rem 1.5rem',
        md: '1rem; 1.25rem;',
        sm: '0.5rem 0.75rem'
      }

      const IntentScale = {
        default: theme?.color.background.primary,
        page: 'transparent'
      }
      const css = `
    appearance: none;
    background-color: ${IntentScale[intent]};
    background-image: linear-gradient(rgba(255,255,255,0.3) 0%, ${
      IntentScale[intent]
    } 20%);
    border-radius: 0.5rem;
    border: 1px solid ${IntentScale[intent]};
    color: ${theme?.color.text.primary};
    cursor: pointer;
    filter: brightness(1);
    padding: ${PaddingScale[variation]};
    transition: background-color 0.2s ease-in-out, background-image 0.2s ease-in-out, filter 0.2s ease-in-out;

    &:hover  {
        filter: brightness(1.1);
    }

    ${
      intent === 'page' &&
      `
        background-color: transparent;
        background-image: none;

        &:hover {
            background-color: ${theme?.color?.background?.secondary};
            background-image: linear-gradient(rgba(255,255,255,0.3) 0%, ${theme?.color?.background?.secondary} 20%);
        }
        ${active && `
            background-color: ${theme?.color?.background?.secondary};
            background-image: linear-gradient(rgba(255,255,255,0.3) 0%, ${theme?.color?.background?.secondary} 20%);
        `}
    `
    }

  `

      return (
        <ExtendPrimitive
          primitiveToExtend="Button"
          css={css}
          {...props}
          ref={forwardedRef}
        >
          {children}
        </ExtendPrimitive>
      )
    }
  )

export {ButtonPrimitive}

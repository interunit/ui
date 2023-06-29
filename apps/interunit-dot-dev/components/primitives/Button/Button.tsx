import React from 'react'

import {useTheme} from '@interunit/config'
import type {Primitive} from '@interunit/primitives'
import {ExtendPrimitive} from '@interunit/primitives'
import {type PrimitiveToExtend} from '@interunit/primitives'

interface ButtonProps {
  color: string
  variation?: 'sm' | 'md' | 'lg'
  inverse?: boolean
}

// TODO: why?
const Button: PrimitiveToExtend<ButtonProps>['Button'] = React.forwardRef(
  (
    {
      color,
      variation = 'md',
      inverse,
      children,
      ...props
    }: React.ComponentProps<typeof Primitive.Button> & ButtonProps,
    forwardedRef: React.Ref<HTMLButtonElement>
  ) => {
    const theme = useTheme()
    const PaddingScale = {
      lg: '1.25rem 1.5rem',
      md: '1rem; 1.25rem;',
      sm: '0.5rem 0.75rem'
    }

    const css = `
        appearance: none;
        background-color: ${color};
        background-image: linear-gradient(rgba(255,255,255,0.3) 0%, ${color} 20%);
        border-radius: ${theme?.border.radius.primary}px;
        border: ${theme?.border?.width?.primary}px solid ${color};
        color: ${theme?.color.text.primary};
        cursor: pointer;
        filter: brightness(1);
        padding: ${PaddingScale[variation]};
        transition: background-color 0.2s ease-in-out, background-image 0.2s ease-in-out, filter 0.2s ease-in-out;

        font-weight: bold;

        &:hover  {
            filter: brightness(1.1);
        }

        ${
          inverse &&
          `
            background-color: transparent;
            background-image: none;
            border: 2px solid ${color};

            &:hover {
                background-color: ${color};
                background-image: linear-gradient(rgba(255,255,255,0.3) 0%, ${color} 20%);
            }
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

export {Button}

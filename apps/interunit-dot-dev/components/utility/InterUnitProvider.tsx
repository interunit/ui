'use client'

import React from 'react'
import {createGlobalStyle} from 'styled-components'

import {InterUnitProvider as InterUnit} from '@interunit/config'

import {config} from '../../interunit.config'

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${props => props.theme.color.background.primary};
        color: ${props => props.theme.color.text.primary};
        max-width: 100vw;
    }

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
     }

    & *:focus-visible {
        outline: 2px solid ${props => props?.theme?.color?.outline?.primary};
        outline-offset: 0.4rem;
    }

    & *:focus:not:(:focus-visible) {
        outline: none;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    a:hover, a:focus {
        text-decoration: underline;
    }
`

const InterUnitProvider = ({children}: {children: React.ReactNode}) => {
  // Idk why TS is unhappy with this
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    <InterUnit config={config}>
      <>
        <GlobalStyle />
        {children}
      </>
    </InterUnit>
  )
}

export {InterUnitProvider}

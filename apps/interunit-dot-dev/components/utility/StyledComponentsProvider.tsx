'use client'

import React from 'react'
import {ThemeProvider, createGlobalStyle} from 'styled-components'

import {Theme} from '../../styled-components.config'

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${props => props.theme.color.background.primary};
        color: ${props => props.theme.color.text.primary};
        max-width: 100vw;
    }

    * {
        box-sizing: border-box;
        font-family: var(--font-inter);
        font-size: 1rem;
        margin: 0;
        padding: 0;
     }

     *:focus-visible {
        outline: 2px solid ${props => props?.theme?.color?.outline?.primary};
        outline-offset: 0.4rem;
    }

     *:focus:not(:focus-visible) {
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
export const StyledComponentsProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <>{children}</>
    </ThemeProvider>
  )
}

'use client'

import React from 'react'
import {createGlobalStyle} from 'styled-components'

import {InterUnitProvider as InterUnit} from '@interunit/config'

import {config} from '../../interunit.config'

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${props => props.theme.color.background.primary};
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

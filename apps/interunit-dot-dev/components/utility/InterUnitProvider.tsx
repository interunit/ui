'use client'
import React from 'react'

import {InterUnitProvider as InterUnit} from '@interunit/config'

import {config} from '../../interunit.config'

const InterUnitProvider = ({children}: {children: React.ReactNode}) => {
  // Idk why TS is unhappy with this
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <InterUnit config={config}>{children}</InterUnit>
}

export {InterUnitProvider}

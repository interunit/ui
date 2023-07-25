// 'use client'
// import {InterUnitProvider as InterUnit} from '@interunit/config'
import type React from 'react'

// import {config} from '../../interunit.config'

const InterUnitProvider = ({children}: {children: React.ReactNode}) => {
  return children
  // return (
  //   <InterUnit config={config}>
  //     {/*
  //       // TODO: Idk why TS is unhappy with this
  //      // eslint-disable @typescript-eslint/ban-ts-comment
  //     // @ts-ignore */}
  //     {children}
  //   </InterUnit>
  // )
}

export {InterUnitProvider}

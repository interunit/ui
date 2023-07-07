'use client'

import {Primitive} from '@interunit/primitives'
import React from 'react'

import {DocsSideNavigation} from '@/components/docs/DocsSideNavigation'
import {TopNavigation} from '@/components/global/TopNavigation'
import {ui} from '@/constants/ui'

const DocsLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div style={{height: '100%'}}>
      <TopNavigation />
      <Primitive.Box el="div" className="flex flex-col lg:flex-row h-full">
        <Primitive.Box
          el="div"
          className="sticky top-0 z-10 border-b-[1px] lg:basis-[250px] lg:min-h-screen  lg:border-r-[1px] lg:border-b-none"
        >
          <DocsSideNavigation data={ui} />
        </Primitive.Box>
        <Primitive.Box
          el="div"
          className="flex-1 mx-auto max-w-[1000px] p-8 w-full"
        >
          {children}
        </Primitive.Box>
      </Primitive.Box>
    </div>
  )
}

export default DocsLayout

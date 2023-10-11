'use client'

import {Primitive} from '@interunit/primitives'
import React from 'react'

import {DocsSideNavigation} from '@/components/docs/DocsSideNavigation'
import {TopNavigation} from '@/components/global/TopNavigation'
import {ui} from '@/constants/ui'

const DocsLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="h-full bg-slate-50">
      <TopNavigation />
      <Primitive.Box
        el="div"
        className=" flex flex-col lg:flex-row lg:justify-center lg:max-w-[1250px] lg:mx-auto h-full"
      >
        <Primitive.Box
          el="div"
          className="sticky top-0 z-10 border-gray-200 border-b-[1px] lg:basis-[250px] lg:min-h-screen  lg:border-r-[1px] lg:border-b-0"
        >
          <DocsSideNavigation data={ui} />
        </Primitive.Box>
        <Primitive.Box
          el="div"
          className="flex-1 mx-auto max-w-[900px] p-8 w-full lg:px-16 lg:py-8"
        >
          {children}
        </Primitive.Box>
      </Primitive.Box>
    </div>
  )
}

export default DocsLayout

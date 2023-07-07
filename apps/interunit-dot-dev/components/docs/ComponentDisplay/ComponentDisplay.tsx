import {Primitive} from '@interunit/primitives'
import React from 'react'

const ComponentDisplay = ({children}: {children: React.ReactNode}) => {
  return (
    <Primitive.Box
      el="div"
      className="flex flex-col items-center justify-center py-16 px-4 bg-bg-blended border rounded"
    >
      <Primitive.Box
        el="div"
        className="width-full max-width-[600px]"
      >
        {children}
      </Primitive.Box>
    </Primitive.Box>
  )
}
export {ComponentDisplay}

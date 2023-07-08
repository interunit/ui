import {Primitive} from '@interunit/primitives'
import React from 'react'
import {twMerge} from 'tailwind-merge'

const ComponentDisplay = ({
  className,
  children
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <Primitive.Box
      el="div"
      className={twMerge(
        'flex flex-col items-center justify-center py-16 px-4 bg-bg-blended border rounded',
        className
      )}
    >
      <Primitive.Box el="div" className="width-full max-width-[600px]">
        {children}
      </Primitive.Box>
    </Primitive.Box>
  )
}
export {ComponentDisplay}

import {Primitive} from '@interunit/primitives'
import React from 'react'
import {twMerge} from 'tailwind-merge'

const ComponentDisplay = ({
  className,
  contentClassName,
  children
}: {
  className?: string
  contentClassName?: string
  children: React.ReactNode
}) => {
  return (
    <Primitive.Box
      el="div"
      className={twMerge(
        'flex flex-col items-center justify-center py-16 px-4 bg-slate-50 border border-gray-200 rounded w-full',
        className
      )}
    >
      <Primitive.Box el="div" className={contentClassName}>
        {children}
      </Primitive.Box>
    </Primitive.Box>
  )
}
export {ComponentDisplay}

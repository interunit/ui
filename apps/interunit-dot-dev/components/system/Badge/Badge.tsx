import {Primitive} from '@interunit/primitives'
import React from 'react'
import {twMerge} from 'tailwind-merge'

import {type ThemeColor} from '@/theme.config'

function getSizeClass(size: string) {
  if (size === '1') {
    return 'py-1 px-3'
  }
  if (size === '2') {
    return 'py-2 px-4'
  }
}

const Badge = ({
  color,
  className,
  size = '2',
  children
}: {
  color: ThemeColor
  size?: '1' | '2'
  className?: string
  children: React.ReactNode
}) => {
  return (
    <Primitive.Box
      el="span"
      className={twMerge(
        `inline-block py-2 px-4 rounded border bg-${color}-100 border-${color}-300`,
        getSizeClass(size),
        className
      )}
    >
      {children}
    </Primitive.Box>
  )
}

export {Badge}

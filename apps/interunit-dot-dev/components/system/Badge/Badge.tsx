import {Primitive} from '@interunit/primitives'
import { twMerge} from 'tailwind-merge'
import React from 'react'

import {type ThemeColor, getColorValue} from '@/theme.config'

const Badge = ({
  color,
  className,
  children
}: {
  color: ThemeColor
  className?: string
  children: React.ReactNode
}) => {
  return (
    <Primitive.Box
      el="span"
      className={twMerge('inline-block py-2 px-4 rounded border',className)}
      style={{background: getColorValue(color)}}
    >
      {children}
    </Primitive.Box>
  )
}

export {Badge}

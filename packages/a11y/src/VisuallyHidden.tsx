import React from 'react'

import {Child} from '@interunit/primitives'

import type {CSSProperties} from './types'


const visuallyHiddenStyles = {
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  zIndex: -10000,
  overflow: 'hidden',
  opacity: 0.00000001,
  pointerEvents: 'none'
} as CSSProperties

export const VisuallyHidden = ({
  children,
  ...otherProps
}: {
  children: React.ReactNode
}) => {
  return (
    <Child style={visuallyHiddenStyles} {...otherProps}>
      {children}
    </Child>
  )
}

import React from 'react'

import {Primitive} from '@interunit/primitives'

import type {CSSProperties} from './types'

export const visuallyHiddenStyles = {
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
    <Primitive.Box as="span" style={visuallyHiddenStyles} {...otherProps}>
      {children}
    </Primitive.Box>
  )
}

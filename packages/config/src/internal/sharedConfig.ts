import type React from 'react'

export type Environment = 'web' | 'native'

export type NativeComponent = 'View' | 'Text' | 'Pressable'
export type WebComponent = keyof React.JSX.IntrinsicElements
export type ConstructTag = keyof JSX.IntrinsicElements

export type CSSUnit = 'px' | 'rem' | '%' | string | number
export type CSSUnitValue = 'auto' | number | string

export type InterConstruct =
  | 'A'
  | 'Button'
  | 'Div'
  | 'H1'
  | 'H2'
  | 'H3'
  | 'H4'
  | 'H5'
  | 'H6'
  | 'Image'
  | 'Input'
  | 'Label'
  | 'P'
  | 'Select'
  | 'Span'
  | 'LI'
  | 'UL'
  | 'Section'
  | 'Nav'

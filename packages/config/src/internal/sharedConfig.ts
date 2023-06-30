import type React from 'react'

export type NativeComponent = 'View' | 'Text'
export type WebComponent = keyof React.JSX.IntrinsicElements
export type ConstructTag = keyof JSX.IntrinsicElements

export type CSSUnit = 'px' | 'rem'
export type CSSUnitProperties = {

    SPACING?: CSSUnit
    BORDER_WIDTH?: CSSUnit
    BORDER_RADIUS?: CSSUnit
    ELEMENT_POSITION?: CSSUnit
    SIZING?: CSSUnit
}

export const DEFAULT_CSS_UNIT: CSSUnitProperties = {
    SPACING: 'rem',
    BORDER_WIDTH: 'px',
    BORDER_RADIUS: 'px',
    ELEMENT_POSITION: 'px',
    SIZING: 'px'
  }

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

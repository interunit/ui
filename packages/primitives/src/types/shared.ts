import React from 'react'

/**
 *
 * Primitives can be any React Component or HTML Element.
 *
 */
export type AnyComponent =
  | React.ReactNode
  | React.FunctionComponent<any>
  | React.JSXElementConstructor<any>
  | JSX.Element
  | HTMLElement

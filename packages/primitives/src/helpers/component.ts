import React from 'react'

export const addOptionalProp = (prop: any) => {
  return {...(prop && {[prop]: prop})}
}

/**
 * Check if the `as` prop is a valid Element key,
 * if it is, use the corresponding Element,
 * otherwise, use the `as` prop as a React Function Component.
 */
export const getElementFromAs = <Element, ElementProps>({
  as,
  Element
}: {
  as: unknown
  Element: Element
}) => {
  type ElementAs = keyof typeof Element
  return Object.keys(Element as ElementAs).includes(as as ElementAs as string)
    ? (Element[as as ElementAs] as React.FunctionComponent<
        React.PropsWithChildren<ElementProps>
      >)
    : (as as unknown as React.FunctionComponent<
        React.PropsWithChildren<ElementProps>
      >)
}

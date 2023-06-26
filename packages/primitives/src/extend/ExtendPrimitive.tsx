import React from 'react'

import {Styles} from '../utility/Styles'

// TODO: Span is fallback, would need fallback for RN as well
const Component = Styles({element: 'span'})

const ExtendPrimitive = ({
  ...props
}: {
  children: React.ReactNode
  css?: string
}) => {
  return <Component as="h3" {...props} />
}

export {ExtendPrimitive}

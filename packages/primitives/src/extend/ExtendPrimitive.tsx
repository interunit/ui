import React from 'react'

import {PrimitveComponentToExtend, type Primitive} from '../primitive'

const ExtendPrimitive = ({
  primitiveToExtend,
  ...props
}: {
  primitiveToExtend: keyof typeof Primitive
  children: React.ReactNode
  css?: string
}) => {
  const Component = PrimitveComponentToExtend[
    primitiveToExtend
  ] as (typeof Primitive)[keyof typeof Primitive]
  // TODO: Intersecting types on "as", makes TS unhappy
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Component {...props} />
}

export {ExtendPrimitive}

import React from 'react'

import {type Primitive, PrimitveComponentToExtend} from '../primitive'

const ExtendPrimitive = React.forwardRef(
  (
    {
      primitiveToExtend,
      ...props
    }: {
      primitiveToExtend: keyof typeof Primitive
      children: React.ReactNode
      css?: React.CSSProperties | string
    },
    forwardedRef: any
  ) => {
    const Component = PrimitveComponentToExtend[
      primitiveToExtend
    ] as (typeof Primitive)[keyof typeof Primitive]
    console.log('HERE extend', forwardedRef)
    // TODO: Intersecting types on "as", makes TS unhappy
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Component {...props} ref={forwardedRef} />
  }
)

export {ExtendPrimitive}

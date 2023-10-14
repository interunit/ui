import {Primitive} from '@interunit/primitives'
import React from 'react'

type BoxProps = Omit<React.ComponentPropsWithRef<typeof Primitive.Box>, 'el'> & {
  el?: React.ComponentPropsWithoutRef<typeof Primitive.Box>['el']
}
const Box = React.forwardRef(function Box(
  {el = 'div', ...props}: BoxProps,
  forwardedRef
) {
  return <Primitive.Box el={el} {...props} ref={forwardedRef} />
}) as (props: BoxProps) => React.JSX.Element

export {Box}

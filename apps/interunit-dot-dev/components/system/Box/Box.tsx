import {P} from '@interunit/primitives'
import React from 'react'

type BoxProps = Omit<React.ComponentPropsWithRef<typeof P.BX>, 'el'> & {
  el?: React.ComponentPropsWithoutRef<typeof P.BX>['el']
}
const Box = React.forwardRef(function Box(
  {el = 'div', ...props}: BoxProps,
  forwardedRef
) {
  return <P.BX el={el} {...props} ref={forwardedRef} />
}) as (props: BoxProps) => React.JSX.Element

export {Box}

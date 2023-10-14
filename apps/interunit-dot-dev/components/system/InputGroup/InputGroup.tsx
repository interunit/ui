import type { Primitive} from '@interunit/primitives';
import {Div} from '@interunit/primitives'
import React from 'react'

type InputGroupProps = React.ComponentPropsWithoutRef<
  typeof Primitive.Box<'div'>
> & {
  children?: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: React.Ref<any>
}

const InputGroup = React.forwardRef<any, InputGroupProps>(
  ({className, children, ...props}, forwardedRef) => {
    return (
      <Div
        className={`mb-4 full-width ${className}`}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </Div>
    )
  }
)
export {InputGroup}

import {P, type PP} from '@interunit/primitives'
import React from 'react'

type InputGroupProps = Omit<PP['BX'], 'el'> & {
  el?: 'div'
  children?: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: React.Ref<any>
}

const InputGroup = React.forwardRef<any, InputGroupProps>(
  ({el = 'div', className, children, ...props}, forwardedRef) => {
    return (
      <P.BX
        el={el}
        className={`mb-4 full-width ${className}`}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </P.BX>
    )
  }
)
export {InputGroup}

import {P, type PP} from '@interunit/primitives'
import React from 'react'

type TextProps = PP['TX'] & {
  className?: string
  children?: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: React.Ref<any>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Text = React.forwardRef<any, TextProps>(
  ({className, children, ...props}, forwardedRef) => {
    return (
      <P.TX
        className={`${className ? className : 'text-md'} ${
          className?.includes('-hd') ? 'font-medium' : ''
        }`}
        ref={forwardedRef}
        {...props}
      >
        {children}
      </P.TX>
    )
  }
)

export {Text}

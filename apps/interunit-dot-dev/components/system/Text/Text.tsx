import {P} from '@interunit/primitives'
import React from 'react'

type TextProps = React.ComponentPropsWithoutRef<typeof P.TX> & {
  className?: string
  children?: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: React.Ref<any>
}

type TextRef = React.ElementRef<typeof P.TX>

const Text = React.forwardRef<TextRef, TextProps>(
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

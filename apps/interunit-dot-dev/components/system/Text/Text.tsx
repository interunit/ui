import {Primitive} from '@interunit/primitives'
import React from 'react'

type TextProps = React.ComponentPropsWithoutRef<typeof Primitive.Text> & {
  className?: string
  children: React.ReactNode
}

const Text = React.forwardRef<
  React.ElementRef<typeof Primitive.Text>,
  TextProps
>(({className, children, ...props}, forwardedRef) => {
  return (
    <Primitive.Text
      className={`${className ? className : 'text-md'} ${
        className?.includes('-hd') ? 'font-medium' : ''
      }`}
      ref={forwardedRef}
      {...props}
    >
      {children}
    </Primitive.Text>
  )
})

export {Text}

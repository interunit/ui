import {P} from '@interunit/primitives'
import NextLink, {type LinkProps as NextLinkProps} from 'next/link'
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

type LinkProps = NextLinkProps &
  Omit<React.ComponentPropsWithRef<typeof P.TX<'a'>>, 'el'>

const Link = React.forwardRef(function Link(
  {className, children, ...props}: LinkProps,
  forwardedRef
) {
  return (
    <NextLink
      className={`${className ? className : 'text-md'} ${
        className?.includes('-hd') ? 'font-medium' : ''
      }`}
      ref={forwardedRef}
      {...props}
    >
      {children}
    </NextLink>
  )
})

export {Text, Link}

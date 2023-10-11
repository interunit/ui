import {P} from '@interunit/primitives'
import NextLink, {type LinkProps as NextLinkProps} from 'next/link'
import React from 'react'

function getColorClass(
  color: BaseTextProps['color'],
  kind: BaseTextProps['kind']
) {
  if (kind === 'accent') {
    return `text-${color}-700`
  }
  if (kind === 'normal') {
    return `text-${color}-1100`
  }
}

function getSizeClass(size: string, type: 'heading' | 'text') {
  return `text-${type}-${size}`
}

function getWeightClass(weight: BaseTextProps['weight']) {
  return `font-${weight}`
}

type BaseTextProps = React.ComponentPropsWithoutRef<typeof P.TX> & {
  className?: string
  color?: 'gray' | 'green' | 'red' | 'teal' | 'pink' | 'blue' | 'slate'
  weight?: 'light' | 'normal' | 'medium' | 'bold'
  kind?: 'normal' | 'accent'
}

type HeadingProps = BaseTextProps & {
  size: '1' | '2' | '3'
}

const Heading = React.forwardRef(function Heading(
  {
    color = 'gray',
    kind = 'normal',
    size = '1',
    weight = 'normal',
    className,
    children,
    ...props
  }: HeadingProps,
  forwardedRef
) {
  return (
    <P.TX
      className={[
        getColorClass(color, kind),
        getSizeClass(size, 'heading'),
        getWeightClass(weight),
        className
      ].join(' ')}
      ref={forwardedRef}
      {...props}
    >
      {children}
    </P.TX>
  )
}) as (props: HeadingProps) => React.JSX.Element

type TextProps = BaseTextProps & {
  size: '1' | '2' | '3' | '4' | '6'
}

const Text = React.forwardRef(function Text(
  {
    color = 'gray',
    kind = 'normal',
    size = '1',
    weight = 'normal',
    className,
    children,
    ...props
  }: TextProps,
  forwardedRef
) {
  return (
    <P.TX
      className={[
        getColorClass(color, kind),
        getSizeClass(size, 'text'),
        getWeightClass(weight),
        className
      ].join(' ')}
      ref={forwardedRef}
      {...props}
    >
      {children}
    </P.TX>
  )
}) as (props: TextProps) => React.JSX.Element

type LinkProps = NextLinkProps &
  Pick<
    TextProps,
    'color' | 'kind' | 'size' | 'weight' | 'children' | 'className'
  >

const Link = React.forwardRef(function Link(
  {
    color = 'gray',
    kind = 'normal',
    size = '1',
    weight = 'normal',
    className,
    children,
    ...props
  }: LinkProps,
  forwardedRef
) {
  return (
    <NextLink
      className={[
        getColorClass(color, kind),
        getSizeClass(size, 'text'),
        getWeightClass(weight),
        className
      ].join(' ')}
      {...props}
      ref={forwardedRef as React.RefObject<HTMLAnchorElement>}
    >
      {children}
    </NextLink>
  )
}) as (props: LinkProps) => React.JSX.Element

export {Heading, Text, Link}

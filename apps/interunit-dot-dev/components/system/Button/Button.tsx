import {TinyColor, isReadable} from '@ctrl/tinycolor'
import {Primitive} from '@interunit/primitives'
import React from 'react'

import {type ThemeColor, theme} from '@/theme.config'

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof Primitive.Button> {
  color: ThemeColor
  variation?: 'xs' | 'sm' | 'md' | 'lg'
  kind?: 'primary' | 'secondary'
}

interface ButtonAnchorProps
  extends React.ComponentPropsWithoutRef<typeof Primitive.Text> {
  color: ThemeColor
  variation?: 'xs' | 'sm' | 'md' | 'lg'
  kind?: 'primary'
}

const variationClassName = (variation: ButtonProps['variation']) => {
  switch (variation) {
    case 'xs':
      return 'px-2 py-1'
    case 'sm':
      return 'px-3 py-2'
    case 'md':
      return 'px-5 py-4'
    case 'lg':
      return 'px-6 py-5'
    default:
      return 'px-5 py-4'
  }
}

const kindClassName = (kind: ButtonProps['kind']) => {
  const primary = 'border-transparent'
  switch (kind) {
    case 'primary':
      return primary
    default:
      return primary
  }
}

const baseClassName =
  'appearance-none rounded shadow-button cursor-pointer brightness-100 text-md transition-all hover:brightness-105 hover:no-underline focus:no-underline'
const textClassName =
  'flex flex-row gap-x-2 shadow-button font-normal hover:no-underline'

const getColorValue = (color: ThemeColor) => {
  if (theme.colors[color]) {
    return theme.colors[color]
  }

  return theme.colors['bg-secondary']
}

const getFontColor = (color: string) => {
  return isReadable(color, theme.colors['text-light'])
    ? theme.colors['text-light']
    : theme.colors['text-dark']
}

const getGradient = (color: string) => {
  return `linear-gradient(
        to top,
        ${new TinyColor(color).lighten(3).toString()},
        ${color}
      )
      padding-box,
    linear-gradient(
        to top,
        ${color},
        ${new TinyColor(color).lighten(10).toString()}
      )
      border-box`
}
const Button = React.forwardRef<
  React.ElementRef<typeof Primitive.Button>,
  ButtonProps
>(
  (
    {
      color = 'bg-secondary' as ThemeColor,
      variation = 'md',
      kind = 'primary',
      className,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const colorValue = getColorValue(color)
    return (
      <Primitive.Button
        className={`${baseClassName} ${kindClassName(
          kind
        )} ${variationClassName(variation)} ${className}`}
        style={{
          color: getFontColor(colorValue),
          background: getGradient(colorValue)
        }}
        {...props}
        ref={forwardedRef}
      >
        <Primitive.Text el="span" className={textClassName}>
          {children}
        </Primitive.Text>
      </Primitive.Button>
    )
  }
)
const ButtonAnchor = React.forwardRef<
  React.ElementRef<typeof Primitive.Text>,
  ButtonAnchorProps
>(
  (
    {
      el = 'a',
      color = 'bg-secondary',
      variation = 'md',
      kind = 'primary',
      className,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const colorValue = getColorValue(color)
    return (
      <Primitive.Text
        el={el}
        className={`${baseClassName} inline-block ${kindClassName(
          kind
        )} ${variationClassName(variation)} ${className}`}
        style={{
          color: getFontColor(colorValue),
          background: getGradient(colorValue)
        }}
        {...props}
        ref={forwardedRef}
      >
        <Primitive.Text el="span" className={textClassName}>
          {children}
        </Primitive.Text>
      </Primitive.Text>
    )
  }
)

export {Button, ButtonAnchor}

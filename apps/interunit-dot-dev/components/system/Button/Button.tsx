import {TinyColor, isReadable} from '@ctrl/tinycolor'
import {P} from '@interunit/primitives'
import React from 'react'
import {twMerge} from 'tailwind-merge'

import {type ThemeColor, theme} from '@/theme.config'

type ButtonKind = 'primary' | 'text'
type ButtonProps = Omit<React.ComponentPropsWithoutRef<typeof P.BT>, 'el'> & {
  color: ThemeColor
  variation?: 'xs' | 'sm' | 'md' | 'lg'
  kind?: ButtonKind
}

type ButtonAnchorProps = React.ComponentPropsWithoutRef<typeof P.TX> & {
  color: ThemeColor
  variation?: 'xs' | 'sm' | 'md' | 'lg'
  kind?: ButtonKind
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
  const primary =
    'border-transparent appearance-none rounded shadow-button cursor-pointer brightness-100 text-md transition-all hover:brightness-105 hover:no-underline focus:no-underline'
  switch (kind) {
    case 'primary':
      return 'border-transparent appearance-none rounded shadow-button cursor-pointer brightness-100 text-md transition-all hover:brightness-105 hover:no-underline focus:no-underline'
    case 'text':
      return `border-transparent bg-transparent hover:opacity-70 transition-opacity rounded`
    default:
      return primary
  }
}

const textClassName =
  'flex flex-row items-center justify-between gap-x-2 shadow-button font-normal hover:no-underline'

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

const getButtonStyle = (kind: ButtonKind, colorValue: string) => {
  if (kind === 'primary') {
    return {
      color: getFontColor(colorValue),
      background: getGradient(colorValue)
    }
  }

  return {}
}

const Button = React.forwardRef<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
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
      <P.BT
      el="button"
        className={twMerge(
          kindClassName(kind),
          variationClassName(variation),
          className
        )}
        style={getButtonStyle(kind, colorValue)}
        {...props}
        ref={forwardedRef}
      >
        <P.TX el="span" className={textClassName}>
          {children}
        </P.TX>
      </P.BT>
    )
  }
)
const ButtonAnchor = React.forwardRef<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
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
      <P.TX
        el={el}
        className={twMerge(
          'inline-block',
          kindClassName(kind),
          variationClassName(variation),
          className
        )}
        style={getButtonStyle(kind, colorValue)}
        {...props}
        ref={forwardedRef}
      >
        <P.TX el="span" className={textClassName}>
          {children}
        </P.TX>
      </P.TX>
    )
  }
)

export {Button, ButtonAnchor}

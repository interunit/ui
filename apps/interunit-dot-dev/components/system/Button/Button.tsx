import {Primitive} from '@interunit/primitives'
import React from 'react'
import {twMerge} from 'tailwind-merge'

import {type ThemeColor, theme} from '@/theme.config'

type ButtonKind = 'primary' | 'text'
type ButtonProps = Omit<React.ComponentPropsWithoutRef<typeof Primitive.Button>, 'el'> & {
  el?: React.ComponentPropsWithoutRef<typeof Primitive.Button>['el']
  color: ThemeColor
  size?: '1' | '2' | '3' | '4'
  kind?: ButtonKind
}

type ButtonAnchorProps = Omit<
  React.ComponentPropsWithoutRef<typeof Primitive.Text>,
  'el'
> & {
  el?: React.ComponentPropsWithoutRef<typeof Primitive.Text>['el']
  color: ThemeColor
  size?: '1' | '2' | '3' | '4'
  kind?: ButtonKind
}

const sizeClassName = (size: ButtonProps['size']) => {
  switch (size) {
    case '1':
      return 'px-2 py-1'
    case '2':
      return 'px-3 py-2'
    case '3':
      return 'px-5 py-4'
    case '4':
      return 'px-6 py-5'
    default:
      return 'px-5 py-4'
  }
}

const kindClassName = (kind: ButtonProps['kind']) => {
  const primary =
    'border-transparent appearance-none rounded shadow-button cursor-pointer brightness-100 text-md transition-all hover:brightness-125 hover:no-underline focus:no-underline'
  switch (kind) {
    case 'primary':
      return 'border-transparent appearance-none rounded shadow-button cursor-pointer brightness-100 text-md transition-all hover:brightness-125 hover:no-underline focus:no-underline'
    case 'text':
      return `border-transparent bg-transparent hover:opacity-70 transition-opacity rounded`
    default:
      return primary
  }
}

const textClassName =
  'flex flex-row items-center justify-between gap-x-2 shadow-button font-normal hover:no-underline'

const getFontColor = () => {
  return theme.colors.gray['900']
}

const getGradient = (color: string) => {
  return `linear-gradient(
        to top,
        ${`var(--${color}-${100})`},
        ${`var(--${color}-${200})`}
      )
      padding-box,
    linear-gradient(
        to top,
        ${`var(--${color}-${300})`},
        ${`var(--${color}-${200})`}
      )
      border-box`
}

const getButtonStyle = (kind: ButtonKind, color: string) => {
  if (kind === 'primary') {
    return {
      color: getFontColor(),
      background: getGradient(color)
    }
  }

  return {}
}

const Button = React.forwardRef(
  (
    {
      el = 'button',
      color = 'slate' as ThemeColor,
      size = '2',
      kind = 'primary',
      className,
      children,
      ...props
    }: ButtonProps,
    forwardedRef
  ) => {
    return (
      <Primitive.Button
        el={el}
        className={twMerge(kindClassName(kind), sizeClassName(size), className)}
        style={getButtonStyle(kind, color)}
        {...props}
        ref={forwardedRef}
      >
        <Primitive.Text el="span" className={textClassName}>
          {children}
        </Primitive.Text>
      </Primitive.Button>
    )
  }
) as (props: ButtonProps) => React.JSX.Element

const ButtonAnchor = React.forwardRef<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  ButtonAnchorProps
>(
  (
    {
      color = 'bg-secondary',
      size = '2',
      kind = 'primary',
      className,
      children,
      ...props
    },
    forwardedRef
  ) => {
    return (
      <Primitive.Text
        el={'a'}
        className={twMerge(
          'inline-block',
          kindClassName(kind),
          sizeClassName(size),
          className
        )}
        style={getButtonStyle(kind, color)}
        {...props}
        ref={forwardedRef}
      >
        <Primitive.Text el="span" className={textClassName}>
          {children}
        </Primitive.Text>
      </Primitive.Text>
    )
  }
) as (props: ButtonAnchorProps) => React.JSX.Element

export {Button, ButtonAnchor}

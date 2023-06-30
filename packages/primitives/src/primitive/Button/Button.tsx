import React from 'react'
import type {Pressable} from 'react-native'

import {InterUnitInternals} from '@interunit/config'

import {Construct} from '../../config'

type PressableComponent = React.ElementType<typeof Pressable>

const ENVIRONMENT = InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT.NAME
type ValidWebButtonConstruct = HTMLButtonElement
type ValidNativeButtonConstruct = PressableComponent
type ValidButtonConstruct = ValidWebButtonConstruct & ValidNativeButtonConstruct
type ValidButtonConstructProps = React.HTMLProps<ValidButtonConstruct> &
  React.ComponentProps<PressableComponent>

const ButtonConstruct = {
  button: Construct.Button
}

type ButtonConstructAs = 'button'

// TODO: Omit seems wrong, not sure why Button complains when being called though
export interface ButtonPrimitiveProps
  extends Omit<ValidButtonConstructProps, 'name' | '$$typeof'> {
  as?: ButtonConstructAs
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  children: React.ReactNode
  ref?: React.Ref<ValidButtonConstruct>
  onClickOrPress?: (e: React.MouseEvent | React.TouchEvent) => void

  /*
   * Similar accessibility props between React Native and Web
   */
  // Web Accessibility
  'aria-label'?: string

  // Native Accessibility
  accessible?: boolean
  accessibilityLabel?: string
  accessibilityRole?: string
  accessibilityState?: {
    disabled?: boolean
  }
}

type ButtonPrimitiveRef = ValidButtonConstruct

const Button = React.forwardRef<ButtonPrimitiveRef, ButtonPrimitiveProps>(
  ({as = 'button', type = 'button', children, ...props}, forwardedRef) => {
    /*
     * Map similar accessibility props between React Native and Web
     */
    // TODO: probably makes sense to centralize this
    const accessibilityProps = {
      accessible: props.accessible ?? undefined,
      accessibilityLabel:
        props?.accessibilityLabel ?? props?.['aria-label'] ?? undefined,
      accessibilityRole: props?.accessibilityRole ?? props?.role ?? undefined,
      accessibilityState:
        props?.accessibilityState ?? props?.disabled ?? undefined
    }

    const Button = ButtonConstruct?.[as] as React.ElementType

    if (Button === undefined) {
      throw new Error(
        `The element "${as}" doesn't exist in the Button component.`
      )
    }

    if (props?.onClickOrPress) {
      if (ENVIRONMENT === 'native') {
        // TODO: How to type this properly?
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        props.onPress = props.onClickOrPress
        delete props.onClickOrPress
        delete props.onClick
      }
      if (ENVIRONMENT === 'web') {
        props.onClick = props.onClickOrPress
        delete props.onClickOrPress
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete props.onPress
      }
    }

    return (
      <Button type={type} ref={forwardedRef} {...accessibilityProps} {...props}>
        {children}
      </Button>
    )
  }
)

export {Button}

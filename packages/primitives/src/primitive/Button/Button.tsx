import React from 'react'
import type {Pressable} from 'react-native'

import {Construct} from '../../config'
import {filterPropsByEnvironment} from '../../helpers/props'

type PressableComponent = React.ElementType<typeof Pressable>

type ValidWebButtonConstruct = HTMLButtonElement
type ValidNativeButtonConstruct = PressableComponent
type ValidButtonConstruct = ValidWebButtonConstruct & ValidNativeButtonConstruct
type ValidButtonConstructProps = React.HTMLProps<ValidButtonConstruct> &
  React.ComponentProps<PressableComponent>

const ButtonConstruct = {
  button: Construct.Button
}

type ButtonConstructEl = 'button'

// TODO: Omit seems wrong, not sure why Button complains when being called though
export interface ButtonPrimitiveProps
  extends Omit<ValidButtonConstructProps, 'name' | '$$typeof'> {
  el?: ButtonConstructEl
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
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


const Button = React.forwardRef<any, ButtonPrimitiveProps>(
  ({el = 'button', type = 'button', children, ...props}, forwardedRef) => {
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

    const Button = ButtonConstruct?.[el] as React.ElementType

    if (Button === undefined) {
      throw new Error(
        `The element "${el}" doesn't exist in the Button component.`
      )
    }

    const filteredProps = filterPropsByEnvironment({
      props: {...props, ...accessibilityProps}
    })

    return (
      <Button type={type} ref={forwardedRef} {...filteredProps}>
        {children}
      </Button>
    )
  }
)

export {Button}

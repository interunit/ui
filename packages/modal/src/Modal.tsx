import React from 'react'
import {type ModalProps as RNModalProps} from 'react-native'

import {ModalComponent} from './ModalComponent'

type FocusType = 'none' | 'default'
export type BaseModalProps = {
  isOpen?: boolean | undefined
  onClose: () => void
  children: React.ReactNode
  focusType: FocusType
}

type ModalProps = (React.HTMLProps<'div'> | RNModalProps) & BaseModalProps

const Modal = React.forwardRef<any, ModalProps>(
  ({children, ...props}, forwardedRef) => {
    const calculateFocus = (focusType: FocusType) => {
      if (focusType === 'none') {
        return false
      }
      return true
    }

    return (
      <ModalComponent
        active={calculateFocus(props.focusType)}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </ModalComponent>
    )
  }
)

export {Modal}

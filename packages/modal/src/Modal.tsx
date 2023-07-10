import React from 'react'
import {type ModalProps as RNModalProps} from 'react-native'

import {ModalComponent} from './ModalComponent'

export type BaseModalProps = {
  isOpen?: boolean | undefined
  onClose: () => void
  children: React.ReactNode
}

type ModalProps = (React.HTMLProps<'div'> | RNModalProps) & BaseModalProps

const Modal = React.forwardRef<any, ModalProps>(
  ({children, ...props}, forwardedRef) => {
    return (
      <ModalComponent {...props} ref={forwardedRef}>
        {children}
      </ModalComponent>
    )
  }
)

export {Modal}

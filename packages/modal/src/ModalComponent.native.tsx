import React from 'react'

import type {BaseModalProps} from './Modal'

const ModalComponent = React.forwardRef<any, BaseModalProps>(
  ({isOpen, onClose, children}, forwardedRef) => {
    const {Modal} = require('react-native')

    return (
      <Modal
        visible={isOpen || isOpen === undefined}
        onShow={() => console.log('show')}
        onRequestClose={onClose}
        ref={forwardedRef}
      >
        {children}
      </Modal>
    )
  }
)

export {ModalComponent}

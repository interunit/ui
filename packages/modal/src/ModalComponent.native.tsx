import {P} from '@interunit/primitives'
import React from 'react'

import type {BaseModalProps} from './Modal'

// TODO: Revisit this and how react-native modal would
// be used
const ModalComponent = React.forwardRef<any, BaseModalProps>(
  ({children, ...props}, forwardedRef) => {
    // ({isOpen, onClose, children}, forwardedRef) => {
    // const {Modal} = require('react-native')

    return (
      <P.BX el="div" {...props} ref={forwardedRef}>
        {children}
      </P.BX>
    )

    // return (
    //   <Modal
    //     visible={isOpen || isOpen === undefined}
    //     onShow={() => console.log('show')}
    //     onRequestClose={onClose}
    //     ref={forwardedRef}
    //   >
    //     {children}
    //   </Modal>
    // )
  }
)

export {ModalComponent}

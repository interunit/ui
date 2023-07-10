import {
  VisuallyHidden,
  useAccessibleClose,
  useLockBodyScroll
} from '@interunit/a11y'
import {P} from '@interunit/primitives'
import FocusTrap from 'focus-trap-react'
import React from 'react'

import {type BaseModalProps} from './Modal'

const ModalComponent = React.forwardRef<any, BaseModalProps>(
  ({isOpen, onClose, children, ...props}, forwardedRef) => {
    const modalComponentRef = React.useRef(null)

    useLockBodyScroll(isOpen === true || isOpen === undefined)
    useAccessibleClose({onClose, KeyDownElement: modalComponentRef})

    return (
      <FocusTrap focusTrapOptions={{tabbableOptions: {displayCheck: 'none'}}}>
        <P.BX
          el="div"
          role="dialog"
          aria-hidden={!isOpen || isOpen === undefined}
          ref={el => {
            modalComponentRef.current = el
            if (forwardedRef) {
              // TODO: Not sure why TS doesn't like this
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              forwardedRef.current = el
            }
          }}
          {...props}
        >
          <VisuallyHidden>
            <P.BT type="button" onClick={onClose}>
              Close Modal
            </P.BT>
          </VisuallyHidden>
          {children}
        </P.BX>
      </FocusTrap>
    )
  }
)

export {ModalComponent}

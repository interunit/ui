import {
  VisuallyHidden,
  useAccessibleClose,
  useLockBodyScroll
} from '@interunit/a11y'
import {P} from '@interunit/primitives'
import FocusTrap, {type Props as FocusTrapProps} from 'focus-trap-react'
import React from 'react'

import {type BaseModalProps} from './Modal'

type ModalComponentProps = BaseModalProps & FocusTrapProps

const ModalComponent = React.forwardRef<any, ModalComponentProps>(
  ({isOpen, onClose, children, ...props}, forwardedRef) => {
    const modalComponentRef = React.useRef(null)

    useLockBodyScroll(isOpen === true || isOpen === undefined)
    useAccessibleClose({onClose, KeyDownElement: modalComponentRef})

    return (
      <FocusTrap
        focusTrapOptions={{
          tabbableOptions: {displayCheck: 'none'},
          ...props.focusTrapOptions
        }}
        active={props?.active ?? true}
        paused={props?.paused ?? false}

      >
        <P.BX
          el="div"
          role="dialog"
          aria-hidden={!isOpen || isOpen === undefined}
          ref={el => {
            modalComponentRef.current = el as any
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
            <P.BT el="button" type="button" onClick={onClose}>
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

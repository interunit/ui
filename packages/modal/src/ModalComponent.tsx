import {
  VisuallyHidden,
  useAccessibleClose,
  useLockBodyScroll
} from '@interunit/a11y'
import {P} from '@interunit/primitives'
import _FocusTrap, {type Props as FocusTrapProps} from 'focus-trap-react'
import React from 'react'

import {type BaseModalProps} from './Modal'

// 'FocusTrapProps' doesn't include children, so we need to redeclare it here
const FocusTrap = _FocusTrap as React.ElementType<FocusTrapProps>

type FocusType = 'none' | 'default'
 type ModalComponentProps = BaseModalProps &
  Pick<FocusTrapProps, 'focusTrapOptions' | 'active'> & {
    children: React.ReactNode
  }

const ModalComponent = React.forwardRef<any, ModalComponentProps>(
  (
    {isOpen, onClose, focusType = 'default', children, ...props},
    forwardedRef
  ) => {
    const modalComponentRef = React.useRef(null)

    useLockBodyScroll({
      isLocked: isOpen === true || isOpen === undefined,
      enabled: focusType !== 'none'
    })

    useAccessibleClose({onClose, KeyDownElement: modalComponentRef})

    const calculateFocus = (focusType: FocusType) => {
      if (focusType === 'none') {
        return false
      }
      return true
    }

    return (
      <FocusTrap
        focusTrapOptions={{
          tabbableOptions: {displayCheck: 'none'},
          ...props.focusTrapOptions
        }}
        active={calculateFocus(focusType)}
      >
        <P.BX
          el="div"
          role="dialog"
          aria-hidden={!isOpen || isOpen === undefined}
          ref={(el: React.RefObject<any>) => {
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

import {useAccessibleClose, useLockBodyScroll} from '@interunit/a11y'
import {Child, P} from '@interunit/primitives'
import {useCombinedRefs} from '@interunit/toolbox'
import _FocusTrap, {type Props as FocusTrapProps} from 'focus-trap-react'
import React from 'react'

import {type BaseModalProps} from './Modal'

// 'FocusTrapProps' doesn't include children, so we need to redeclare it here
const FocusTrap = _FocusTrap as React.ElementType<FocusTrapProps>

type FocusType = 'none' | 'default'
type ModalComponentProps = BaseModalProps &
  Pick<
    FocusTrapProps,
    'focusTrapOptions' | 'active' | 'paused' | 'containerElements'
  > & {
    children: React.ReactNode
  }

const ModalComponent = React.forwardRef<any, ModalComponentProps>(
  (
    {isOpen, onClose, focusType = 'default', asChild, children, ...props},
    forwardedRef
  ) => {
    const modalComponentRef = React.useRef(null)
    const Box = asChild ? Child : P.BX

    useLockBodyScroll({
      isLocked: isOpen === true || isOpen === undefined,
      enabled: focusType !== 'none'
    })

    useAccessibleClose({onClose, KeyDownElement: modalComponentRef})
    const combinedRefs = useCombinedRefs(forwardedRef, modalComponentRef)

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
        <Box
          el="div"
          role="dialog"
          aria-hidden={!isOpen || isOpen === undefined}
          ref={combinedRefs}
          {...props}
        >
          {children}
        </Box>
      </FocusTrap>
    )
  }
)

export {ModalComponent}

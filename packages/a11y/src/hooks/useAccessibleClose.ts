import React from 'react'

type UseAccessibleCloseProps = {
  onClose: () => void
  KeyDownElement?: React.RefObject<any>
}

const useAccessibleClose = ({
  onClose,
  KeyDownElement
}: UseAccessibleCloseProps) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }
  React.useEffect(() => {
    let element = document.body

    if (KeyDownElement?.current) {
      element = KeyDownElement.current
    }

    element.addEventListener('keydown', handleKeyDown)

    return () => {
      element.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
}

export {useAccessibleClose}

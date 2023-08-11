import {getEnvironmentName} from '@interunit/config'
import React from 'react'

const useOutsideClick = ({
  ref,
  fn,
  isEnabled = true
}: {
  ref: React.RefObject<any>
  fn: () => void
  isEnabled?: boolean
}) => {
  // no-op until we figure out how to get this working in native
  if (getEnvironmentName() === 'native') return
  const handleClick = (event: MouseEvent) => {
    if (isEnabled && ref.current && !ref.current.contains(event.target)) {
      fn()
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}

export {useOutsideClick}

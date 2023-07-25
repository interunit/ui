// TODO: Make this work with native
import React from 'react'

const useOutsideClick = ({
  ref,
  fn
}: {
  ref: React.RefObject<any>
  fn: () => void
}) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target)) {
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

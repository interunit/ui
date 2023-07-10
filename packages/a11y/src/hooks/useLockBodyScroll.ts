// Strategy for locking taken from here: https://pqina.nl/blog/how-to-prevent-scrolling-the-page-on-ios-safari/
// No longer have to use position fixed on the body :)
import {useEffect} from 'react'

const useLockBodyScroll = (isLocked: boolean) => {
  useEffect(() => {
    const body = document.querySelector('body')
    if (body) {
      if (isLocked) {
        body.style.overflow = 'hidden'
        body.style.height = `${window.innerHeight}px`
      } else {
        body.style.overflow = 'visible'
        body.style.height = 'auto'
      }

      return () => {
        body.style.overflow = 'visible'
        body.style.height = 'auto'
      }
    }
  }, [isLocked])
}

export {useLockBodyScroll}

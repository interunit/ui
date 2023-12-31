import {getEnvironmentName} from '@interunit/config'
import React from 'react'

type UseKeyboardNavigationParams = {
  ref: React.RefObject<HTMLElement>
  attribute: string
  onFocusChange: (focusedElement: HTMLElement) => void
}

function useKeyboardNavigation(params: UseKeyboardNavigationParams) {
  if (getEnvironmentName() === 'native') return

  //
  // Move focus when user wants the focus to stay inside
  // the current focusable elements
  //
  function moveFocusInside({direction}: {direction: 'forward' | 'backward'}) {
    const focusedElement = document.activeElement

    const focusableElements =
      params.ref.current?.querySelectorAll(`[${params.attribute}]`) ?? []

    if (!focusedElement) return focusableElements[0] as HTMLElement

    const indexOfFocusedElement =
      Array.from(focusableElements).indexOf(focusedElement)

    const edgeOfFocusableElements =
      direction === 'forward' ? focusableElements.length - 1 : 0

    if (indexOfFocusedElement === edgeOfFocusableElements) {
      const nextIndex =
        direction === 'forward' ? 0 : focusableElements.length - 1
      const nextElement = focusableElements[nextIndex] as HTMLElement
      nextElement?.focus()
      return nextElement
    }

    const nextIndex =
      direction === 'forward'
        ? indexOfFocusedElement + 1
        : indexOfFocusedElement - 1

    const nextElement = focusableElements[nextIndex] as HTMLElement
    nextElement?.focus()

    return nextElement
  }

  //
  // Move focus when user interacts with keyboard
  //
  function handleKeyDown(event: KeyboardEvent) {
    const orientation =
      params.ref.current?.getAttribute('aria-orientation') ?? 'horizontal'

    if (!(event.target as HTMLElement)?.hasAttribute(params.attribute)) return

    if (orientation === 'horizontal') {
      if (event.key === 'ArrowRight') {
        params.onFocusChange(moveFocusInside({direction: 'forward'}))
      }
      if (event.key === 'ArrowLeft') {
        params.onFocusChange(moveFocusInside({direction: 'backward'}))
      }
    }

    if (orientation === 'vertical') {
      if (event.key === 'ArrowDown') {
        params.onFocusChange(moveFocusInside({direction: 'forward'}))
      }
      if (event.key === 'ArrowUp') {
        params.onFocusChange(moveFocusInside({direction: 'backward'}))
      }
    }
  }

  //
  // Broadcast the focused element to the parent component.
  //
  function handleFocusIn(event: FocusEvent) {
    const focusedElement = document.activeElement

    if (focusedElement === event.target) {
      params.onFocusChange(focusedElement as HTMLElement)
    }
  }

  //
  // Add focus listeners to the focusable elements inside the component.
  // So that we can broadcast the focused element to the parent component.
  //
  function setupFocusListeners() {
    const focusableElements =
      params.ref.current?.querySelectorAll(`[${params.attribute}]`) ?? []

    focusableElements.forEach(_element => {
      const element = _element as HTMLElement // eslint/prettier battle
      element.addEventListener('focusin', handleFocusIn)
    })
  }

  //
  // Remove focus listeners from the focusable elements inside the component.
  //
  function removeFocusListeners() {
    const focusableElements =
      params.ref.current?.querySelectorAll(`[${params.attribute}]`) ?? []

    focusableElements.forEach(_element => {
      const element = _element as HTMLElement // eslint/prettier battle
      element.removeEventListener('focusin', handleFocusIn)
    })
  }

  React.useEffect(() => {
    if (params.ref.current) {
      setupFocusListeners()
      params.ref.current.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      if (params.ref.current) {
        removeFocusListeners()
        params.ref.current.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [params.ref])
}

export {useKeyboardNavigation}

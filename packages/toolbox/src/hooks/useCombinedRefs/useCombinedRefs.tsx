import React from 'react'

type PossibleRef<T> = React.Ref<T> | undefined

function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref !== null && ref !== undefined) {
    const _ref = ref as React.MutableRefObject<T>
    _ref.current = value
  }
}

function combineRefs<T>(...refs: Array<PossibleRef<T>>) {
  return (node: T) => refs.length > 0 && refs.forEach(ref => setRef(ref, node))
}

function useCombinedRefs<T>(...refs: Array<PossibleRef<T>>) {
  return React.useCallback(combineRefs(...refs), refs)
}

export {useCombinedRefs}

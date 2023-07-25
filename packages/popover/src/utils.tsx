import type React from 'react'

// RN doesn't like NaN styles and floating-ui doesn't filter it out
export const pruneStyles = (_styles: React.CSSProperties) => {
  if (Object.keys(_styles).length === 0) return {}

  const Styles = {}

  Object.keys(_styles).forEach(key => {
    if (
      _styles[key as keyof React.CSSProperties] ||
      _styles[key as keyof React.CSSProperties] === 0
    ) {
      Object.assign(Styles, {
        [key]: _styles[key as keyof React.CSSProperties]
      })
    }
  })

  return Styles
}

import React from 'react'

import {firaCode} from '@/fonts'

const CodeTag = ({children}: {children: React.ReactNode}) => {
  return (
    <code
      className={`text-sm bg-bg-blended border rounded ${firaCode.className}`}
    >
      {children}
    </code>
  )
}

export {CodeTag}

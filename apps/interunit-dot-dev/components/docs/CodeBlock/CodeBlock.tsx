/* eslint-disable */
import {P} from '@interunit/primitives'
// @ts-ignore
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import React from 'react'

import {firaCode} from '@/fonts'

import './night-owl.css'

const CodeBlock = ({
  language = 'tsx',
  code,
  className
}: {
  language?: 'tsx' | 'ts'
  code: string
  className?: string
}) => {
  React.useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <P.BX el="div" className={className}>
      <pre>
        <code className={`language-${language} ${firaCode.className}`}>{code}</code>
      </pre>
    </P.BX>
  )
}

export {CodeBlock}

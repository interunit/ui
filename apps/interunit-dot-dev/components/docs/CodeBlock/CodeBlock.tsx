/* eslint-disable */
// @ts-ignore
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import React from 'react'

import './night-owl.css'

const CodeBlock = ({
  language = 'tsx',
  code
}: {
  language?: 'tsx' | 'ts'
  code: string
}) => {
  React.useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <pre>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  )
}

export {CodeBlock}

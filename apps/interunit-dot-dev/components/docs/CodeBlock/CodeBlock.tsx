/* eslint-disable */
import {Primitive} from '@interunit/primitives'
import {Check, Copy} from 'lucide-react'
// @ts-ignore
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import React from 'react'
import {twMerge} from 'tailwind-merge'

import {Button} from '@/components/system/Button'
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
    // highlighting all instantly doesn't work
    setTimeout(() => {
      Prism.highlightAll()
    }, 100)
  }, [])

  const [isCopied, setIsCopied] = React.useState(false)
  const copyArea = React.useRef(null)
  const copyToClipboard = () => {
    const copyText = copyArea.current

    if (!copyText) return

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const textToCopy = copyText?.innerText
    navigator.clipboard.writeText(textToCopy)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  return (
    <Primitive.Box el="div" className={twMerge(className, 'relative')}>
      <Button
        color="gray"
        size="1"
        onClick={() => copyToClipboard()}
        className="w-8 h-8 absolute right-4 top-4"
      >
        <Check
          size={16}
          role="img"
          aria-label="Copy"
          className={twMerge(
            'absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] transition-opacity',
            isCopied ? 'opacity-1' : 'opacity-0'
          )}
        />
        <Copy
          size={16}
          role="img"
          aria-label="Copy"
          className={twMerge(
            'absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] transition-opacity',
            isCopied ? 'opacity-0' : 'opacity-1'
          )}
        />
      </Button>
      <pre>
        <code
          className={`language-${language} ${firaCode.className}`}
          ref={copyArea}
        >
          {code}
        </code>
      </pre>
    </Primitive.Box>
  )
}

export {CodeBlock}

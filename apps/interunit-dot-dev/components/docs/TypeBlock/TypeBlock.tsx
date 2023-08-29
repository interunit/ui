import React from 'react'

import {CodeBlock} from '@/components/docs/CodeBlock'

const TypeBlock = ({
  packageName,
  type,
  className
}: {
  packageName: string
  type: string
  className?: string
}) => {
  const [content, setContent] = React.useState('')

  React.useEffect(() => {
    fetch(`/generated/markdown-types/${packageName}/${type}.md`)
      .then(res => res.text())
      .then(text => setContent(text))
  }, [])

  return <CodeBlock code={content} className={className} />
}

export {TypeBlock}

import {Primitive} from '@interunit/primitives'
import {Copy} from 'lucide-react'
import React from 'react'

import {Button} from '@/components/system/Button'
import {Text} from '@/components/system/Text'

const InstallBlock = ({packageName}: {packageName: string}) => {
  const [manager, setManager] = React.useState<'npm' | 'yarn' | 'pnpm'>('npm')
  const copyArea = React.useRef(null)

  const copyToClipboard = () => {
    const copyText = copyArea.current

    if (!copyText) return

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const textToCopy = copyText?.innerText
    navigator.clipboard.writeText(textToCopy)
  }

  return (
    <Primitive.Box
      el="div"
      className="bg-bg-blended border rounded max-w-[400px] w-full"
    >
      <Primitive.Box
        el="div"
        className="flex flex-row bg-border rounded-tr-[7px] rounded-tl-[7px]"
      >
        <Button
          onClick={() => setManager('npm')}
          color="bg-muted"
          variation="sm"
          className="text-sm rounded-br-none rounded-bl-none rounded-tr-none "
        >
          npm
        </Button>
        <Button
          onClick={() => setManager('yarn')}
          color="bg-muted"
          variation="sm"
          className="text-sm rounded-none"
        >
          yarn
        </Button>
        <Button
          onClick={() => setManager('pnpm')}
          color="bg-muted"
          variation="sm"
          className="text-sm rounded-tl-none rounded-br-none rounded-bl-none"
        >
          pnpm
        </Button>
      </Primitive.Box>
      <Primitive.Box
        el="div"
        className="p-6 flex flex-row items-center justify-between w-full gap-4"
      >
        <Text el="span" id="packageInstall" ref={copyArea}>
          {manager === 'npm' && `npm install ${packageName}`}
          {manager === 'yarn' && `yarn add ${packageName}`}
          {manager === 'pnpm' && `pnpm install ${packageName}`}
        </Text>
        <Button
          color="bg-muted"
          variation="sm"
          onClick={() => copyToClipboard()}
        >
          <Copy size={16} role="img" aria-label="Copy" />
        </Button>
      </Primitive.Box>
    </Primitive.Box>
  )
}

export {InstallBlock}

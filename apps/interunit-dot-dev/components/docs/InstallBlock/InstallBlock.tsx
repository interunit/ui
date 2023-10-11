import {Primitive} from '@interunit/primitives'
import {Check, Copy} from 'lucide-react'
import React from 'react'
import {twMerge} from 'tailwind-merge'

import {Button} from '@/components/system/Button'
import {Text} from '@/components/system/Text'
import {firaCode} from '@/fonts'

const InstallBlock = ({packageName}: {packageName: string}) => {
  const [manager, setManager] = React.useState<'npm' | 'yarn' | 'bun' | 'pnpm'>(
    'npm'
  )
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
    <Primitive.Box
      el="div"
      className="bg-gray-50 border border-gray-200 rounded w-full"
    >
      <Primitive.Box
        el="div"
        className="flex flex-row bg-gray-50 border-b border-b-gray-200 rounded-tr-[7px] rounded-tl-[7px]"
      >
        <Button
          onClick={() => setManager('npm')}
          color={manager === 'npm' ? 'gray' : 'transparent'}
          size="2"
          className="text-sm rounded-br-none rounded-bl-none rounded-tr-none "
        >
          npm
        </Button>
        <Button
          onClick={() => setManager('yarn')}
          color={manager === 'yarn' ? 'gray' : 'transparent'}
          size="2"
          className="text-sm rounded-none transition-all"
        >
          yarn
        </Button>
        <Button
          onClick={() => setManager('bun')}
          color={manager === 'bun' ? 'gray' : 'transparent'}
          size="2"
          className="text-sm rounded-none"
        >
          bun
        </Button>
        <Button
          onClick={() => setManager('pnpm')}
          color={manager === 'pnpm' ? 'gray' : 'transparent'}
          size="2"
          className="text-sm rounded-none"
        >
          pnpm
        </Button>
      </Primitive.Box>
      <Primitive.Box
        el="div"
        className="p-6 flex flex-row items-center justify-between w-full gap-4"
      >
        <Text
          el="span"
          id="packageInstall"
          size="3"
          className={firaCode.className}
          ref={copyArea}
        >
          {manager === 'npm' && `npm install ${packageName}`}
          {manager === 'yarn' && `yarn add ${packageName}`}
          {manager === 'bun' && `bun add ${packageName}`}
          {manager === 'pnpm' && `pnpm install ${packageName}`}
        </Text>
        <Button
          color="gray"
          size="1"
          onClick={() => copyToClipboard()}
          className="w-8 h-8 relative"
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
      </Primitive.Box>
    </Primitive.Box>
  )
}

export {InstallBlock}

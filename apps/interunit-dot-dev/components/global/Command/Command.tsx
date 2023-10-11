import {useOutsideClick} from '@interunit/a11y'
import {Modal} from '@interunit/modal'
import {P} from '@interunit/primitives'
import {Search} from 'lucide-react'
import React from 'react'
import {twMerge} from 'tailwind-merge'

import {Badge} from '@/components/system/Badge'
import {Text} from '@/components/system/Text'
import {TextInput} from '@/components/system/TextInput'

type CommandProps = {
  os: 'Win' | 'Mac' | null
  onClose: () => void
}

const Command = ({os, onClose}: CommandProps) => {
  const [searchQuery, setSearchQuery] = React.useState('')
  const commandRef = React.useRef<HTMLDivElement>(null)

  useOutsideClick({ref: commandRef, fn: onClose})

  return (
    <Modal
      onClose={onClose}
      className="fixed top-0 left-0 w-full h-full z-20 flex justify-center items-center"
      style={{backdropFilter: 'blur(5px)'}}
    >
      <P.BX
        el="div"
        className="max-w-[600px] w-full m-4 bg-slate-100 border-slate-400 rounded drop-shadow-lg"
        ref={commandRef}
      >
        <P.BX
          el="div"
          className="flex flex-row gap-4 w-full items-center px-4 boreder-b-[1px]"
        >
          <Search
            size={16}
            role="img"
            aria-label="Search"
            className="stroke-text-light-accent"
          />
          <TextInput
            value={searchQuery}
            onChange={(value: string) => setSearchQuery(value)}
            placeholder="Quick search..."
            className="bg-transparent rounded-bl-[0] rounded-br-[0] focus:outline-none focus:ring-0 focus:border-transparent text-gray-900"
            autoFocus
          />
          <Badge
            color="slate"
            className={twMerge(
              'p-0 flex justify-center items-center transition-opacity',

              !os ? 'opacity-0' : ''
            )}
          >
            <Text
              el="span"
              size="1"
              kind="accent"
              className="leading-[0.5rem] p-[0.375rem] mt-[1px]"
            >
              ESC
            </Text>
          </Badge>
        </P.BX>
      </P.BX>
    </Modal>
  )
}

export {Command}

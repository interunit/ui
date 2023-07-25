import {P} from '@interunit/primitives'
import {Search} from 'lucide-react'
import React from 'react'
import {twMerge} from 'tailwind-merge'

import {Command} from '@/components/global/Command'
import {Badge} from '@/components/system/Badge'
import {Text} from '@/components/system/Text'

const SearchBar = () => {
  const [os, setOs] = React.useState<'Win' | 'Mac' | null>(null)
  const [showCommand, setShowCommand] = React.useState(false)

  const getOs = () => {
    if (navigator.appVersion.indexOf('Mac') !== -1) {
      return 'Mac'
    }

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return null
    }
    return 'Win'
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      setShowCommand(true)
    }
  }
  React.useEffect(() => {
    setOs(getOs())
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <P.BT
        className="appearance-none bg-bg-blended border rounded px-4 py-2 flex flex-row items-center gap-2 h-[44px] hover:border-text-light transition-all drop-shadow-sm hover:drop-shadow-md"
        onClick={() => setShowCommand(true)}
      >
        <Search
          size={16}
          role="img"
          aria-label="Search"
          className="stroke-text-light-accent"
        />
        <P.TX el="span" className="text-text-light-accent hidden lg:block">
          Quick search...
        </P.TX>
        <Badge
          color="bg-muted"
          className={twMerge(
            'p-0 hidden lg:flex justify-center items-center transition-opacity ',
            !os ? 'opacity-0' : ''
          )}
        >
          <Text
            el="span"
            className="text-xs text-text-light-accent leading-[0.5rem] p-[0.375rem] mt-[1px]"
          >
            {os === 'Mac' && '⌘K'}
            {os === 'Win' && 'Ctrl+K'}
            {!os && '⌘K'}
          </Text>
        </Badge>
      </P.BT>
      {showCommand && <Command onClose={() => setShowCommand(false)} os={os} />}
    </>
  )
}

export {SearchBar}

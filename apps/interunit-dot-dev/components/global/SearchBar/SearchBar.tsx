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
        className="appearance-none bg-transparent border border-slate-200 rounded px-4 py-2 flex flex-row items-center gap-2 h-[44px] hover:border-text-light transition-all drop-shadow-sm hover:drop-shadow-md"
        onClick={() => setShowCommand(true)}
      >
        <Search
          size={16}
          role="img"
          aria-label="Search"
          className="stroke-text-light-accent"
        />
        <Text el="span" size="3" className="hidden lg:block">
          Quick search...
        </Text>
        <Badge
          color="slate"
          className={twMerge(
            'p-0 hidden lg:flex justify-center items-center transition-opacity ',
            !os ? 'opacity-0' : ''
          )}
        >
          <Text
            el="span"
            size="1"
            kind="accent"
            className="leading-[0.5rem] p-[0.375rem] mt-[1px]"
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

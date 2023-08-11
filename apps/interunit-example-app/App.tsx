import {Popover} from '@interunit/popover'
import {P} from '@interunit/primitives'
import React from 'react'

const Test = () => {
  return (
    <P.BX el="div" className="relative">
      <Popover triggerType="click">
        <Popover.Trigger>
          <P.BT el="button" className="bg-bg-secondary rounded">
            <P.TX el="span" className="px-5 py-4 text-text-light">
              Click me
            </P.TX>
          </P.BT>
        </Popover.Trigger>
        <Popover.Content
          positioning={{
            side: 'bottom',
            align: 'center',
            offset: '1rem',
            zIndex: 10,
            width: '200px'
          }}
          arrow={{
            fillColor: '#1d1d27',
            strokeColor: '#363645',
            strokeWidth: 1,
            width: 10,
            borderRadius: 2
          }}
        >
          <P.BX
            el="div"
            className="bg-bg-primary border-[1px] border-border rounded p-4"
          >
            <P.TX el="span" className="text-text-light">
              Wow, look at this popover running on react native with shared
              code!
            </P.TX>
          </P.BX>
        </Popover.Content>
      </Popover>
    </P.BX>
  )
}

export default function App() {
  return (
    <P.BX
      el="div"
      className="flex items-center justify-center h-full bg-bg-primary"
    >
      <Test />
    </P.BX>
  )
}

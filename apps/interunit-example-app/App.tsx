import {P} from '@interunit/primitives'
import {Tabs} from '@interunit/tabs'
import React from 'react'

const Test = () => {
  return (
    <P.BX el="div" className="relative">
      <Tabs defaultValue="home">
        <Tabs.TriggerList className="flex flex-row justify-between w-screen bg-white p-4">
          <Tabs.Trigger
            value={'home'}
            aria-label="View the home content"
            asChild
          >
            <P.BT el="button">
              <P.TX el="span" className="text-blue">
                Home
              </P.TX>
            </P.BT>
          </Tabs.Trigger>
          <Tabs.Trigger
            value="about"
            aria-label="View the about content"
            asChild
          >
            <P.BT el="button">
              <P.TX el="span" className="text-blue">
                About
              </P.TX>
            </P.BT>
          </Tabs.Trigger>
          <Tabs.Trigger
            value="contact"
            aria-label="View the contact content"
            asChild
          >
            <P.BT el="button">
              <P.TX el="span" className="text-blue">
                Contact
              </P.TX>
            </P.BT>
          </Tabs.Trigger>
        </Tabs.TriggerList>
        <P.BX
          className="w-full border-border border-[2px] rounded p-4 mt-4"
          el="div"
        >
          <Tabs.Content value="home">
            <P.TX el="span">Home</P.TX>
          </Tabs.Content>
          <Tabs.Content value="about">
            <P.TX el="span">About</P.TX>
          </Tabs.Content>
          <Tabs.Content value="contact">
            <P.TX el="span">Contact</P.TX>
          </Tabs.Content>
        </P.BX>
      </Tabs>
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

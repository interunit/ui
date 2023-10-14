import {Primitive} from '@interunit/primitives'
import {Tabs} from '@interunit/tabs'
import React from 'react'

const Test = () => {
  return (
    <Primitive.Box el="div" className="relative">
      <Tabs defaultValue="home">
        <Tabs.TriggerList className="flex flex-row justify-between w-screen bg-white p-4">
          <Tabs.Trigger
            value={'home'}
            aria-label="View the home content"
            asChild
          >
            <Primitive.Button el="button">
              <Primitive.Text el="span" className="text-blue">
                Home
              </Primitive.Text>
            </Primitive.Button>
          </Tabs.Trigger>
          <Tabs.Trigger
            value="about"
            aria-label="View the about content"
            asChild
          >
            <Primitive.Button el="button">
              <Primitive.Text el="span" className="text-blue">
                About
              </Primitive.Text>
            </Primitive.Button>
          </Tabs.Trigger>
          <Tabs.Trigger
            value="contact"
            aria-label="View the contact content"
            asChild
          >
            <Primitive.Button el="button">
              <Primitive.Text el="span" className="text-blue">
                Contact
              </Primitive.Text>
            </Primitive.Button>
          </Tabs.Trigger>
        </Tabs.TriggerList>
        <Primitive.Box
          className="w-full border-border border-[2px] rounded p-4 mt-4"
          el="div"
        >
          <Tabs.Content value="home">
            <Primitive.Text el="span">Home</Primitive.Text>
          </Tabs.Content>
          <Tabs.Content value="about">
            <Primitive.Text el="span">About</Primitive.Text>
          </Tabs.Content>
          <Tabs.Content value="contact">
            <Primitive.Text el="span">Contact</Primitive.Text>
          </Tabs.Content>
        </Primitive.Box>
      </Tabs>
    </Primitive.Box>
  )
}

export default function App() {
  return (
    <Primitive.Box
      el="div"
      className="flex items-center justify-center h-full bg-bg-primary"
    >
      <Test />
    </Primitive.Box>
  )
}

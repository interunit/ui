'use client'

import {Primitive} from '@interunit/primitives'
import {Tabs} from '@interunit/tabs'
import {
  description,
  homepage,
  name,
  version
} from '@interunit/tabs/package.json'
import React from 'react'

import {CodeBlock} from '@/components/docs/CodeBlock'
import {ComponentDisplay} from '@/components/docs/ComponentDisplay'
import {InstallBlock} from '@/components/docs/InstallBlock'
import {PackageInfo} from '@/components/docs/PackageInfo'
import {PropsTable} from '@/components/docs/PropsTable'
import {Button} from '@/components/system/Button'

const TabsPage = () => {
  const [value, setValue] = React.useState('hi')
  return (
    <Primitive.Box el="div">
      <PackageInfo
        data={{title: 'Tabs', name, description, version, homepage}}
      />
      <ComponentDisplay className="mb-12">
        <Tabs value={value} onValueChange={setValue}>
          <Tabs.TriggerList className="flex gap-2">
            <Tabs.Trigger
              value={'home'}
              aria-label="View the home content"
              asChild
            >
              <Primitive.Button el="button" className="hi">
                Home
              </Primitive.Button>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="about"
              className="text-primary"
              aria-label="View the about content"
              asChild
            >
              <Button color="bg-secondary">About</Button>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="contact"
              aria-label="View the contact content"
              asChild
            >
              <Button color="bg-secondary">Contact</Button>
            </Tabs.Trigger>
          </Tabs.TriggerList>
          <div className="w-full border-border border-[2px] rounded p-4 mt-4">
            <Tabs.Content value="home" className="test">
              Home
            </Tabs.Content>
            <Tabs.Content value="about">About</Tabs.Content>
            <Tabs.Content value="contact">Contact</Tabs.Content>
          </div>
        </Tabs>
      </ComponentDisplay>
      <Primitive.Box el="div" className="mb-12">
        <Primitive.Text el="h2" className="text-sm-hd mb-4">
          Installation
        </Primitive.Text>
        <InstallBlock packageName={name} />
      </Primitive.Box>
      <CodeBlock
        className="mb-8"
        code={`<Tabs defaultValue="home">
    <Tabs.Trigger value="home">
        <Primitive.Button>Home</Primitive.Button>
    </Tabs.Trigger>
    <Tabs.Trigger value="about">
        <Primitive.Button>About</Primitive.Button>
    </Tabs.Trigger>
    <Tabs.Trigger value="contact">
        <Primitive.Button>Contact</Primitive.Button>
    </Tabs.Trigger>
    <Tabs.Content value="about">About</Tabs.Content>
    <Tabs.Content value="home">Home</Tabs.Content>
    <Tabs.Content value="contact">Contact</Tabs.Content>
</Tabs>`}
      />
      <Primitive.Box el="div" className="mb-12">
        <Primitive.Text el="h2" className="text-sm-hd mb-4">
          {'<Tabs/>'}
        </Primitive.Text>
        <PropsTable
          propsToDisplay={[
            {
              name: 'children',
              type: 'horizontal | vertical',
              default: 'horizontal',
              required: false,
              description:
                'The orientation of the popover for keyboard navigation'
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              required: false,
              description: 'The contents of the popover'
            },
            {
              name: 'defaultValue',
              type: 'React.ReactNode',
              required: false,
              description:
                'The default value of the popover when using uncontrolled state'
            },
            {
              name: 'value',
              type: 'string',
              required: false,
              description:
                'The value of the popover when using controlled state'
            },
            {
              name: 'onValueChange',
              type: '(value: string) => void',
              required: false,
              description:
                'The callback when the value of the popover changes when using controlled state'
            }
          ]}
        />
      </Primitive.Box>
      <Primitive.Box el="div" className="mb-12">
        <Primitive.Text el="h2" className="text-sm-hd mb-4">
          {'<Tabs.Trigger/>'}
        </Primitive.Text>
        <PropsTable
          propsToDisplay={[
            {
              name: 'value',
              type: 'string',
              required: false,
              description: 'The value of the popover that correlates to state'
            },
            {
              name: 'asChild',
              type: 'boolean',
              required: false,
              description:
                "Use the element passed through children as the trigger instead of the Tab's button"
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              required: false,
              description:
                'The orientation of the popover for keyboard navigation'
            }
          ]}
        />
      </Primitive.Box>
      <Primitive.Box el="div" className="mb-12">
        <Primitive.Text el="h2" className="text-sm-hd mb-4">
          {'<Tabs.Content/>'}
        </Primitive.Text>
        <PropsTable
          propsToDisplay={[
            {
              name: 'value',
              type: 'string',
              required: false,
              description: 'The value of the popover that correlates to state'
            },
            {
              name: 'asChild',
              type: 'boolean',
              required: false,
              description:
                "Use the element passed through children as the trigger instead of the Tab's content"
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              required: false,
              description:
                'The orientation of the popover for keyboard navigation'
            }
          ]}
        />
      </Primitive.Box>
    </Primitive.Box>
  )
}

export default TabsPage

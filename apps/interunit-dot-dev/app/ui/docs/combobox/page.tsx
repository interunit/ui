'use client'

import {Combobox} from '@interunit/combobox'
import {
  description,
  homepage,
  name,
  version
} from '@interunit/combobox/package.json'
import {Primitive} from '@interunit/primitives'
import {ChevronDown} from 'lucide-react'
import React from 'react'
import {twMerge} from 'tailwind-merge'

import {CodeBlock} from '@/components/docs/CodeBlock'
import {ComponentDisplay} from '@/components/docs/ComponentDisplay'
import {InstallBlock} from '@/components/docs/InstallBlock'
import {PackageInfo} from '@/components/docs/PackageInfo'
import {Button} from '@/components/system/Button'
import {Text} from '@/components/system/Text'

const Page = () => {
  const [value, setValue] = React.useState('Item 1')
  return (
    <Primitive.Box el="div">
      <Primitive.Box el="div" className="mb-8">
        <PackageInfo
          data={{title: 'Combobox', name, description, version, homepage}}
        />
      </Primitive.Box>
      <ComponentDisplay
        className="mb-8"
        contentClassName="max-w-[300px] w-full"
      >
        <Combobox
          value={value}
          onValueChange={setValue}
          className="flex flex-col relative"
        >
          <Combobox.Label asChild>
            <Text>Label</Text>
          </Combobox.Label>
          <Combobox.Trigger asChild>
            <Button kind="text" className="w-full max-w-md bg-bg-muted">
              {value}
              <ChevronDown
                size={16}
                className={twMerge(
                  'fill-text-light-accent transition-transform'
                )}
              />
            </Button>
          </Combobox.Trigger>
          <Combobox.Content
            positioning={{side: 'bottom', align: 'center', width: 'trigger'}}
            className="border rounded bg-bg-primary"
          >
            <Combobox.List className="flex flex-col w-full">
              <Combobox.Item value="Item 1" asChild>
                <Button
                  kind="text"
                  className="w-full block data-[combobox-item-focused=true]:bg-bg-muted aria-[selected=true]:outline rounded-none hover:bg-bg-muted"
                >
                  Item 1
                </Button>
              </Combobox.Item>
              <Combobox.Item value="Item 2" asChild>
                <Button
                  kind="text"
                  className="data-[combobox-item-focused=true]:bg-bg-muted aria-[selected=true]:outline rounded-none hover:bg-bg-muted"
                >
                  Item 2
                </Button>
              </Combobox.Item>
              <Combobox.Item value="Item 3" asChild>
                <Button
                  kind="text"
                  className="data-[combobox-item-focused=true]:bg-bg-muted aria-[selected=true]:outline rounded-none hover:bg-bg-muted"
                >
                  Item 3
                </Button>
              </Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox>
      </ComponentDisplay>
      <Primitive.Box el="div" className="mb-12">
        <Primitive.Text el="h2" className="text-sm-hd mb-4">
          Installation
        </Primitive.Text>
        <InstallBlock packageName={name} />
      </Primitive.Box>
      <CodeBlock
        code={`<Combobox>
    <Combobox.Label>
        Label
    </Combobox.Label>
    <Combobox.Trigger>
        Trigger
    </Combobox.Trigger>
    <Combobox.Content>
        <Combobox.List>
            <Combobox.Item value="Item 1">
                Item 1
            </Combobox.Item>
            <Combobox.Item value="Item 2">
                Item 2
            </Combobox.Item>
        </Combobox.List>
    </Combobox.Content>
</Combobox>
      `}
      />
    </Primitive.Box>
  )
}

export default Page

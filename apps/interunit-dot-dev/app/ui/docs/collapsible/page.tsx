'use client'

import {Collapsible} from '@interunit/collapsible'
import {
  description,
  homepage,
  name,
  version
} from '@interunit/collapsible/package.json'
import {Primitive} from '@interunit/primitives'
import {ChevronDown} from 'lucide-react'
import React from 'react'
import {twMerge} from 'tailwind-merge'

import {AnchoredHeading} from '@/components/docs/AnchoredHeading'
import {CodeBlock} from '@/components/docs/CodeBlock'
import {ComponentDisplay} from '@/components/docs/ComponentDisplay'
import {FeatureList} from '@/components/docs/FeatureList'
import {InstallBlock} from '@/components/docs/InstallBlock'
import {PackageInfo} from '@/components/docs/PackageInfo'
import {PropsTable} from '@/components/docs/PropsTable'
import {Button} from '@/components/system/Button'
import {Text} from '@/components/system/Text'

const CollapsiblePage = () => {
  return (
    <Primitive.Box el="div">
      <Primitive.Box el="div" className="mb-4">
        <PackageInfo
          data={{
            title: 'Collapsible',
            name,
            version,
            description,
            homepage
          }}
        />
      </Primitive.Box>
      <ComponentDisplay
        className="mb-12"
        contentClassName="max-w-[300px] w-full flex flex-col justify-center items-center"
      >
        <Collapsible defaultValue={false}>
          <Collapsible.Trigger asChild>
            <Button kind="text" className="w-full max-w-md bg-bg-muted">
              Click me
              <ChevronDown
                size={16}
                className={twMerge(
                  'fill-text-light-accent transition-transform'
                )}
              />
            </Button>
          </Collapsible.Trigger>
          <Collapsible.Content asChild>
            <Primitive.Box
              el="div"
              className="bg-bg-primary border rounded p-4 mt-2 w-full"
            >
              Collapsed Content
            </Primitive.Box>
          </Collapsible.Content>
        </Collapsible>
      </ComponentDisplay>
      <Primitive.Box el="div" className="flex flex-col justify-between gap-12 mb-12">
        <Primitive.Box el="div" className="w-full">
          <AnchoredHeading
            id="installation"
            el="h2"
            className="text-sm-hd"
            boxClassName="mb-4"
          >
            Installation
          </AnchoredHeading>
          <InstallBlock packageName={name} />
        </Primitive.Box>
        <Primitive.Box el="div">
          <Text el="h2" className="text-sm-hd mb-4">
            What's Included
          </Text>
          <FeatureList>
            <FeatureList.Item>Accessible</FeatureList.Item>
          </FeatureList>
        </Primitive.Box>
      </Primitive.Box>
      <AnchoredHeading
        id="form"
        el="h2"
        className="text-md-hd"
        boxClassName="mb-4"
      >
        {'<Collapsible/>'}
      </AnchoredHeading>

      <CodeBlock
        className="mb-8"
        code={`<Collapsible>
    <Collapsible.Trigger>
        <Primitive.Button>Click me</Primitive.Button>
    </Collapsible.Trigger>
    <Collapsible.Content>
        <Primitive.Box el="div">
            Collapsed Content
        </Primitive.Box>
    </Collapsible.Content>
</Collapsible>`}
      />
      <Primitive.Box el="div" className="mb-8">
        <AnchoredHeading
          id="initial-values"
          el="h3"
          className="text-sm-hd"
          boxClassName="mb-4"
        >
          Props
        </AnchoredHeading>
      </Primitive.Box>
      <Primitive.Box el="div" className="mb-8">
        <PropsTable
          propsToDisplay={[
            {
              name: 'defaultOpen',
              type: 'boolean',
              required: false,
              default: 'false',
              description:
                'Whether or not the collapsible should be open by default'
            },

            {
              name: 'triggerType',
              type: `'click' | 'hover'`,
              required: false,
              default: 'click',
              description:
                'The type of event that should trigger the collapsible to open.'
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              required: true,
              description:
                'Utilize this to pass Collapsible.Trigger and Collapsible.Content components.'
            },
            {
              name: 'a11y',
              type: 'A11yProps',
              required: false,
              description: 'Props to help with accessibility.',
              properties: [
                {
                  name: 'contentId',
                  type: 'string',
                  required: false,
                  default: 'undefined',
                  description: 'The id of the collapsible content.'
                },

                {
                  name: 'contentLabelledBy',
                  type: 'string',
                  required: false,
                  default: 'undefined',
                  description:
                    'The aria-labelledby attribute for Collapsible.Content. '
                }
              ]
            }
          ]}
        />
      </Primitive.Box>
    </Primitive.Box>
  )
}

export default CollapsiblePage

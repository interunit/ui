'use client'

import {Popover} from '@interunit/popover'
import {
  description,
  homepage,
  name,
  version
} from '@interunit/popover/package.json'
import {Primitive} from '@interunit/primitives'
import {P} from '@interunit/primitives'
import React from 'react'

import {CodeBlock} from '@/components/docs/CodeBlock'
import {ComponentDisplay} from '@/components/docs/ComponentDisplay'
import {FeatureList} from '@/components/docs/FeatureList'
import {InstallBlock} from '@/components/docs/InstallBlock'
import {PackageInfo} from '@/components/docs/PackageInfo'
import {PropsTable} from '@/components/docs/PropsTable'
import {Button} from '@/components/system/Button'
import {Text} from '@/components/system/Text'
import {theme} from '@/theme.config'

const PopoverPage = () => {
  return (
    <P.BX el="div">
      <P.BX el="div" className="mb-8">
        <PackageInfo
          data={{title: 'Popover', name, description, version, homepage}}
        />
        <ComponentDisplay className="mb-12">
          <Popover triggerType="click">
            <Popover.Trigger>
              <Button color={'bg-secondary'}>Click me</Button>
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
                fillColor: theme?.colors['bg-primary'],
                strokeColor: theme?.colors.border,
                strokeWidth: 1,
                size: 10,
                borderRadius: 2
              }}
            >
              <Primitive.Box
                el="div"
                className={
                  'bg-bg-primary border-[1px] border-border rounded p-4'
                }
              >
                <Text el="span">
                  The content test test <br /> test <br /> test
                </Text>
              </Primitive.Box>
            </Popover.Content>
          </Popover>
        </ComponentDisplay>
        <P.BX el="div" className="mb-12">
          <P.TX el="h2" className="text-sm-hd mb-4">
            Installation
          </P.TX>
          <InstallBlock packageName={name} />
        </P.BX>
        <P.BX el="div" className="mb-12">
          <P.TX el="h2" className="text-sm-hd mb-4">
            What's Included
          </P.TX>
          <FeatureList>
            <FeatureList.Item>
              Fully accessible component to be used to create dialogs, popovers,
              modals, or anything else you can think of.
            </FeatureList.Item>
            <FeatureList.Item>Support for escape key closing</FeatureList.Item>
            <FeatureList.Item>Focus trapping control</FeatureList.Item>
          </FeatureList>
        </P.BX>

        <CodeBlock
          className="mb-8"
          code={`<Popover>
    <Popover.Trigger>
        <P.BT>Click me</P.BT>
    </Popover.Trigger>
    <Popover.Content>
        <P.BX el="div">
            Collapsed Content
        </P.BX>
    </Popover.Content>
</Popover>`}
        />
        <P.BX el="div" className="mb-12">
          <P.TX el="h2" className="text-sm-hd mb-4">
            {'<Popover/>'}
          </P.TX>
          <PropsTable
            propsToDisplay={[
              {
                name: 'triggerType',
                type: `'click' | 'hover'`,
                required: false,
                default: 'click',
                description:
                  'The user action that will trigger the popover. Note: on mobile hover will be ignored and click will be used instead. Also, click encompasses React Native onPress.'
              },
              {
                name: 'defaultIsOpen',
                type: `boolean`,
                required: false,
                default: 'false',
                description: 'If true, the popover will be open by default'
              },

              {
                name: 'settings',
                type: `PopoverSettings`,
                required: false,
                default: '',
                description: 'General settings for the popover.',
                properties: [
                  {
                    name: 'shouldCloseOnInteractionOutside',
                    type: 'boolean',
                    required: false,
                    default: 'true',
                    description:
                      'If true, the popover will close when the user clicks outside of the popover'
                  }
                ]
              },

              {
                name: 'onPopoverChange',
                type: `(popoverState) => void`,
                required: false,
                default: '',
                description:
                  'A callback that will be called when the popover state changes.'
              },
              {
                name: 'children',
                type: 'React.ReactNode',
                required: false,
                description: 'The contents of the popover'
              }
            ]}
          />
        </P.BX>

        <P.BX el="div" className="mb-12">
          <P.TX el="h2" className="text-sm-hd mb-4">
            {'<Popover.Trigger/>'}
          </P.TX>
          <PropsTable
            propsToDisplay={[
              {
                name: 'children',
                type: 'React.ReactNode',
                required: false,
                description:
                  'The contents of the popover trigger, usually a button.'
              }
            ]}
          />
        </P.BX>
        <P.BX el="div" className="mb-12">
          <P.TX el="h2" className="text-sm-hd mb-4">
            {'<Popover.Content/>'}
          </P.TX>
          <PropsTable
            propsToDisplay={[
              {
                name: 'positioning',
                type: `PopoverPositioning`,
                required: false,
                default: '',
                description: 'Configuration for the positioning of the Popover',
                properties: [
                  {
                    name: 'side',
                    type: `'top' | 'bottom' | 'left' | 'right'`,
                    required: false,
                    default: 'bottom',
                    description:
                      'The side of the trigger that the popover will be positioned on'
                  },
                  {
                    name: 'align',
                    type: `'center' | 'start' | 'end'`,
                    required: false,
                    default: 'center',
                    description:
                      'The alignment of the popover relative to the trigger'
                  },
                  {
                    name: 'offset',
                    type: `number`,
                    required: false,
                    default: '0',
                    description:
                      'The offset of the popover relative to the trigger'
                  },
                  {
                    name: 'width',
                    type: `'trigger' | string | number`,
                    required: false,
                    default: 'auto',
                    description:
                      'The width of the popover. If set to trigger, the popover will be the same width as the trigger'
                  },
                  {
                    name: 'maxWidth',
                    type: `string | number`,
                    required: false,
                    default: 'auto',
                    description: 'The maximum width of the popover.'
                  },
                  {
                    name: 'zIndex',
                    type: `number`,
                    required: false,
                    description: 'The z-index of the popover'
                  },
                  {
                    name: 'zIndex',
                    type: `number`,
                    required: false,
                    description: 'The z-index of the popover',
                    properties: [
                      {
                        name: 'zIndex',
                        type: `number`,
                        required: false,
                        description: 'The z-index of the popover'
                      }
                    ]
                  }
                ]
              },
              {
                name: 'arrow',
                type: `PopoverArrow`,
                required: false,
                default: '',
                description: 'Settings for the popover arrow',
                properties: [
                  {
                    name: 'size',
                    type: `string | number`,
                    required: false,
                    description: 'The size of the arrow.'
                  },
                  {
                    name: 'borderRadius',
                    type: `string | number`,
                    required: false,
                    description: 'The border radius of the arrow tip.'
                  },
                  {
                    name: 'strokeWidth',
                    type: `string | number`,
                    required: false,
                    default: '0',
                    description: 'The width of the arrow stroke.'
                  },
                  {
                    name: 'strokeColor',
                    type: `string`,
                    required: false,
                    description: 'The color of the arrow stroke.'
                  },
                  {
                    name: 'fillColor',
                    type: `string`,
                    required: false,
                    description: 'The color of the arrow fill.'
                  }
                ]
              },

              {
                name: 'children',
                type: 'React.ReactNode',
                required: false,
                description: 'The contents of the popover'
              }
            ]}
          />
        </P.BX>
      </P.BX>
    </P.BX>
  )
}
export default PopoverPage

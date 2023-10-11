'use client'

import {Collapsible} from '@interunit/collapsible'
import {ChevronRight} from 'lucide-react'
import React from 'react'

import {Button} from '@/components/system/Button'
import {Text} from '@/components/system/Text'

type PropToDisplay = {
  name: string
  type: string
  required: boolean
  description: string
  default?: string
  properties?: PropToDisplay[]
}

const PropsTableRow = ({
  prop,
  children
}: {
  prop: PropToDisplay
  children?: React.ReactNode
}) => {
  return (
    <React.Fragment>
      <td className="border-r-[1px] border-b-[1px] border-gray-300">
        <Text el="span" className="block" size="3">
          {prop.name}
          {prop.required && '*'}
        </Text>
        <Text el="span" className="block" kind="accent" size="2">
          {children ? children : prop.type}
        </Text>
      </td>
      <td className=" border-r-[1px] border-b-[1px] border-gray-300">
        <Text el="span" size="2" kind="accent">
          {prop.default ? prop.default : '-'}
        </Text>
      </td>
      <td className="text-sm border-b-[1px] border-gray-300">
        <Text el="span" size="2" kind="accent">
          {prop.description}
        </Text>
      </td>
    </React.Fragment>
  )
}
const PropsTable = ({propsToDisplay}: {propsToDisplay: PropToDisplay[]}) => {
  return (
    <table className="[&_td]:p-4 w-full border border-gray-200">
      <tbody>
        <tr className="overflow-x-auto bg-slate-100 rounded">
          <td className="md border-b-[1px] border-r-[1px] border-gray-200">
            <Text el="span" size="3">
              Prop
            </Text>
          </td>
          <td className="border-b-[1px] border-r-[1px] border-gray-200">
            <Text el="span" size="3">
              Default
            </Text>
          </td>
          <td className="border-b-[1px] border-gray-300">
            <Text el="span" size="3">
              Description
            </Text>
          </td>
        </tr>
        {propsToDisplay.map((prop, index) => {
          const [isOpen, setIsOpen] = React.useState(false)
          return (
            <React.Fragment key={index}>
              {prop?.properties && prop?.properties?.length > 0 ? (
                <Collapsible value={isOpen} onValueChange={setIsOpen}>
                  <tr className="bg-gray-50 border-gray-300 [&>span]:p-4 overflow-x-auto">
                    <PropsTableRow prop={prop} key={index}>
                      <Collapsible.Trigger asChild>
                        <Button
                          kind="text"
                          color="transparent"
                          size="1"
                          onClick={() => setIsOpen(!isOpen)}
                          className="!p-0 [&_*]:text-sm [&_*]:gap-1"
                        >
                          <ChevronRight
                            size="16"
                            className={`fill-gray-50 transition-transform ${
                              isOpen && 'rotate-90'
                            }`}
                          />
                          {prop.type}
                        </Button>
                      </Collapsible.Trigger>
                    </PropsTableRow>
                  </tr>
                  {prop?.properties?.map((childProp, childIndex) => (
                    <Collapsible.Content key={index + ' ' + childIndex} asChild>
                      <tr className="bg-slate-50  border-gray-300  [&>div]:p-4 overflow-x-auto">
                        <PropsTableRow prop={childProp} />
                      </tr>
                    </Collapsible.Content>
                  ))}
                </Collapsible>
              ) : (
                <tr className="bg-gray-50 border[&>span]:p-4 border-gray-200 overflow-x-auto">
                  <PropsTableRow prop={prop} key={index} />
                </tr>
              )}
            </React.Fragment>
          )
        })}
      </tbody>
    </table>
  )
}

export {PropsTable}

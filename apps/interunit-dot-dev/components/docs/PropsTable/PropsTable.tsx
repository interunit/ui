'use client'

import {Collapsible} from '@interunit/collapsible'
import {P} from '@interunit/primitives'
import {ChevronRight} from 'lucide-react'
import React from 'react'

import {Button} from '@/components/system/Button'

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
      <td className="border-r-[1px] border-b-[1px] border-border-accent">
        <P.TX el="span" className="text-md block">
          {prop.name}
          {prop.required && '*'}
        </P.TX>
        <P.TX el="span" className="block text-sm text-text-light-accent">
          {children ? children : prop.type}
        </P.TX>
      </td>
      <td className="text-sm text-text-light-accent border-r-[1px] border-b-[1px] border-border-accent">
        {prop.default ? prop.default : '-'}
      </td>
      <td className="text-sm border-b-[1px] border-border-accent">
        {prop.description}
      </td>
    </React.Fragment>
  )
}
const PropsTable = ({propsToDisplay}: {propsToDisplay: PropToDisplay[]}) => {
  return (
    <table className="[&_td]:p-4 w-full border">
      <tbody>
        <tr className="overflow-x-auto">
          <td className="text-md border-b-[1px] border-r-[1px] border-r-border-accent">
            Prop
          </td>
          <td className="text-md text-muted border-b-[1px] border-r-[1px] border-r-border-accent">
            Default
          </td>
          <td className="border-b-[1px]">Description</td>
        </tr>
        {propsToDisplay.map((prop, index) => {
          return (
            <React.Fragment key={index}>
              {prop?.properties && prop?.properties?.length > 0 ? (
                <Collapsible>
                  <tr className="bg-bg-blended border [&>span]:p-4 overflow-x-auto">
                    <PropsTableRow prop={prop} key={index}>
                      <Collapsible.Trigger asChild>
                        {({value}) => (
                          <Button
                            kind="text"
                            className="!p-0 [&_*]:text-sm [&_*]:gap-1"
                          >
                            <ChevronRight
                              size="16"
                              className={`fill-text-light-accent transition-transform ${
                                value && 'rotate-90'
                              }`}
                            />
                            {prop.type}
                          </Button>
                        )}
                      </Collapsible.Trigger>
                    </PropsTableRow>
                  </tr>
                  {prop?.properties?.map((childProp, childIndex) => (
                    <Collapsible.Content key={index + ' ' + childIndex} asChild>
                      <tr className="bg-bg-blended-accent border  [&>div]:p-4 overflow-x-auto">
                        <PropsTableRow prop={childProp} />
                      </tr>
                    </Collapsible.Content>
                  ))}
                </Collapsible>
              ) : (
                <tr className="bg-bg-blended border[&>span]:p-4 overflow-x-auto">
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

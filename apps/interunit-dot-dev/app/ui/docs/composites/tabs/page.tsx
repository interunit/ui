'use client'

import {P} from '@interunit/primitives'
import {Tabs} from '@interunit/tabs'
import {
  description,
  homepage,
  name,
  version
} from '@interunit/tabs/package.json'
import React from 'react'

import {ComponentDisplay} from '@/components/docs/ComponentDisplay'
import {PackageInfo} from '@/components/docs/PackageInfo'

const TabsPage = () => {
  const [tab, setTab] = React.useState('home')
  return (
    <P.BX el="div">
      <PackageInfo
        data={{title: 'Tabs', name, description, version, homepage}}
      />
      <ComponentDisplay className="mb-12">
        <Tabs value={tab} onValueChange={v => setTab(v)}>
          <Tabs.Trigger value={'home'} aria-label="View the home page">
            Home
          </Tabs.Trigger>
          <Tabs.Trigger value="about" aria-label="View the about page">
            About
          </Tabs.Trigger>
          <Tabs.Content value={'home'}>Home</Tabs.Content>
          <Tabs.Content value="about">About</Tabs.Content>
        </Tabs>
      </ComponentDisplay>
    </P.BX>
  )
}

export default TabsPage

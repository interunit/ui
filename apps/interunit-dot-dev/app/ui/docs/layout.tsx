'use client'

import React from 'react'
import styled from 'styled-components'

import {DocsSideNavigation} from '@/components/docs/DocsSideNavigation'
import {TopNavigation} from '@/components/global/TopNavigation'
import {Primitive} from '@/components/primitives'
import {ui} from '@/constants/ui'
import {mq} from '@interunit/responsive'

const Container = styled(Primitive.Box)`
  display: flex;
  flex-direction: column;
  height: 100%;

  ${props => mq(props.theme.breakpoint.large)`
    flex-direction: row;
`}
`

const Navigation = styled(Primitive.Box)`
  position: sticky;
  top: 0;
  z-index: 2;
  ${props => mq(props.theme.breakpoint.large)`
    flex: 0 0 250px;
    min-height: 100vh;
  `}
`

const Content = styled(Primitive.Box)`
  flex: 1;
  max-width: 1920px;
  width: 100%;
`

const DocsLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div style={{height: '100%'}}>
      <TopNavigation />
      <Container el="div">
        <Navigation el="div">
          <DocsSideNavigation data={ui} />
        </Navigation>
        <Content el="div">
          <Primitive.Box el="div" sp={{p: [2]}}>
            {children}
          </Primitive.Box>
        </Content>
      </Container>
    </div>
  )
}

export default DocsLayout

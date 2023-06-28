'use client'

import {InterUnitProvider} from '@interunit/config'
import {config} from '../../../interunit.config'
import {Content} from './TextContent'

const Config = () => {
  return (
    <InterUnitProvider config={config}>
      <Content />
    </InterUnitProvider>
  )
}

export default Config

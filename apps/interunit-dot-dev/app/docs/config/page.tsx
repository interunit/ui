'use client'

import {useTheme} from '@interunit/config'
import {Primitive} from '@interunit/primitives'

import {InterUnitProvider} from '../../../interunit.config'

const Content = () => {
  const theme = useTheme()
  return (
    <Primitive.Text as="span" fnt={{c: theme.textColor}}>
      hi
    </Primitive.Text>
  )
}

const Config = () => {
  return (
    <InterUnitProvider>
      <Content />
    </InterUnitProvider>
  )
}

export default Config

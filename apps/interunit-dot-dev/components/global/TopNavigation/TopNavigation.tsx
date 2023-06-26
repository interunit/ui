'use client'

import {useTheme} from '@interunit/config'
import {Primitive} from '@interunit/primitives'

// Change To Image Primitive

const TopNavigation = () => {
  const theme = useTheme()
  return (
    <Primitive.Box
      as="div"
      sp={{p: 1}}
      bg={{c: theme.color.background.primary}}
    >
      <img src="/interunit-logo.svg" alt="logo" style={{width: '40px'}} />
      <Primitive.Text as="span">InterUnit</Primitive.Text>
    </Primitive.Box>
  )
}

export {TopNavigation}

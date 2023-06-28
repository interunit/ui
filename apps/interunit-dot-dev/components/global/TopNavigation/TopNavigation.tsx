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
      bg={{c: theme?.color.background.primary}}
      bdr={{c: theme?.color.border.primary, w: [0, 0, 1, 0]}}
    >
      <Primitive.Box
        as="div"
        sp={{p: 1}}
        flx={{dir: 'x', ai: 'center', gp: 0.75}}
      >
        <img src="/interunit-logo.svg" alt="logo" style={{width: '40px'}} />
        <Primitive.Text as="span" sz="lg">
          InterUnit
        </Primitive.Text>
      </Primitive.Box>
    </Primitive.Box>
  )
}

export {TopNavigation}

import React from 'react'
import {useTheme} from 'styled-components'

import {Primitive} from '@/components/primitives'

const ComponentDisplay = ({children}: {children: React.ReactNode}) => {
  const theme = useTheme()
  return (
    <Primitive.Box
      el="div"
      flx={{ai: 'center', jc: 'center'}}
      sp={{p: [4, 1]}}
      bg={{c: theme?.color.background.blended}}
      bdr={{r: theme?.border.radius.primary, c: theme?.color.border.primary}}
    >
      <Primitive.Box el="div" sz={{mw: 400, w: '100%'}}>
        {children}
      </Primitive.Box>
    </Primitive.Box>
  )
}
export {ComponentDisplay}

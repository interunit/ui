'use client'

import {useTheme} from '@interunit/config'
import {Primitive} from '@interunit/primitives'

const Content = () => {
  const theme = useTheme()

  return (
    <>
      <Primitive.Text
        as="h1"
        fnt={{c: 'red'}}
        bg={{c: 'purple'}}
        $outline={`1px solid ${theme.textColor}`}
      >
        this is imported from the library with correct props
      </Primitive.Text>
    </>
  )
}
export {Content}

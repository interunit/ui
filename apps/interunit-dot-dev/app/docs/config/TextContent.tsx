'use client'

import {useState} from 'react'

import {Combobox} from '@interunit/combobox'
import {useTheme} from '@interunit/config'
import {Primitive} from '@interunit/primitives'

const Content = () => {
  const theme = useTheme()

  const [value, setValue] = useState<string[]>([])

  return (
    <>
      <Primitive.Text as="span" fnt={{c: theme?.textColor}} outline={13}>
        this is imported from the library
      </Primitive.Text>

      <Combobox
        type="multi"
        value={value}
        onChange={(v: string[]) => setValue(v)}
        options={[
          {label: 'Dansby Swanson', value: 'swanson'},
          {label: 'Seiya Suzuki', value: 'suzuki'},
          {label: 'Ian Happ', value: 'happ'}
        ]}
      />
    </>
  )
}
export {Content}

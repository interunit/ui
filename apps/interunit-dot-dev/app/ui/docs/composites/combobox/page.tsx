'use client'

import {useState} from 'react'

import {Combobox} from '@interunit/combobox'

const Page = () => {
  const [value, setValue] = useState<string[]>([])

  return (
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
  )
}

export default Page

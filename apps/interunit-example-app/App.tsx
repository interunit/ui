import {  View} from 'react-native'

import {useState} from 'react'

import {Combobox} from '@interunit/combobox'

export default function App() {
  const [value, setValue] = useState<string[]>([])
  return (
    <View>
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
    </View>
  )
}

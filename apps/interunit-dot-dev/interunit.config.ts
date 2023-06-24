import {createInterUnit} from '@interunit/config'

import {TextPrimitive} from './components/TextPrimitive'

const {config} = createInterUnit({
  theme: {
    textColor: 'green',
    backgroundColor: 'yellow'
  },
  primitiveExtension: {
    Text: TextPrimitive
  }
})

export {config}

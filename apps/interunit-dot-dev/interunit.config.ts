import {createInterUnit} from '@interunit/config'

import {TextPrimitive} from './components/TextPrimitive'

export const Theme = {
    textColor: 'red',
    backgroundColor: 'blue'
}

const {config} = createInterUnit({
  theme: Theme,
  primitiveExtension: {
    Text: TextPrimitive
  }
})

export {config}

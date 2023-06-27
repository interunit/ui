import {createInterUnit} from '@interunit/config'

import {TextPrimitive} from './components/TextPrimitive'

export const Theme = {
  color: {
    text: {
      primary: '#FFFFFF'
    },
    background: {
      primary: '#1D1D27',
      secondary: '#5E47C4'
    },
    border: {
      primary: '#363645'
    }
  }
}

const {config} = createInterUnit({
  theme: Theme,
  primitiveExtension: {
    Text: TextPrimitive
  }
})

export {config}

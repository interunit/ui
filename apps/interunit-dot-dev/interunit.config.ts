import {createInterUnit} from '@interunit/config'

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
    },
    outline: {
        primary: '#FFAE71'
    }
  }
}

const {config} = createInterUnit({
  theme: Theme
})

export {config}

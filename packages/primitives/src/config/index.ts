// TODO: Should import this to get createStitches
// config for themeing
import {styled} from '@stitches/react'

const Element = {
  A: styled('a'),
  Button: styled('button'),
  Div: styled('div'),
  H1: styled('h1'),
  H2: styled('h2'),
  H3: styled('h3'),
  H4: styled('h4'),
  H5: styled('h5'),
  H6: styled('h6'),
  Img: styled('img'),
  Input: styled('input'),
  Label: styled('label'),
  P: styled('p'),
  Select: styled('select'),
  Span: styled('span'),
  Textarea: styled('textarea')
} as const

type Element = keyof typeof Element

export {Element}

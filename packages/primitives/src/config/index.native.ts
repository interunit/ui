import styled, {css} from 'styled-components/native'

import {Child} from '../Child'
import {type Spacing, SpacingValueToCssString} from '../helpers/spacing'

const Elements = {
  a: 'Pressable',
  button: 'Pressable',
  div: 'View',
  h1: 'Text',
  h2: 'Text',
  h3: 'Text',
  h4: 'Text',
  h5: 'Text',
  h6: 'Text',
  img: 'Image',
  input: 'TextInput',
  label: 'Text',
  p: 'Text',
  span: 'Text',
  textarea: 'TextInput'
} as const

type ElementsType = (typeof Elements)[keyof typeof Elements]

const Element = Object.values(Elements).reduce(
  (acc: any, curr: (typeof Elements)[keyof typeof Elements]) => {
    // styled expects 0 arguements for some reason
    // @ts-ignore
    acc[curr] = styled[curr as ElementsType]<{
      sp?: Spacing
    }>`
      ${({sp}: {sp?: Spacing}) =>
        sp &&
        css`
          padding: ${sp?.p
            ? SpacingValueToCssString({value: sp.p})
            : undefined};
          margin: ${sp?.m ? SpacingValueToCssString({value: sp.m}) : undefined};
        `}
    `
    return acc
  },
  {
    Child: Child
  }
)

export {Element, styled, css}

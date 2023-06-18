import styled, {css} from 'styled-components'

import {Child} from '../Child'
import {type Spacing, SpacingValueToCssString} from '../helpers/spacing'

const Elements = {
  a: 'A',
  button: 'Button',
  div: 'Div',
  h1: 'H1',
  h2: 'H2',
  h3: 'H3',
  h4: 'H4',
  h5: 'H5',
  h6: 'H6',
  img: 'Image',
  input: 'Input',
  label: 'Label',
  p: 'P',
  select: 'Select',
  span: 'Span',
  textarea: 'TextArea'
} as const

type ElementsType = Lowercase<(typeof Elements)[keyof typeof Elements]>

const Element = Object.values(Elements).reduce(
  (acc: any, curr: (typeof Elements)[keyof typeof Elements]) => {
    // styled expects 0 arguements for some reason
    // @ts-ignore
    acc[curr] = styled[curr.toLowerCase() as ElementsType]<{
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

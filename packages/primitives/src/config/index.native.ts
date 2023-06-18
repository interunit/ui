// TODO: Should import this to get createStitches
// config for themeing
import styled, {css} from 'styled-components/native'

import {Child} from '../Child'

const Element = {
  A: styled.Pressable,
  Button: styled.Pressable,
  Div: styled.View,
  H1: styled.Text,
  H2: styled.Text,
  H3: styled.Text,
  H4: styled.Text,
  H5: styled.Text,
  H6: styled.Text,
  Image: styled.Image,
  Input: styled.TextInput,
  Label: styled.Text,
  P: styled.Text,
  // Select: styled('Picker'),
  Span: styled.Text,
  Textarea: styled.TextInput,
  Child: Child
}

export {Element, styled, css}

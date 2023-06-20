import styled, {css} from 'styled-components/native'

import {
  type CrossPlatformStyled,
  type InterConstruct,
  type StyledComponentTag
} from '../Construct'

export const DEFAULT_UNIT = {
  SPACING: 'px', // TODO, will need to do conversion on rem
  BORDER_WIDTH: 'px',
  BORDER_RADIUS: 'px'
}

export const NativeConstruct = [
  {
    inter: 'A' as InterConstruct,
    styled: 'Pressable' as StyledComponentTag
  },
  {
    inter: 'Button' as InterConstruct,
    styled: 'Pressable' as StyledComponentTag
  },
  {
    inter: 'Div' as InterConstruct,
    styled: 'View' as StyledComponentTag
  },
  {
    inter: 'H1' as InterConstruct,
    styled: 'Text' as StyledComponentTag
  },
  {
    inter: 'H2' as InterConstruct,
    styled: 'Text' as StyledComponentTag
  },
  {
    inter: 'H3' as InterConstruct,
    styled: 'Text' as StyledComponentTag
  },
  {
    inter: 'H4' as InterConstruct,
    styled: 'Text' as StyledComponentTag
  },
  {
    inter: 'H5' as InterConstruct,
    styled: 'Text' as StyledComponentTag
  },
  {
    inter: 'H6' as InterConstruct,
    styled: 'Text' as StyledComponentTag
  },
  {
    inter: 'Img' as InterConstruct,
    styled: 'Image' as StyledComponentTag
  },
  {
    inter: 'Input' as InterConstruct,
    styled: 'TextInput' as StyledComponentTag
  },
  {
    inter: 'Label' as InterConstruct,
    styled: 'Text' as StyledComponentTag
  },
  {
    inter: 'P' as InterConstruct,
    styled: 'Text' as StyledComponentTag
  },
  {
    inter: 'Span' as InterConstruct,
    styled: 'Text' as StyledComponentTag
  },
  {
    inter: 'Textarea' as InterConstruct,
    styled: 'TextInput' as StyledComponentTag
  }
]

export {
  styled,
  css,
  type InterConstruct,
  type StyledComponentTag,
  type CrossPlatformStyled
}

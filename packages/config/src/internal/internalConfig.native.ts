// TODO: Make this so we're not tied to styled-components
import styled, {css} from 'styled-components/native'

import {type ConstructTag, type InterConstruct} from './sharedConfig'

export const ENVIRONMENT = {
  NAME: 'native',
  DEFAULT_UNIT: {
    SPACING: 'rem',
    BORDER_WIDTH: 'px',
    BORDER_RADIUS: 'px',
    POSITION: 'px',
    SIZING: 'px'
  }
}

export const ConstructFromConfig = [
  {
    inter: 'A' as InterConstruct,
    styled: 'Pressable' as ConstructTag
  },
  {
    inter: 'Button' as InterConstruct,
    styled: 'Pressable' as ConstructTag
  },
  {
    inter: 'Div' as InterConstruct,
    styled: 'View' as ConstructTag
  },
  {
    inter: 'H1' as InterConstruct,
    styled: 'Text' as ConstructTag
  },
  {
    inter: 'H2' as InterConstruct,
    styled: 'Text' as ConstructTag
  },
  {
    inter: 'H3' as InterConstruct,
    styled: 'Text' as ConstructTag
  },
  {
    inter: 'H4' as InterConstruct,
    styled: 'Text' as ConstructTag
  },
  {
    inter: 'H5' as InterConstruct,
    styled: 'Text' as ConstructTag
  },
  {
    inter: 'H6' as InterConstruct,
    styled: 'Text' as ConstructTag
  },
  {
    inter: 'Img' as InterConstruct,
    styled: 'Image' as ConstructTag
  },
  {
    inter: 'Input' as InterConstruct,
    styled: 'TextInput' as ConstructTag
  },
  {
    inter: 'Label' as InterConstruct,
    styled: 'Text' as ConstructTag
  },
  {
    inter: 'P' as InterConstruct,
    styled: 'Text' as ConstructTag
  },
  {
    inter: 'Span' as InterConstruct,
    styled: 'Text' as ConstructTag
  },
  {
    inter: 'Textarea' as InterConstruct,
    styled: 'TextInput' as ConstructTag
  },
  {
    inter: 'UL' as InterConstruct,
    styled: 'View' as ConstructTag
  },
  {
    inter: 'LI' as InterConstruct,
    styled: 'View' as ConstructTag
  },
  {
    inter: 'Section' as InterConstruct,
    styled: 'View' as ConstructTag
  }
]

export {styled, css}

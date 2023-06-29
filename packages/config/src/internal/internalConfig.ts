// TODO: Make this so were not tied to styled-components
import styled, {css} from 'styled-components'

import {type ConstructTag, type InterConstruct} from './sharedConfig'

export const ENVIRONMENT = {
  NAME: 'web',
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
    styled: 'a' as ConstructTag
  },
  {
    inter: 'Button' as InterConstruct,
    styled: 'button' as ConstructTag
  },
  {
    inter: 'Div' as InterConstruct,
    styled: 'div' as ConstructTag
  },
  {
    inter: 'H1' as InterConstruct,
    styled: 'h1' as ConstructTag
  },
  {
    inter: 'H2' as InterConstruct,
    styled: 'h2' as ConstructTag
  },
  {
    inter: 'H3' as InterConstruct,
    styled: 'h3' as ConstructTag
  },
  {
    inter: 'H4' as InterConstruct,
    styled: 'h4' as ConstructTag
  },
  {
    inter: 'H5' as InterConstruct,
    styled: 'h5' as ConstructTag
  },
  {
    inter: 'H6' as InterConstruct,
    styled: 'h6' as ConstructTag
  },
  {
    inter: 'Image' as InterConstruct,
    styled: 'img' as ConstructTag
  },
  {
    inter: 'Input' as InterConstruct,
    styled: 'input' as ConstructTag
  },
  {
    inter: 'Label' as InterConstruct,
    styled: 'label' as ConstructTag
  },
  {
    inter: 'P' as InterConstruct,
    styled: 'p' as ConstructTag
  },
  {
    inter: 'Select' as InterConstruct,
    styled: 'select' as ConstructTag
  },
  {
    inter: 'Span' as InterConstruct,
    styled: 'span' as ConstructTag
  },
  {
    inter: 'TextArea' as InterConstruct,
    styled: 'textarea' as ConstructTag
  },
  {
    inter: 'UL' as InterConstruct,
    styled: 'ul' as ConstructTag
  },
  {
    inter: 'LI' as InterConstruct,
    styled: 'li' as ConstructTag
  },
  {
    inter: 'Section' as InterConstruct,
    styled: 'section' as ConstructTag
  }
]

export {styled, css}

import {
  type ConstructTag,
  DEFAULT_CSS_UNIT,
  type InterConstruct,
  type NativeComponent
} from './sharedConfig'

export const ENVIRONMENT = {
  NAME: 'native',
  DEFAULT_CSS_UNIT
}

export const ConstructFromConfig = [
  {
    inter: 'A' as InterConstruct,
    tag: 'a' as ConstructTag,
    component: 'Text' as NativeComponent
  },
  {
    inter: 'Button' as InterConstruct,
    tag: 'button' as ConstructTag,
    component: 'Pressable' as NativeComponent
  },
  {
    inter: 'Div' as InterConstruct,
    tag: 'div' as ConstructTag,
    component: 'View' as NativeComponent
  },
  {
    inter: 'H1' as InterConstruct,
    tag: 'h1' as ConstructTag,
    component: 'Text' as NativeComponent
  },
  {
    inter: 'H2' as InterConstruct,
    tag: 'h2' as ConstructTag,
    component: 'Text' as NativeComponent
  },
  {
    inter: 'H3' as InterConstruct,
    tag: 'h3' as ConstructTag,
    component: 'Text' as NativeComponent
  },
  {
    inter: 'H4' as InterConstruct,
    tag: 'h4' as ConstructTag,
    component: 'Text' as NativeComponent
  },
  {
    inter: 'H5' as InterConstruct,
    tag: 'h5' as ConstructTag,
    component: 'Text' as NativeComponent
  },
  {
    inter: 'H6' as InterConstruct,
    tag: 'h6' as ConstructTag,
    component: 'Text' as NativeComponent
  },
  {
    inter: 'Img' as InterConstruct,
    tag: 'img' as ConstructTag,
    component: 'Text' as NativeComponent
  },
  {
    inter: 'Input' as InterConstruct,
    tag: 'text' as ConstructTag,
    component: 'TextInput' as NativeComponent
  },
  {
    inter: 'Label' as InterConstruct,
    tag: 'label' as ConstructTag,
    component: 'Text' as NativeComponent
  },
  {
    inter: 'P' as InterConstruct,
    tag: 'p' as ConstructTag,
    component: 'Text' as NativeComponent
  },
  {
    inter: 'Span' as InterConstruct,
    tag: 'span' as ConstructTag,
    component: 'Text' as NativeComponent
  },
  // {
  //   inter: 'Textarea' as InterConstruct,
  //   tag: 'TextInput' as ConstructTag
  //   component: 'Text' as NativeComponent
  // },
  {
    inter: 'UL' as InterConstruct,
    tag: 'ul' as ConstructTag,
    component: 'View' as NativeComponent
  },
  {
    inter: 'LI' as InterConstruct,
    tag: 'li' as ConstructTag,
    component: 'View' as NativeComponent
  },
  {
    inter: 'Section' as InterConstruct,
    tag: 'section' as ConstructTag,
    component: 'View' as NativeComponent
  },
  {
    inter: 'TextInput' as InterConstruct,
    tag: 'TextInput' as ConstructTag,
    component: 'TextInput' as NativeComponent
  }
]

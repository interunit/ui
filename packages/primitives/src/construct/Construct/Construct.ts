import type styled from 'styled-components'
import type styledNative from 'styled-components/native'

type Styled = typeof styled
type StyledNative = typeof styledNative

export type StyledComponentTag = keyof Styled | keyof StyledNative

export interface CrossPlatformStyled extends Styled, StyledNative {}

export type InterConstruct =
  | 'A'
  | 'Button'
  | 'Div'
  | 'H1'
  | 'H2'
  | 'H3'
  | 'H4'
  | 'H5'
  | 'H6'
  | 'Image'
  | 'Input'
  | 'Label'
  | 'P'
  | 'Select'
  | 'Span'

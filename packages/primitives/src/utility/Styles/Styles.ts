import type React from 'react'

import {
  type CrossPlatformStyled,
  type StyledComponentTag,
  css as StyledCss,
  styled
} from '../../config'

import {type Background, background} from './assemblers/background'
import {type Border, border} from './assemblers/border'
import {type Font, font} from './assemblers/font'
import {type Spacing, spacing} from './assemblers/spacing'

const assemblers = [
  background.assembler,
  border.assembler,
  font.assembler,
  spacing.assembler
]
const propNames = [
  ...background.propNames,
  ...border.propNames,
  ...font.propNames,
  ...spacing.propNames,
  'css'
]

export type UtilityStyles = Font & Spacing & Background & Border
const assemble = (props: UtilityStyles) => {
  return assemblers.map(assembler => assembler(props)).join('\n')
}

type StylesProps = UtilityStyles & {css?: string}
const Styles = ({
  element,
  css
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element: StyledComponentTag | React.ReactNode | React.FC<any>
  css?: string
}) => {
  const _styled = styled as CrossPlatformStyled
  return _styled[element as StyledComponentTag].withConfig({
    shouldForwardProp: (propName: string) => !propNames.includes(propName)
  })<StylesProps>`
    ${(props: StylesProps) =>
      StyledCss`
        ${css}
        ${props.css}
        ${assemble(props)}
      `}
    `
}

export {Styles}

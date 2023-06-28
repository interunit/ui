import type React from 'react'

import {
  type ConstructTag,
  type CrossPlatformStyled,
  css as StyledCss,
  styled
} from '@interunit/config'

import {type Background, background} from './assemblers/background'
import {type Border, border} from './assemblers/border'
import {type Flex, flex} from './assemblers/flex'
import {type Font, font} from './assemblers/font'
import {type Position, position} from './assemblers/position'
import {type Spacing, spacing} from './assemblers/spacing'
import { type Sizing, sizing } from './assemblers/sizing'

const assemblers = [
  background.assembler,
  border.assembler,
  flex.assembler,
  font.assembler,
  position.assembler,
  sizing.assembler,
  spacing.assembler
]
const propNames = [
  ...background.propNames,
  ...border.propNames,
  ...flex.propNames,
  ...font.propNames,
  ...position.propNames,
  ...sizing.propNames,
  ...spacing.propNames,
  'css'
]

type CSS = {
  css?: React.CSSProperties
}

export type UtilityStyles = Font &
  Spacing &
  Background &
  Border &
  Position &
  Flex &
  Sizing &
  CSS

const assemble = (props: UtilityStyles) => {
  return assemblers.map(assembler => assembler(props)).join('\n')
}

type StylesProps = UtilityStyles & {css?: string}
const Styles = ({
  element,
  css
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element: ConstructTag | React.ReactNode | React.FC<any>
  css?: string
}) => {
  const _styled = styled as CrossPlatformStyled

  return _styled[element as ConstructTag].withConfig({

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

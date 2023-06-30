import type React from 'react'
import styled, {css as StyledCss} from 'styled-components'

import {type Background, background} from './assemblers/background'
import {type Border, border} from './assemblers/border'
import {type Flex, flex} from './assemblers/flex'
import {type Font, font} from './assemblers/font'
import {type Position, position} from './assemblers/position'
import {type Sizing, sizing} from './assemblers/sizing'
import {type Spacing, spacing} from './assemblers/spacing'

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
const Shorthand = <T extends unknown>({
  element,
  css
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element: T
  css?: string
}) => {
  const _styled = styled as typeof styled

  // TODO: this
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return _styled(element).withConfig({
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
export {Shorthand  }

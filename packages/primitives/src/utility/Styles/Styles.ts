import type React from 'react'

import {
  type CrossPlatformStyled,
  type StyledComponentTag,
  css,
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
  'injectedStylesString',
  'injectedStylesArray'
]

export type UtilityStyles = Font & Spacing & Background & Border
type InjectedStyles = {
  injectedStylesString?: string
  injectedStylesArray?: {
    [key: string]: string
  }[]
}

const assemble = (props: UtilityStyles) => {
  return assemblers.map(assembler => assembler(props)).join('\n')
}


type StylesProps = UtilityStyles & InjectedStyles
const Styles = ({
  element,
  customCss
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element: StyledComponentTag | React.ReactNode | React.FC<any>
  customCss: string
}) => {
  const _styled = styled as CrossPlatformStyled
  return _styled[element as StyledComponentTag].withConfig({
    shouldForwardProp: (propName: string) => !propNames.includes(propName)
  })<StylesProps>`
  ${(props: StylesProps) => console.log('what', props)}
    ${(props: StylesProps) =>
      css`
        ${assemble(props)}
        ${customCss}
      `}

 /* Was originally added when playing with design tokens,
     maybe we'll need these late so leaving for now */
    ${(props: StylesProps) =>
      props.injectedStylesString &&
      css`
        ${props.injectedStylesString}
      `}
    ${(props: StylesProps) =>
      props.injectedStylesArray &&
      css`
        ${props.injectedStylesArray.map(
          (injectedStyles: {[key: string]: string}) => css`
            ${Object.keys(injectedStyles).map(
              (key: string) => css`
                ${key}: ${injectedStyles[key]};
              `
            )}
          `
        )}
      `}
    `
}

export {Styles}

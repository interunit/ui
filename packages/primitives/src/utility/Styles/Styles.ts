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

const Styles = ({element}: {element: StyledComponentTag}) => {
  const _styled = styled as CrossPlatformStyled
  // This produces this error: "Expression produces a union type that is too complex to represent."
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return _styled[element as StyledComponentTag].withConfig({
    shouldForwardProp: (prop: string) =>
      !propNames.some(propName => propName === prop)
  })<StylesProps>`
    ${(props: StylesProps) =>
      css`
        ${assemble(props)}
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

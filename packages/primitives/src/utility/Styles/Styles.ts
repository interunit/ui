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

const assemblers = [spacing.assembler, background.assembler, border.assembler]
const propNames = [
  ...background.propNames,
  ...border.propNames,
  ...font.propNames,
  ...spacing.propNames
]

export type UtilityStyles = Font & Spacing & Background & Border

const assemble = (props: UtilityStyles) => {
  return assemblers.map(assembler => assembler(props)).join('\n')
}

const Styles = ({element}: {element: StyledComponentTag}) => {
  const _styled = styled as CrossPlatformStyled
  // This produces this error: "Expression produces a union type that is too complex to represent."
  // @ts-ignore
  return _styled[element as StyledComponentTag].withConfig({
    shouldForwardProp: (prop: string) =>
      !propNames.some(propName => propName === prop)
  })<UtilityStyles>`
    ${(props: UtilityStyles) =>
      css`
        ${assemble(props)}
      `}
  `
}

export {Styles}

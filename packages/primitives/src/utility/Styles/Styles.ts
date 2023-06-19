import {
  type CrossPlatformStyled,
  type StyledComponentTag,
  css,
  styled
} from '../../config'

import {type Background, background} from './assemblers/background'
import {type Spacing, spacing} from './assemblers/spacing'
import { type Border, border }from './assemblers/border'

const assemblers = [spacing.assembler, background.assembler, border.assembler]
const propNames = [...spacing.propNames, ...background.propNames, ...border.propNames]

// TODO: Automate this
export type UtilityStyles = {
  sp: Spacing
  bg: Background
  bdr: Border
}

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

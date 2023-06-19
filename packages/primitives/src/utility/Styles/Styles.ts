import {
  type CrossPlatformStyled,
  type StyledComponentTag,
  css,
  styled
} from '../../config'
import {type Spacing, SpacingValueToCssString} from '../../helpers/spacing'

const Styles = ({element}: {element: StyledComponentTag}) => {
  const _styled = styled as CrossPlatformStyled
  // This produces this error: "Expression produces a union type that is too complex to represent."
  // @ts-ignore
  return _styled[element as StyledComponentTag]`
    ${({sp}: {sp?: Spacing}) =>
      sp &&
      css`
        padding: ${sp?.p ? SpacingValueToCssString({value: sp.p}) : undefined};
        margin: ${sp?.m ? SpacingValueToCssString({value: sp.m}) : undefined};
      `}
  `
}

export {Styles}

import {InterUnitInternals} from '@interunit/config'

const ENVIRONMENT = InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT
// TODO: Let user override this
const DEFAULT_SPACING_UNIT = ENVIRONMENT.DEFAULT_UNIT.SPACING

export type Flex = {
  flx?: FlexValues
}

type FlexValues = {
  dir?: 'x' | 'y'
  ai?: 'flex-start' | 'center' | 'flex-end' | 'stretch'
  jc?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'
  gp?: number
}

const flexAssembler = ({flx}: {flx?: FlexValues}) => {
  if (!flx) return undefined
  let result = ''

  result += 'display: flex;'

  if (flx.dir) {
    result += `flex-direction: ${flx.dir};`
  } else {
    result += `flex-direction: column;`
  }

  if (flx.ai) result += `align-items: ${flx.ai};`
  if (flx.jc) result += `justify-content: ${flx.jc};`
  if (flx.gp) result += `gap: ${flx.gp}${DEFAULT_SPACING_UNIT};`

  return result
}

export const flex = {
  assembler: flexAssembler,
  propNames: ['flx']
}

import {InterUnitInternals} from '@interunit/config'

import {getScreenWidth} from '../helpers/getScreenWidth'
import {type PixelString, isPixelString} from '../helpers/isPixelString'

const ENVIRONMENT = InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT.NAME

const prepareCssString = (template: TemplateStringsArray, props: string[]) => {
  let str = ''
  template.forEach((item: string, index: number) => {
    str += item
    if (props[index]) {
      str += props[index]
    }
  })

  return str
}

// Media Query
const mq = (value: number | PixelString) => {
  return (styles: TemplateStringsArray, ...props: string[]) => {
    const cssString = prepareCssString(styles, props)
    const pixelNumber: number = isPixelString(value)
      ? parseInt(value.replace('px', ''))
      : value

    if (ENVIRONMENT === 'native') {
      const width = getScreenWidth()
      if (width >= pixelNumber) {
        return cssString
      }
    }

    if (ENVIRONMENT === 'web') {
      return `@media (min-width: ${pixelNumber}px) { ${cssString} }`
    }
  }
}

export {mq}

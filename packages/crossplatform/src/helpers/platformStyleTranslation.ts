import {getEnvironmentName} from '@interunit/config'
import {type MergeWithOverride} from '@interunit/toolbox'
import cssToReactNative from 'css-to-react-native'
import type React from 'react'
import type {TextStyle, ViewStyle} from 'react-native'

export type CrossPlatformStyle =
  | MergeWithOverride<React.CSSProperties, ViewStyle | TextStyle>
  | undefined

const cssPropertiesThatCanContainRem = [
  'width',
  'height',
  'font-size',
  'line-height',
  'top',
  'right',
  'bottom',
  'left',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'border-radius',
  'border-width',
  'border-top-width',
  'border-right-width',
  'border-bottom-width',
  'border-left-width',
  'outline-width',
  'letter-spacing',
  'word-spacing',
  'text-indent'
]

const remToPX = (cssStyles: [string, string][]): [string, string][] => {
  const remStringToPXString = (remValue: string) => {
    const remValues = remValue.split(/\s+/)
    const pxValues = remValues.map(rem => {
      const remNumber = parseFloat(rem)
      if (isNaN(remNumber)) {
        // Quietly fail if we can't parse the rem value
        // so we don't crash the app
        return remValue
      }
      return (remNumber * 16).toFixed(2) + 'px'
    })

    return pxValues.join(' ')
  }

  return cssStyles.map(([key, value]) => {
    console.log('key', key)
    console.log('value', value)
    if (
      typeof key === 'string' &&
      typeof value === 'string' &&
      cssPropertiesThatCanContainRem.includes(key) &&
      value.includes('rem')
    ) {
      return [key, remStringToPXString(value)]
    }

    return [key, value]
  })
}

const numberToPX = (cssStyles: [string, string][]): [string, string][] => {
  return cssStyles.map(([key, value]) => {
    if (typeof value === 'number') {
      return [key, `${value}px`]
    }

    return [key, value]
  })
}

const webToNative = (cssStyles: [string, string][]) => {
  return cssToReactNative(numberToPX(remToPX(cssStyles)))
}

export const platformStyleTranslation = (cssStyle: CrossPlatformStyle) => {
  if (!cssStyle || Object.keys(cssStyle).length === 0) return {}
  if (getEnvironmentName() === 'native') {
    return webToNative(Object.entries(cssStyle))
  }
  return cssStyle
}

import {getEnvironmentName} from '@interunit/config'
import {type MergeWithOverride} from '@interunit/toolbox'
import cssToReactNative from 'css-to-react-native'
import type React from 'react'
import type {TextStyle, ViewStyle} from 'react-native'

import {validReactNativeStyleProperties} from '../constants/validReactNativeStyleProperties'

export type CrossPlatformStyle =
  | MergeWithOverride<React.CSSProperties, ViewStyle | TextStyle>
  | undefined

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
    if (
      typeof key === 'string' &&
      typeof value === 'string' &&
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
      return [key, `${value}`]
    }

    return [key, value]
  })
}

const totallyFlattenObject = (
  obj: {[key: string]: any},
  flattened: {[key: string]: any} = {}
) => {
  for (const key in obj) {
    if (
      typeof obj[key] === 'object' &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      totallyFlattenObject(obj[key], flattened)
    } else {
      flattened[key] = obj[key]
    }
  }
  return flattened
}

const webToNative = (_cssStyles: CrossPlatformStyle) => {
  if (!_cssStyles) return {}
  // We need to pull out the style properties that sometimes
  // come nested depending on how the styles are defined
  const cssStyles = totallyFlattenObject(_cssStyles)

  // css-to-react-native doesn't play well with certain
  // styles and formatting, so this is a workaround
  const stylesToFormat = {}
  Object.entries(cssStyles).forEach(([key, value]) => {
    if (!isNaN(parseInt(key))) {
      return
    }
    if (typeof value === 'object') {
      return
    }
    if (value === undefined || key === 'mask') {
      return
    }

    // TODO: are there any more special cases?
    // zIndex is a special case, it needs to be a number
    if (key !== 'zIndex' && typeof value === 'number') {
      value = `${value}px`
    }

    Object.assign(stylesToFormat, {[key]: value})
  })

  //
  // 1. Convert remToPX with 16px root font size
  // 2. Convert any remaining numbers to strings since css-to-react-native doesn't do numbers well
  // 3. Convert the css styles to react native styles
  //
  const formattedStyles = cssToReactNative(
    numberToPX(remToPX(Object.entries(stylesToFormat)))
  )

  const combinedStyles = {...cssStyles, ...formattedStyles}

  // RN doesn't like undefined values, also isn't a fan of some nativewind
  // styles, so we prune them here.
  //
  // TODO: How do we just run this against a list of all the styles RN doesn't like?
  const prunedCombinedStyles = Object.entries(combinedStyles).reduce(
    (acc, [key, value]) => {
      if (value === undefined) {
        return acc
      }

      if (!validReactNativeStyleProperties.includes(key)) {
        return acc
      }
      return {...acc, [key]: value}
    },
    {}
  )

  return prunedCombinedStyles
}

export const platformStyleTranslation = (cssStyle: CrossPlatformStyle) => {
  if (!cssStyle || Object.keys(cssStyle).length === 0) return {}
  if (getEnvironmentName() === 'native') {
    return webToNative(cssStyle)
  }
  return cssStyle
}

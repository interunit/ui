import React from 'react'
import {type Text as RNText, type TextProps} from 'react-native'

import {Element} from '../config'
import {optionalProp} from '../helpers'

interface TextPrimitiveSharedProps {}

interface TextPrimitiveNativeProps extends TextPrimitiveSharedProps, TextProps {
  as?: RNText
}

interface TextPrimitiveWebProps
  extends TextPrimitiveSharedProps,
    HTMLSpanElement {
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

type TextPrimitiveProps = TextPrimitiveNativeProps | TextPrimitiveWebProps

type TextPrimitiveRef = RNText | HTMLSpanElement

const Text = React.forwardRef<TextPrimitiveRef, TextPrimitiveProps>(
  ({as, children, ...props}, forwardedRef): React.ReactNode => {
    return (
      <Element.Span ref={forwardedRef} {...optionalProp(as)} {...props}>
        {children}
      </Element.Span>
    )
  }
)

export {Text}

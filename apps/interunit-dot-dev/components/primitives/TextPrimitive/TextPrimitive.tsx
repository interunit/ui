import React from 'react'

import {Shorthand, type UtilityStyles} from '@/components/utility/Shorthand'
import {Primitive} from '@interunit/primitives'

type TextPrimitiveProps = React.ComponentPropsWithoutRef<
  typeof Primitive.Text
> &
  UtilityStyles
type TextPrimitiveRef = React.ElementRef<typeof Primitive.Text>

const TextPrimitive = React.forwardRef<TextPrimitiveRef, TextPrimitiveProps>(
  ({children, ...props}, forwardedRef) => {
    const TextPrimtitiveWithShorthand = Shorthand({element: Primitive.Text})
    return (
      <TextPrimtitiveWithShorthand {...props} ref={forwardedRef}>
        {children}
      </TextPrimtitiveWithShorthand>
    )
  }
)

export {TextPrimitive}

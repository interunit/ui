import React from 'react'

import {Shorthand, type UtilityStyles} from '@/components/utility/Shorthand'
import {Primitive} from '@interunit/primitives'

type ImagePrimitiveProps = React.ComponentPropsWithoutRef<
  typeof Primitive.Image
> &
  UtilityStyles
type ImagePrimitiveRef = React.ElementRef<typeof Primitive.Image>

const ImagePrimitive = React.forwardRef<ImagePrimitiveRef, ImagePrimitiveProps>(
  ({children, ...props}, forwardedRef) => {
    const ImagePrimtitiveWithShorthand = Shorthand({element: Primitive.Image})
    return (
      <ImagePrimtitiveWithShorthand {...props} ref={forwardedRef}>
        {children}
      </ImagePrimtitiveWithShorthand>
    )
  }
)

export {ImagePrimitive}

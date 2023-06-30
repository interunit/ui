
import React from 'react'

import {Shorthand, type UtilityStyles} from '@/components/utility/Shorthand'
import {Primitive} from '@interunit/primitives'

type BoxPrimitiveProps = React.ComponentPropsWithoutRef<
  typeof Primitive.Box
> &
  UtilityStyles
type BoxPrimitiveRef = React.ElementRef<typeof Primitive.Box>

const BoxPrimitive = React.forwardRef<BoxPrimitiveRef, BoxPrimitiveProps>(
  ({children, ...props}, forwardedRef) => {
    const BoxPrimtitiveWithShorthand = Shorthand({element: Primitive.Box})
    return (
      <BoxPrimtitiveWithShorthand {...props} ref={forwardedRef}>
        {children}
      </BoxPrimtitiveWithShorthand>
    )
  }
)

export {BoxPrimitive}

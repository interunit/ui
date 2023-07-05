import React from 'react'

import {Shorthand, type UtilityStyles} from '@/components/utility/Shorthand'
import {Primitive} from '@interunit/primitives'

type ButtonPrimitiveProps = React.ComponentPropsWithoutRef<
  typeof Primitive.Button
> &
  UtilityStyles
type ButtonPrimitiveRef = React.ElementRef<typeof Primitive.Button>

const ButtonPrimtitiveWithShorthand = Shorthand({element: Primitive.Button})
const ButtonPrimitive = React.forwardRef<
  ButtonPrimitiveRef,
  ButtonPrimitiveProps
>(({children, ...props}, forwardedRef) => {
  return (
    <ButtonPrimtitiveWithShorthand {...props} ref={forwardedRef}>
      {children}
    </ButtonPrimtitiveWithShorthand>
  )
})

export {ButtonPrimitive}

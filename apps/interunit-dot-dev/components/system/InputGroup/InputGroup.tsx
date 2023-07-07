import React from 'react'

import {Primitive} from '@interunit/primitives'

interface InputGroupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Primitive.Box>, 'el'> {
  el?: 'div'
}


const InputGroup = React.forwardRef<
  React.ElementRef<typeof Primitive.Box>,
  InputGroupProps
>(({el = 'div', className, children, ...props}, forwardedRef) => {
  return (
    <Primitive.Box el={el} className={`mb-4 full-width ${className}`} {...props} ref={forwardedRef}>
      {children}
    </Primitive.Box>
  )
})
export {InputGroup}

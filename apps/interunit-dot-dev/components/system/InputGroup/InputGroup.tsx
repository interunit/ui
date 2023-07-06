import React from 'react'
import styled from 'styled-components'

import {Primitive} from '@interunit/primitives'

interface InputGroupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Primitive.Box>, 'el'> {
  el?: 'div'
}

const StyledInputGroup = styled(Primitive.Box)<InputGroupProps>`
  margin-bottom: 1rem;
  width: 100%;
`

const InputGroup = React.forwardRef<
  React.ElementRef<typeof Primitive.Box>,
  InputGroupProps
>(({el = 'div', children, ...props}, forwardedRef) => {
  return (
    <StyledInputGroup el={el} {...props} ref={forwardedRef}>
      {children}
    </StyledInputGroup>
  )
})
export {InputGroup}

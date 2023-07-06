import React from 'react'
import styled from 'styled-components'

import {Text} from '@/components/system/Text'

const StyledInputLabel = styled(Text)`
  display: inline-block;
  margin-bottom: 0.25rem;
`

interface StyledInputLabelProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Text>, 'el'> {
  el?: 'label'
}

const InputLabel = React.forwardRef<
  React.ElementRef<typeof Text>,
  StyledInputLabelProps
>(({children, ...props}, forwardedRef) => {
  return (
    <StyledInputLabel el={'label'} {...props} ref={forwardedRef}>
      {children}
    </StyledInputLabel>
  )
})
export {InputLabel}

import React from 'react'

import {Text} from '@/components/system/Text'

interface StyledInputLabelProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Text>, 'el'> {
  el?: 'label'
}

const InputLabel = React.forwardRef<
  React.ElementRef<typeof Text>,
  StyledInputLabelProps
>(({className, children, ...props}, forwardedRef) => {
  return (
    <Text el={'label'} className={`mb-1 inline-block ${className}`}{...props} ref={forwardedRef}>
      {children}
    </Text>
  )
})
export {InputLabel}

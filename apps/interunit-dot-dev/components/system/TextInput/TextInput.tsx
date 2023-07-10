import {TextInput as TextInputLib} from '@interunit/form'
import React from 'react'
import {twMerge} from 'tailwind-merge'

const TextInput = React.forwardRef<
  React.ElementRef<typeof TextInputLib>,
  React.ComponentPropsWithoutRef<typeof TextInputLib>
>(({className, ...props}, forwardedRef) => {
  return (
    <TextInputLib
      className={twMerge(
        'appearance-none border-color-border rounded px-3 py-4 w-full focus-visible:outline-offset-0 focus-visible:outline-color-outline focus-visible:outline-2 text-black',
        className
      )}
      {...props}
      ref={forwardedRef}
    />
  )
})

export {TextInput}

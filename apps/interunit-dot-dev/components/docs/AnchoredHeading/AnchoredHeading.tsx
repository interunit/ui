import {P} from '@interunit/primitives'
import {Link2} from 'lucide-react'
import {useRouter} from 'next/navigation'
import React from 'react'
import {twMerge} from 'tailwind-merge'

import {Text} from '@/components/system/Text'

type AnchoredHeadingProps = React.ComponentPropsWithoutRef<typeof Text> & {
  id: string
  boxClassName?: string
}

const AnchoredHeading = React.forwardRef<
  React.ElementRef<typeof Text>,
  AnchoredHeadingProps
>(({id, boxClassName, children, ...props}, forwardedRef) => {
  const router = useRouter()

  const handleCopyAndUrlChange = (id: string) => {
    navigator.clipboard.writeText(window.location.href + '#' + id)
    router.replace(window.location.href + '#' + id)
  }
  return (
    <P.BX
      el="span"
      className={twMerge(
        'group flex flex-row items-center gap-4',
        boxClassName
      )}
    >
      <Text id={id} {...props} ref={forwardedRef}>
        {children}
      </Text>
      <P.BT className="group-hover:opacity-100 appearance-none opacity-0 transition-opacity">
        <Link2
          onClick={() => handleCopyAndUrlChange(id)}
          size={16}
          role="img"
          aria-label="Click to change the url to link to this heading"
        />
      </P.BT>
    </P.BX>
  )
})

export {AnchoredHeading}

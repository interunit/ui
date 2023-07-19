import React from 'react'
import type {ImageProps} from 'react-native'

import {Construct} from '../../config'
import {
  type DiscriminatedProps,
  filterPropsByEnvironment
} from '../../helpers/props'

const ImageConstruct = {
  img: Construct.Image
}
export type ImagePrimitiveProps<T extends keyof typeof ImageConstruct> = Omit<
  ImageProps,
  'source'
> &
  DiscriminatedProps<T>

export const Image = React.forwardRef(
  <T extends keyof typeof ImageConstruct>(
    {src, alt, ...props}: ImagePrimitiveProps<T>,
    forwardedRef: any
  ) => {
    const Image = ImageConstruct.img

    const accessibilityProps = {
      accessible: props.accessible ?? true,
      accessibilityLabel: props.accessibilityLabel ?? props['aria-label'] ?? alt
    }

    const filteredProps = filterPropsByEnvironment({
      props: {...props, ...accessibilityProps}
    })

    return <Image src={src} alt={alt} ref={forwardedRef} {...filteredProps} />
  }
)

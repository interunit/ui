import React from 'react'
import {type Image as RNImage} from 'react-native'

import {Construct} from '../../config'
import {filterPropsByEnvironment} from '../../helpers/props'

type ImageComponent = React.ElementType<RNImage>
type ValidWebImageConstruct = HTMLImageElement
type ValidImageConstruct = ValidWebImageConstruct & ImageComponent
type ValidImageConstructProps =
  | React.HTMLProps<ValidImageConstruct>
  | React.ComponentProps<ImageComponent>

const ImageConstruct = {
  Image: Construct.Image
}
export type ImagePrimitiveProps = ValidImageConstructProps & {
  src: string
  alt: string
  /*
   * Similar accessibility props between React Native and Web
   */
  // Web Accessibility
  'aria-label'?: string
  // Native Accessibility
  accessible?: boolean
  accessibilityLabel?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Image = React.forwardRef<any, ImagePrimitiveProps>(
  ({src, alt, ...props}, forwardedRef) => {
    const Image = ImageConstruct.Image
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

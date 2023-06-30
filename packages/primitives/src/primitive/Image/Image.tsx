import React from 'react'
import {type Image as RNImage} from 'react-native'
import {Construct} from '../../config'

type ImageComponent = React.ElementType<RNImage>
type ValidWebImageConstruct = HTMLImageElement
type ValidImageConstruct = ValidWebImageConstruct & ImageComponent
type ValidImageConstructProps = React.HTMLProps<ValidImageConstruct> & React.ComponentProps<ImageComponent>

const ImageConstruct = {
  Image: Construct.Image
}
export interface ImagePrimitiveProps
  extends ValidImageConstructProps     {
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
  ref?: React.ForwardedRef<ValidImageConstruct>
}
type ImagePrimitiveRef = ValidImageConstruct
export const Image = React.forwardRef<ImagePrimitiveRef, ImagePrimitiveProps>(
  ({src, alt, ...props}, forwardedRef) => {
    const Image = ImageConstruct.Image
    const accessibilityProps = {
      accessible: props.accessible ?? true,
      accessibilityLabel: props.accessibilityLabel ?? props['aria-label'] ?? alt
    }
    return (
      <Image
        src={src}
        alt={alt}
        ref={forwardedRef}
        {...accessibilityProps}
        {...props}
      />
    )
  }
)

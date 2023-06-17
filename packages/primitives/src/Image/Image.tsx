import React from 'react'

import {Element} from '../config'
import {styled} from '../createPrimitives'

type ImageElementComponent = typeof Element.Image
type ImageElementProps = React.ComponentProps<ImageElementComponent>

type ImagePrimitiveProps = ImageElementProps & {
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

const Image = React.forwardRef<any, ImagePrimitiveProps>(
  ({src, alt, ...props}, forwardedRef) => {
    const Image = Element.Image
    const StyledImage = styled(Image, {})

    const accessibilityProps = {
      accessible: props.accessible ?? true,
      accessibilityLabel: props.accessibilityLabel ?? props['aria-label'] ?? alt
    }

    return (
      <StyledImage
        src={src}
        alt={alt}
        ref={forwardedRef}
        {...accessibilityProps}
        {...props}
      />
    )
  }
)

export {Image}

import {getEnvironmentName} from '@interunit/config'
import {type Merge} from '@interunit/toolbox'
import React from 'react'
import type {Image as RNImage} from 'react-native'

import {Construct} from '../../config'
import {filterPropsByEnvironment} from '../../helpers/props'

const ImageConstruct = {
  img: Construct.Image
}
export type ImagePrimitiveProps<T extends keyof typeof ImageConstruct> = {
  el: T
}

export const Image = React.forwardRef(
  <T extends keyof typeof ImageConstruct>(
    {
      src,
      alt,
      ..._props
    }: ImagePrimitiveProps<T> & {
      style?: Merge<
        [
          React.ComponentPropsWithoutRef<typeof RNImage>,
          React.JSX.IntrinsicElements[T]['style']
        ]
      >
    } & Merge<
        [
          React.ComponentPropsWithoutRef<typeof RNImage>,
          React.JSX.IntrinsicElements[T]
        ]
      >,
    forwardedRef: any
  ) => {
    const Image = ImageConstruct.img
    // TODO: Why does this need to be re-casted to work
    // internally?
    const props = _props as unknown as React.JSX.IntrinsicElements[T] &
      React.ComponentPropsWithoutRef<typeof RNImage> &
      ImagePrimitiveProps<T>

    const accessibilityProps = {
      accessible: props.accessible ?? true,
      accessibilityLabel: props.accessibilityLabel ?? props['aria-label'] ?? alt
    }

    const filteredProps = filterPropsByEnvironment({
      props: {...props, ...accessibilityProps}
    })

    // Might make sense to move this along with other things to some
    // sort of HOC pattern for matching parity on props across platforms
    if (filteredProps.hidden && getEnvironmentName() === 'native') {
      return
    }

    return <Image src={src} alt={alt} ref={forwardedRef} {...filteredProps} />
  }
)

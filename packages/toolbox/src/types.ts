import type React from 'react'
import type {Image, Pressable, Text, View} from 'react-native'

export type WithRequired<T, K extends keyof T> = T & {[P in K]-?: T[P]}

export type MergeWithOverride<T, U> = U extends infer O
  ? O extends object
    ? T & Omit<O, keyof T>
    : never
  : never

type ReactNativeComponents =
  | typeof View
  | typeof Text
  | typeof Image
  | typeof Pressable

export type MergedCrossPlatformProps<
  WebElement extends keyof React.JSX.IntrinsicElements,
  NativeElement extends ReactNativeComponents
> = Omit<
  React.ComponentPropsWithoutRef<NativeElement> &
    React.JSX.IntrinsicElements[WebElement],
  'ref'
> & {
  style?: React.ComponentPropsWithoutRef<NativeElement>['style'] &
    React.JSX.IntrinsicElements[WebElement]['style']

  ref?: React.Ref<any>
}

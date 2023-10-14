import React from 'react'

import {Primitive} from '../../primitive'

export const Span = React.forwardRef(function Span(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof Primitive.Text<'span'>>,
    'el'
  >,
  forwardedRef
) {
  return <Primitive.Text el="span" {...props} ref={forwardedRef} />
})

export const H1 = React.forwardRef(function H1(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof Primitive.Text<'h1'>>,
    'el'
  >,
  forwardedRef
) {
  return <Primitive.Text el="h1" {...props} ref={forwardedRef} />
})

export const H2 = React.forwardRef(function H2(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof Primitive.Text<'h2'>>,
    'el'
  >,
  forwardedRef
) {
  return <Primitive.Text el="h2" {...props} ref={forwardedRef} />
})

export const H3 = React.forwardRef(function H3(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof Primitive.Text<'h3'>>,
    'el'
  >,
  forwardedRef
) {
  return <Primitive.Text el="h3" {...props} ref={forwardedRef} />
})

export const H4 = React.forwardRef(function H4(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof Primitive.Text<'h4'>>,
    'el'
  >,
  forwardedRef
) {
  return <Primitive.Text el="h4" {...props} ref={forwardedRef} />
})

export const H5 = React.forwardRef(function H5(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof Primitive.Text<'h5'>>,
    'el'
  >,
  forwardedRef
) {
  return <Primitive.Text el="h5" {...props} ref={forwardedRef} />
})

export const H6 = React.forwardRef(function H6(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof Primitive.Text<'h6'>>,
    'el'
  >,
  forwardedRef
) {
  return <Primitive.Text el="h6" {...props} ref={forwardedRef} />
})

export const P = React.forwardRef(function P(
  props: Omit<React.ComponentPropsWithoutRef<typeof Primitive.Text<'p'>>, 'el'>,
  forwardedRef
) {
  return <Primitive.Text el="p" {...props} ref={forwardedRef} />
})

export const A = React.forwardRef(function A(
  props: Omit<React.ComponentPropsWithoutRef<typeof Primitive.Text<'a'>>, 'el'>,
  forwardedRef
) {
  return <Primitive.Text el="a" {...props} ref={forwardedRef} />
})

export const Label = React.forwardRef(function Label(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof Primitive.Text<'label'>>,
    'el'
  >,
  forwardedRef
) {
  return <Primitive.Text el="label" {...props} ref={forwardedRef} />
})

export const Div = React.forwardRef(function Div(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof Primitive.Box<'div'>>,
    'el'
  >,
  forwardedRef
) {
  return <Primitive.Box el="div" {...props} ref={forwardedRef} />
})

export const Section = React.forwardRef(function Section(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof Primitive.Box<'section'>>,
    'el'
  >,
  forwardedRef
) {
  return <Primitive.Box el="section" {...props} ref={forwardedRef} />
})

export const Nav = React.forwardRef(function Nav(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof Primitive.Box<'nav'>>,
    'el'
  >,
  forwardedRef
) {
  return <Primitive.Box el="nav" {...props} ref={forwardedRef} />
})

export const Ul = React.forwardRef(function Ul(
  props: Omit<React.ComponentPropsWithoutRef<typeof Primitive.Box<'ul'>>, 'el'>,
  forwardedRef
) {
  return <Primitive.Box el="ul" {...props} ref={forwardedRef} />
})

export const Li = React.forwardRef(function Li(
  props: Omit<React.ComponentPropsWithoutRef<typeof Primitive.Box<'li'>>, 'el'>,
  forwardedRef
) {
  return <Primitive.Box el="li" {...props} ref={forwardedRef} />
})

export const Button = React.forwardRef(function Button(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof Primitive.Button<'button'>>,
    'el'
  >,
  forwardedRef
) {
  return <Primitive.Button el="button" {...props} ref={forwardedRef} />
})

export const Img = React.forwardRef(function Image(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof Primitive.Image<'img'>>,
    'el'
  >,
  forwardedRef
) {
  return <Primitive.Image el="img" {...props} ref={forwardedRef} />
})

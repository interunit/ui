import {InterUnitInternals} from '../../createInterUnit'

export const useComponentExtension = ({
  Component,
  name
}: {
  Component: any
  name: string
}) => {
  const {componentExtensions} = InterUnitInternals.useInterUnitInternalContext()

  if (!name || !Component) {
    throw new Error('useOverride must be called with a name and a Component')
  }

  if (!componentExtensions) return Component

  const RawExtendedComponent = componentExtensions[name]
  const ExtendedComponent = extendComponent<
    typeof RawExtendedComponent,
    typeof Component
  >({
    RawExtendedComponent
  })

  if (RawExtendedComponent && ExtendedComponent) {
    return ExtendedComponent
  }

  return Component
}

// export const extendComponent = <ExtendedComponentProps, O>({
//   ExtendedComponent
// }: {
//   ExtendedComponent: React.ComponentType<ExtendedComponentProps>
// }) => {
//   return ExtendedComponent as React.ComponentType<O> &
//     React.ComponentType<ExtendedComponentProps>
// }
//
// export const extendComponent = <C, P>({ Component, Primitive}: { Component: C, Primitive: P}) => {
//     return <Primitive Extends={() => <Component/>} />
// }

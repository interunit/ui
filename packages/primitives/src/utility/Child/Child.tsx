import React from 'react'

import {filterPropsByEnvironment} from '../../helpers/props'

// TODO: Type any
const ChildElement = React.forwardRef<any, any>(
  ({children, ...props}, forwardedRef) => {
    ChildElement.displayName = 'ChildElement'
    const child: React.ReactElement = children?.[0] || children
    if (React.isValidElement(child)) {
      const combinedProps = {
        ...(child as React.ReactElement)?.props,

        ...props,
        onClick:
          props?.onClick ??
          (child as React.ReactElement)?.props?.onClick ??
          props?.onClickOrPress ??
          (child as React.ReactElement)?.props.onClickOrPress,
        onPress:
          props?.onPress ??
          (child as React.ReactElement)?.props?.onPress ??
          props?.onClickOrPress ??
          (child as React.ReactElement)?.props.onClickOrPress
      }

      delete combinedProps.onClickOrPress

      const filteredProps = filterPropsByEnvironment({props: combinedProps})

      return React.cloneElement(children, {
        ...filteredProps,
        ref: forwardedRef
      })
    }
    return <>{children}</>
  }
)

type ChildProps = {
  children: React.ReactNode
  // Don't want to have to type this lol
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Child = React.forwardRef<any, ChildProps>(
  ({children, ...props}, forwardedRef) => {
    return (
      <ChildElement {...props} ref={forwardedRef}>
        {children}
      </ChildElement>
    )
  }
)

export {Child}

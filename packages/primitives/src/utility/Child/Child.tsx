import React from 'react'
import {Text} from 'react-native'

// TODO: Type any
const ChildElement = React.forwardRef<any, any>(
  ({children, ...props}, forwardedRef) => {
    ChildElement.displayName = 'ChildElement'
    const child: React.ReactElement = children?.[0] || children
    if (React.isValidElement(child)) {
      return React.cloneElement(children, {
        ...(child as React.ReactElement)?.props,
        // TODO: a way to automate this?
        onClick: props?.onClick || props?.onClickOrPress,
        onPress: props?.onPress || props?.onClickOrPress,
        ...props,
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

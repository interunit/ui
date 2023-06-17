import React from 'react'

// TODO: Type any
const ChildElement = React.forwardRef<any, any>(
  ({children, ...props}, forwardedRef) => {
    ChildElement.displayName = 'ChildElement'
    const child: React.ReactElement = children?.[0] || children

    if (React.isValidElement(child)) {
      const ClonedElement: React.ReactNode = React.cloneElement(child, {
        ...(child as React.ReactElement)?.props,
        ...props,
        ref: forwardedRef
      })

      return ClonedElement
    }

    return <>{children}</>
  }
)

// TODO: Type any
const Child = React.forwardRef<any, any>(
  ({children, ...props}, forwardedRef) => {
    return (
      <ChildElement {...props} ref={forwardedRef}>
        {children}
      </ChildElement>
    )
  }
)

export {Child}

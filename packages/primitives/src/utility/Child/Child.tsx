import React from 'react'

import {filterPropsByEnvironment} from '../../helpers/props'

// TODO: Type any
const ChildElement = React.forwardRef<any, any>(
  ({children, ...props}, forwardedRef) => {
    ChildElement.displayName = 'ChildElement'
    const child: React.ReactElement = children?.[0] || children
    if (React.isValidElement(child)) {
      // Combine function props so that both functions execute no matter if
      // the child component's or parent component's function executes
      const matchingPropKeys = Object.keys(props).filter(prop => {
        return Object.keys((child as React.ReactElement).props).includes(prop)
      })

      const matchingFnProps = matchingPropKeys.filter(prop => {
        return typeof (child as React.ReactElement).props[prop] === 'function'
      })

      const combinedFnProps = matchingFnProps.reduce((acc: any, prop: any) => {
        acc[prop] = (...args: any[]) => {
          // prettier-ignore
          (child as React.ReactElement).props[prop](...args)
          //prettier-ignore
          props[prop](...args)
        }
        return acc
      }, {})

      const combinedProps = {
        ...(child as React.ReactElement)?.props,
        ...props,
        ...combinedFnProps
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

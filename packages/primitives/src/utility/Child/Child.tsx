import React from 'react'

import {InterUnitInternals} from '@interunit/config'

const ENVIRONMENT = InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT.NAME

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

type ChildDimensions = {
  width: number
  height: number
  x: number
  y: number
}

type GetChildDimensions = (childDimensions: ChildDimensions) => void

type ChildProps = {
  getChildDimensions?: GetChildDimensions
  children: React.ReactNode
  // Don't want to have to type this lol
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Child = React.forwardRef<any, ChildProps>(
  ({children, getChildDimensions, ...props}, forwardedRef) => {
    if (ENVIRONMENT === 'native') {
      return (
        <ChildElement
          {...props}
          ref={forwardedRef}
          onLayout={(e: {nativeEvent: {layout: ChildDimensions}}) => {
            if (getChildDimensions) {
              getChildDimensions(e.nativeEvent.layout)
            }
          }}
        >
          {children}
        </ChildElement>
      )
    }

    if (ENVIRONMENT === 'web') {
      const internalUseRef = React.useRef(forwardedRef)

      React.useEffect(() => {
        if (internalUseRef.current && getChildDimensions) {
          const element = internalUseRef.current as unknown as HTMLElement
          if (!element.getBoundingClientRect) return
          const clientRect = element.getBoundingClientRect()

          getChildDimensions({
            x: clientRect.x,
            y: clientRect.y,
            width: clientRect.width,
            height: clientRect.height
          })
        }
      }, [])

      return (
        <ChildElement
          {...props}
          ref={forwardedRef}
        >
          {children}
        </ChildElement>
      )
    }
  }
)

          // ref={ref => {
          //   internalUseRef.current = ref
          //   console.log('HEREE', ref)
          //   if (typeof forwardedRef === 'function') {
          //     forwardedRef(ref)
          //   } else if (forwardedRef) {
          //     forwardedRef.current = ref
          //   }
          // }}
export {Child}

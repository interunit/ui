import React from 'react'

import {InterUnitInternals, useCSSUnitConversion} from '@interunit/config'
import {Child, Primitive} from '@interunit/primitives'

import {
  FloatingArrow,
  type FloatingArrowProps,
  type UseFloatingOptions,
  arrow,
  offset,
  shift,
  useFloating
} from './floating-ui'
import {isTouchDevice, pruneStyles} from './utils'

const ENVIRONMENT = InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT.NAME

type TriggerDimensions = {
  x: number
  y: number
  height: number
  width: number
}

type PopoverPositioning = Omit<UseFloatingOptions, 'placement'> & {
  side?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'end'
  offset?: number
  width?: 'trigger' | string | number
  maxWidth?: string
  arrow?: Omit<FloatingArrowProps, 'context'> & {
    style?: React.CSSProperties
  }
}

type PopoverState = {
  dispatch: React.Dispatch<ReducerAction>
  isOpen: boolean
  popoverPositioning?: PopoverPositioning
  setTrigger: ((trigger: React.ReactElement | null) => void) | null
  togglePopover: () => void
  trigger?: React.ReactElement | null
  triggerType: 'click' | 'hover'
  triggerDimensions: TriggerDimensions
}

const DEFAULT_POPOVER_STATE: PopoverState = {
  dispatch: () => {},
  isOpen: false,
  setTrigger: null,
  togglePopover: () => {},
  trigger: null,
  triggerType: 'click',
  triggerDimensions: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }
}

const PopoverContext = React.createContext(DEFAULT_POPOVER_STATE)

type PayloadlessReducerAction = {
  type: 'OPEN' | 'CLOSE' | 'TOGGLE'
}

type SetTriggerDimensionsAction = {
  type: 'SET_TRIGGER_DIMENSIONS'
  payload: TriggerDimensions
}

type ReducerAction = PayloadlessReducerAction | SetTriggerDimensionsAction

// TODO: option to click outside to close (probably should be default behavior)
const Popover = ({
  children,
  triggerType,
  onPopoverStateChange,
  popoverPositioning,
  defaultOpen
}: {
  onPopoverStateChange?: (popoverState: PopoverState) => void
  triggerType: 'click' | 'hover'
  defaultOpen?: boolean
  popoverPositioning?: PopoverPositioning
  ArrowElement?: React.ReactElement | null
  children: React.ReactNode
}) => {
  const [trigger, setTrigger] = React.useState<React.ReactElement | null>(null)

  const [state, dispatch] = React.useReducer(
    (prevState: PopoverState, action: ReducerAction) => {
      switch (action.type) {
        case 'OPEN':
          return {...prevState, isOpen: true}
        case 'CLOSE':
          return {...prevState, isOpen: false}
        case 'TOGGLE':
          return {...prevState, isOpen: !prevState.isOpen}
        case 'SET_TRIGGER_DIMENSIONS':
          return {...prevState, triggerDimensions: action.payload}
        default:
          throw new Error()
      }
    },
    {...DEFAULT_POPOVER_STATE, popoverPositioning, isOpen: defaultOpen ?? false}
  )

  React.useEffect(() => {
    if (onPopoverStateChange) {
      onPopoverStateChange(state)
    }
  }, [state])

  return (
    <PopoverContext.Provider
      value={{...state, dispatch, trigger, setTrigger, triggerType}}
    >
      <Primitive.Box
        as="div"
        // The floating styles are technically correct but React.CSSProperties
        // doesn't seem to think so
        //
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        collapsable={false}
      >
        {children}
      </Primitive.Box>
    </PopoverContext.Provider>
  )
}

const PopoverTrigger = ({children}: {children: React.ReactNode}) => {
  const {dispatch, trigger, setTrigger, triggerType, isOpen} =
    React.useContext(PopoverContext)

  React.useEffect(() => {
    const TriggerElement = trigger as unknown as HTMLElement

    if (TriggerElement && ENVIRONMENT === 'web') {
      if (!TriggerElement?.getBoundingClientRect) return
      const clientRect = TriggerElement.getBoundingClientRect()
      const dimensions = {
        x: clientRect.x,
        y: clientRect.y,
        width: clientRect.width,
        height: clientRect.height
      }

      dispatch({type: 'SET_TRIGGER_DIMENSIONS', payload: dimensions})
    }
  }, [trigger])

  return (
    <Child
      onClickOrPress={(event: MouseEvent) => {
        event.preventDefault()
        if (
          triggerType === 'click' ||
          (triggerType === 'hover' && isTouchDevice())
        ) {
          dispatch({type: 'TOGGLE'})
        }
      }}
      onMouseEnter={() => {
        if (triggerType === 'hover' && ENVIRONMENT === 'web') {
          dispatch({type: 'OPEN'})
        }
      }}
      onKeyDown={(event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          dispatch({type: 'TOGGLE'})
        }

        if (event.key === 'Escape') {
          dispatch({type: 'CLOSE'})
        }
      }}
      onLayout={(e: {
        nativeEvent: {layout: PopoverState['triggerDimensions']}
      }) => {
        dispatch({
          type: 'SET_TRIGGER_DIMENSIONS',
          payload: e.nativeEvent.layout
        })
      }}
      ref={setTrigger}
      collapsable={false}
      data-popover-state={isOpen}
    >
      {children}
    </Child>
  )
}

const PopoverContent = ({children}: {children: React.ReactNode}) => {
  const {convert} = useCSSUnitConversion()
  const {
    isOpen,
    trigger,
    triggerType,
    dispatch,
    triggerDimensions,
    popoverPositioning
  } = React.useContext(PopoverContext)
  const arrowRef = React.useRef(null)

  const {
    refs,
    floatingStyles: rawFloatingStyles,
    context
  } = useFloating({
    strategy: 'absolute',
    elements: {
      reference: trigger as unknown as Element
    },
    middleware: [
      shift(),
      offset(popoverPositioning?.offset || 0),
      arrow({element: arrowRef || null})
    ],
    placement:
      !popoverPositioning?.side || !popoverPositioning?.align
        ? 'bottom'
        : (`${popoverPositioning?.side}${
            popoverPositioning?.align && `-${popoverPositioning.align}`
          }` as UseFloatingOptions['placement']),
    ...popoverPositioning
  })

  if (isOpen && trigger) {
    return (
      <Primitive.Box
        as="div"
        style={{
          maxWidth:
            convert({
              value: popoverPositioning?.maxWidth,
              unit: 'px',
              property: 'SIZING'
            }) ?? 'auto',
          width:
            popoverPositioning?.width === 'trigger'
              ? triggerDimensions?.width
              : convert({
                  value: popoverPositioning?.width,
                  unit: 'px',
                  property: 'SIZING'
                })
              ? popoverPositioning?.width
              : 'auto',
          ...pruneStyles(rawFloatingStyles)
        }}
        className="iu-popover-content"
        onMouseLeave={() => {
          if (triggerType === 'hover' && ENVIRONMENT === 'web') {
            dispatch({type: 'CLOSE'})
          }
        }}
        onKeyDown={(_event: unknown) => {
          const event = _event as KeyboardEvent

          if (event.key === 'Escape') {
            dispatch({type: 'CLOSE'})
          }
        }}
        ref={refs.setFloating}
        data-popover-state={isOpen}
        data-popover-side={popoverPositioning?.side}
        data-popover-align={popoverPositioning?.align}
      >
        <>
          {/* TODO: Arrow doesn't work in native */}
          {ENVIRONMENT === 'web' && popoverPositioning?.arrow && (
            <>
              {/* TODO: Why is this type not cooperating? */}
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <FloatingArrow
                ref={arrowRef}
                context={context}
                className={`iu-popover-arrow ${popoverPositioning?.arrow?.className}`}
                style={{
                  // Align arrow to stroke so that it overlays the box's border
                  transform: `translateY(-${
                    popoverPositioning?.arrow?.strokeWidth || 0
                  }px)`,
                  ...popoverPositioning?.arrow?.style
                }}
                width={popoverPositioning?.arrow?.width}
                height={popoverPositioning?.arrow?.height}
                strokeWidth={popoverPositioning?.arrow?.strokeWidth}
                stroke={popoverPositioning?.arrow?.stroke}
                fill={popoverPositioning?.arrow?.fill}
                d={popoverPositioning?.arrow?.d}
                tipRadius={popoverPositioning?.arrow?.tipRadius}
                data-popover-state={isOpen}
              />
            </>
          )}
          {children}
        </>
      </Primitive.Box>
    )
  }

  return <></>
}

Popover.Trigger = PopoverTrigger
Popover.Content = PopoverContent

export {Popover}

import {isTouchDevice} from '@interunit/a11y'
import {useOutsideClick} from '@interunit/a11y'
import {InterUnitInternals, useCSSUnitConversion} from '@interunit/config'
import {Modal} from '@interunit/modal'
import {Child, Primitive} from '@interunit/primitives'
import React from 'react'

import {
  type PopoverPositioning,
  useContentPositioning
} from './hooks/useContentPositioning'

const ENVIRONMENT = InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT.NAME

type TriggerDimensions = {
  x: number
  y: number
  height: number
  width: number
}

type PopoverState = {
  isOpen: boolean
  focusType: 'none' | 'default'
  popoverPositioning?: PopoverPositioning
  setTrigger: ((trigger: React.ReactElement | null) => void) | null
  togglePopover: () => void
  trigger?: React.ReactElement | null
  triggerType: 'click' | 'hover'
  triggerDimensions: TriggerDimensions
}

type PopoverContextState = PopoverState & {
  dispatch: React.Dispatch<ReducerAction>
  settings: PopoverSettings
}

const DEFAULT_POPOVER_STATE: PopoverState = {
  isOpen: false,
  setTrigger: null,
  togglePopover: () => {},
  focusType: 'none',
  trigger: null,
  triggerType: 'click',
  triggerDimensions: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }
}

const PopoverContext = React.createContext(
  DEFAULT_POPOVER_STATE as PopoverContextState
)

type PayloadlessReducerAction = {
  type: 'OPEN' | 'CLOSE' | 'TOGGLE'
}

type SetTriggerDimensionsAction = {
  type: 'SET_TRIGGER_DIMENSIONS'
  payload: TriggerDimensions
}
type ReducerAction = PayloadlessReducerAction | SetTriggerDimensionsAction

type PopoverSettings = {
  shouldCloseOnInteractOutside?: boolean
}

const Popover = ({
  triggerType = 'click',
  settings = {shouldCloseOnInteractOutside: true},
  children,
  onPopoverChange,
  popoverPositioning,
  defaultIsOpen
}: {
  onPopoverChange?: (popoverState: PopoverState) => void
  triggerType?: 'click' | 'hover'
  defaultIsOpen?: boolean
  popoverPositioning?: PopoverPositioning
  ArrowElement?: React.ReactElement | null
  settings?: PopoverSettings
  children: React.ReactNode
}) => {
  const popoverRef = React.useRef(null)
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
    {
      ...DEFAULT_POPOVER_STATE,
      popoverPositioning,
      isOpen: defaultIsOpen ?? false
    }
  )

  useOutsideClick({
    ref: popoverRef,
    fn: () => dispatch({type: 'CLOSE'}),
    isEnabled: settings?.shouldCloseOnInteractOutside && state.isOpen
  })

  React.useEffect(() => {
    if (onPopoverChange) {
      onPopoverChange(state)
    }
  }, [state])

  const display = (ENVIRONMENT === 'web' ? 'inline-block' : 'flex') as 'flex'

  return (
    <PopoverContext.Provider
      value={{
        ...state,
        dispatch,
        trigger,
        setTrigger,
        triggerType,
        settings,
        popoverPositioning
      }}
    >
      <Primitive.Box
        el="div"
        style={{position: 'relative', overflow: 'visible', display}}
        collapsable={false}
        ref={popoverRef}
      >
        {children}
      </Primitive.Box>
    </PopoverContext.Provider>
  )
}

const PopoverTrigger = ({
  children
}: {
  children: (({isOpen}: {isOpen: boolean}) => React.ReactNode) | React.ReactNode
}) => {
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
      {typeof children === 'function' ? children({isOpen}) : children}
    </Child>
  )
}

const PopoverContent = ({
  children
}: {
  children: (({isOpen}: {isOpen: boolean}) => React.ReactNode) | React.ReactNode
}) => {
  const {convert} = useCSSUnitConversion()
  const {
    isOpen,
    trigger,
    triggerType,
    dispatch,
    triggerDimensions,
    focusType,
    popoverPositioning
  } = React.useContext(PopoverContext)

  const userDefinedArrowStyle = popoverPositioning?.arrow?.style || {}

  const {positioningStyles, arrowStyles} = useContentPositioning({
    trigger,
    positioning: popoverPositioning
  })

  if (isOpen && trigger) {
    return (
      <Modal
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
          zIndex: popoverPositioning?.zIndex ?? 1,
          ...positioningStyles
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
        onClose={() => dispatch({type: 'CLOSE'})}
        focusType={focusType}
        data-popover-state={isOpen}
        data-popover-side={popoverPositioning?.side}
        data-popover-align={popoverPositioning?.align}
      >
        <>
          {typeof children === 'function' ? children({isOpen}) : children}
          <Primitive.Box
            el="div"
            className={`iu-popover-arrow ${popoverPositioning?.arrow?.className}`}
            aria-hidden={true}
            style={{
              ...arrowStyles,
              ...userDefinedArrowStyle
            }}
          />
        </>
      </Modal>
    )
  }

  return <></>
}

Popover.Trigger = PopoverTrigger
Popover.Content = PopoverContent

export {Popover}

import {isTouchDevice} from '@interunit/a11y'
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

// TODO: option to click outside to close (probably should be default behavior)
const Popover = ({
  children,
  triggerType,
  onPopoverChange,
  popoverPositioning,
  defaultIsOpen,
  settings = {shouldCloseOnInteractOutside : true}
}: {
  onPopoverChange?: (popoverState: PopoverState) => void
  triggerType: 'click' | 'hover'
  defaultIsOpen?: boolean
  popoverPositioning?: PopoverPositioning
  ArrowElement?: React.ReactElement | null
  settings?: PopoverSettings
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
    {
      ...DEFAULT_POPOVER_STATE,
      popoverPositioning,
      isOpen: defaultIsOpen ?? false
    }
  )

  React.useEffect(() => {
    if (onPopoverChange) {
      onPopoverChange(state)
    }
  }, [state])

  // TODO: RN View doesn't like inline-block here
  const display = (ENVIRONMENT === 'web' ? 'inline-block' : 'flex') as 'flex'

  return (
    <PopoverContext.Provider
      value={{...state, dispatch, trigger, setTrigger, triggerType, settings}}
    >
      <Primitive.Box
        el="div"
        // TODO: inline block won't work on native
        style={{position: 'relative', overflow: 'visible', display}}
        collapsable={false}
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
    popoverPositioning,
    settings
  } = React.useContext(PopoverContext)

  const {positioningStyles, arrowStyles} = useContentPositioning({
    trigger,
    positioning: popoverPositioning
  })

  if (isOpen && trigger) {
    return (
      <Modal
        onInteractOutside={() => settings.shouldCloseOnInteractOutside &&  dispatch({type: 'CLOSE'})}
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
            className="iu-popover-arrow"
            aria-hidden="true"
            style={{...arrowStyles}}
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

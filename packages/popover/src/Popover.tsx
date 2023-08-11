import {isTouchDevice, useOutsideClick} from '@interunit/a11y'
import {InterUnitInternals} from '@interunit/config'
import {Modal} from '@interunit/modal'
import {Child, Primitive} from '@interunit/primitives'
import React from 'react'

import {
  type PopoverArrow,
  type PopoverPositioning,
  useContentPositioning
} from './hooks/useContentPositioning'

const ENVIRONMENT = InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT.NAME

type Dimensions = {
  x: number
  y: number
  height: number
  width: number
}

type PopoverState = {
  isOpen: boolean
  focusType: 'none' | 'default'
  setTrigger: ((trigger: React.ReactElement | null) => void) | null
  setContent: ((content: React.ReactElement | null) => void) | null
  togglePopover: () => void
  trigger?: React.ReactElement | null
  content?: React.ReactElement | null
  triggerType: 'click' | 'hover'
  triggerDimensions: Dimensions
  contentDimensions: Dimensions
}

type PopoverContextState = PopoverState & {
  dispatch: React.Dispatch<ReducerAction>
  settings: PopoverSettings
}

const DEFAULT_POPOVER_STATE: PopoverState = {
  isOpen: false,
  setTrigger: null,
  setContent: null,
  togglePopover: () => {},
  focusType: 'none',
  trigger: null,
  content: null,
  triggerType: 'click',
  triggerDimensions: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  contentDimensions: {
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
  payload: Dimensions
}
type SetContentDimensionsAction = {
  type: 'SET_CONTENT_DIMENSIONS'
  payload: Dimensions
}
type ReducerAction = PayloadlessReducerAction | SetTriggerDimensionsAction | SetContentDimensionsAction

type PopoverSettings = {
  shouldCloseOnInteractOutside?: boolean
}

type PopoverProps = {
  triggerType?: 'click' | 'hover'
  defaultIsOpen?: boolean
  settings?: PopoverSettings
  onPopoverChange?: (popoverState: PopoverState) => void
  children: React.ReactNode
}

const Popover = ({
  triggerType = 'click',
  defaultIsOpen,
  settings = {shouldCloseOnInteractOutside: true},
  onPopoverChange,
  children
}: PopoverProps) => {
  const popoverRef = React.useRef(null)
  const [trigger, setTrigger] = React.useState<React.ReactElement | null>(null)
  const [content, setContent] = React.useState<React.ReactElement | null>(null)

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
        case 'SET_CONTENT_DIMENSIONS':
          return {...prevState, contentDimensions: action.payload}
        default:
          throw new Error()
      }
    },
    {
      ...DEFAULT_POPOVER_STATE,
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
        content,
        setContent,
        settings
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
  positioning,
  arrow,
  children
}: {
  positioning?: PopoverPositioning
  arrow?: PopoverArrow
  children: (({isOpen}: {isOpen: boolean}) => React.ReactNode) | React.ReactNode
}) => {
  const {
    isOpen,
    trigger,
    content,
    setContent,
    triggerType,
    dispatch,
    contentDimensions,
    triggerDimensions,
    focusType
  } = React.useContext(PopoverContext)

  const userDefinedArrowStyle = arrow?.style || {}


  const {positioningStyles, arrowStyles} = useContentPositioning({
    trigger,
    content,
    positioning,
    arrow,
    nativeTriggerDimensions: triggerDimensions,
    nativeContentDimensions: contentDimensions
  })

  if (isOpen && trigger) {
    return (
      <Modal
        style={{
          maxWidth: positioning?.maxWidth ?? 'auto',
          width:
            positioning?.width === 'trigger'
              ? `${triggerDimensions?.width}px`
              : positioning?.width
              ? positioning.width
              : 'auto',
          zIndex: positioning?.zIndex ?? 1,
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
        onLayout={(e: {
          nativeEvent: {layout: PopoverState['triggerDimensions']}
        }) => {
            dispatch({
                type: 'SET_CONTENT_DIMENSIONS',
                payload: e.nativeEvent.layout
                })
        }}
        data-popover-state={isOpen}
        data-popover-side={positioning?.side}
        data-popover-align={positioning?.align}
        ref={setContent}
      >
        <>
          {typeof children === 'function' ? children({isOpen}) : children}
          <Primitive.Box
            el="div"
            className={`iu-popover-arrow ${arrow?.className}`}
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

import {isTouchDevice} from '@interunit/a11y'
import {getEnvironmentName} from '@interunit/config'
import {Child} from '@interunit/primitives'
import React from 'react'

type CollapsibleState = {
  isOpen: boolean
  triggerType: 'click' | 'hover'
  defaultIsOpen?: boolean
}

type CollapsibleContextState = CollapsibleState & {
  dispatch: React.Dispatch<ReducerAction>
  a11y?: A11yProps
}

type ReducerAction = {
  type: 'OPEN' | 'CLOSE' | 'TOGGLE'
}

type A11yProps = {
  contentId?: string
  contentLabelledBy?: string
}

const DEFAULT_COLLAPSIBLE_STATE: CollapsibleState = {
  isOpen: false,
  triggerType: 'click'
}

const CollapsibleContext = React.createContext(
  DEFAULT_COLLAPSIBLE_STATE as CollapsibleContextState
)

type CollapsibleProps = {
  defaultIsOpen?: boolean
  triggerType?: 'click' | 'hover'
  onCollapsibleChange?: (collapsibleState: CollapsibleState) => void
  a11y?: A11yProps
  children: React.ReactNode
}

const Collapsible = ({
  defaultIsOpen,
  triggerType = 'click',
  onCollapsibleChange,
  a11y,
  children
}: CollapsibleProps) => {
  const [state, dispatch] = React.useReducer(
    (prevState: CollapsibleState, action: ReducerAction) => {
      switch (action.type) {
        case 'OPEN':
          return {...prevState, isOpen: true}
        case 'CLOSE':
          return {...prevState, isOpen: false}
        case 'TOGGLE':
          return {...prevState, isOpen: !prevState.isOpen}
        default:
          throw new Error(
            `Invalid Collapsible reducer action type: ${action.type}`
          )
      }
    },
    {
      ...DEFAULT_COLLAPSIBLE_STATE,
      isOpen: defaultIsOpen ?? false,
      triggerType,
      defaultIsOpen
    }
  )

  React.useEffect(() => {
    if (onCollapsibleChange) {
      onCollapsibleChange(state)
    }
  }, [state])

  return (
    <CollapsibleContext.Provider value={{...state, a11y, dispatch}}>
      {children}
    </CollapsibleContext.Provider>
  )
}

const CollapsibleTrigger = ({
  children
}: {
  children: (({isOpen}: {isOpen: boolean}) => React.ReactNode) | React.ReactNode
}) => {
  const {isOpen, dispatch, triggerType, a11y} =
    React.useContext(CollapsibleContext)

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
        if (triggerType === 'hover' && getEnvironmentName() === 'web') {
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
      data-popover-state={isOpen}
      aria-expanded={isOpen}
      aria-controls={a11y?.contentId}
    >
      {typeof children === 'function' ? children({isOpen}) : children}
    </Child>
  )
}

const CollapsibleContent = ({
  children
}: {
  children: (({isOpen}: {isOpen: boolean}) => React.ReactNode) | React.ReactNode
}) => {
  const {isOpen, a11y} = React.useContext(CollapsibleContext)
  if (isOpen) {
    return (
      <Child
        role="region"
        id={a11y?.contentId}
        aria-labelledby={a11y?.contentLabelledBy}
      >
        {typeof children === 'function' ? children({isOpen}) : children}
      </Child>
    )
  }
}

Collapsible.Trigger = CollapsibleTrigger
Collapsible.Content = CollapsibleContent

export {Collapsible}

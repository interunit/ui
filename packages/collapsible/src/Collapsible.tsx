import {Child, P} from '@interunit/primitives'
import {
  type UseControlledStateParams,
  useControlledState,
  useIdString
} from '@interunit/toolbox'
import React from 'react'

type CollapsibleContextState = {
  value: boolean
  setValue: (value: boolean) => void
  idString: string
}

const CollapsibleContext = React.createContext<CollapsibleContextState>({
  value: false,
  setValue: () => {},
  idString: ''
})

type CollapsibleProps = {
  children: React.ReactNode
}

const Collapsible = (
  {children, ...props}: CollapsibleProps & UseControlledStateParams<boolean>
) => {
  const idString = useIdString()
  const [value, setValue] = useControlledState({
    ...props
  })

  return (
    <CollapsibleContext.Provider value={{value, setValue, idString}}>
      {children}
    </CollapsibleContext.Provider>
  )
}

type CollapsibleTriggerProps = Omit<
  React.ComponentPropsWithoutRef<typeof P.BT>,
  'el'
> & {
  el?: React.ComponentPropsWithoutRef<typeof P.BT>['el']
  asChild?: boolean
  children: (({value}: {value: boolean}) => React.ReactNode) | React.ReactNode
}

const CollapsibleTrigger = React.forwardRef(
  (
    {el = 'button', asChild, children, ...props}: CollapsibleTriggerProps,
    forwardedRef
  ) => {
    const {value, setValue, idString} = React.useContext(CollapsibleContext)

    const Trigger = asChild ? Child : P.BT

    return (
      <Trigger
        el={el}
        onClick={() => {
          setValue(!value)
        }}
        onPress={() => {
          setValue(!value)
        }}
        type="button"
        onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            setValue(!value)
          }
        }}
        role="button"
        data-popover-state={value}
        aria-expanded={value}
        aria-controls={props['aria-controls'] || idString}
        {...props}
        ref={forwardedRef}
      >
        {typeof children === 'function' ? children({value}) : children}
      </Trigger>
    )
  }
)

type CollapsibleContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof P.BX>,
  'el'
> & {
  el?: React.ComponentPropsWithoutRef<typeof P.BX>['el']
  asChild?: boolean
  children: (({value}: {value: boolean}) => React.ReactNode) | React.ReactNode
}

const CollapsibleContent = React.forwardRef(
  (
    {el = 'div', asChild, children, ...props}: CollapsibleContentProps,
    forwardedRef
  ) => {
    const {value, idString} = React.useContext(CollapsibleContext)
    const Content = asChild ? Child : P.BX

    return (
      <Content
        el={el}
        role="region"
        id={props['id'] || idString}
        hidden={!value}
        {...props}
        ref={forwardedRef}
      >
        {typeof children === 'function' ? children({value}) : children}
      </Content>
    )
  }
)

Collapsible.Trigger = CollapsibleTrigger
Collapsible.Content = CollapsibleContent

export {Collapsible}

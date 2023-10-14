import {Child, Primitive} from '@interunit/primitives'
import {
  type UseControlledStateParams,
  useCombinedRefs,
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

const Collapsible = function Collapsible({
  children,
  ...props
}: CollapsibleProps & UseControlledStateParams<boolean>) {
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
  React.ComponentPropsWithRef<typeof Primitive.Button>,
  'el'
> & {
  el?: React.ComponentPropsWithRef<typeof Primitive.Button>['el']
  asChild?: boolean
}

const CollapsibleTrigger = React.forwardRef(function CollapsibleTrigger(
  {el = 'button', asChild, children, ...props}: CollapsibleTriggerProps,
  forwardedRef
) {
  const {value, setValue, idString} = React.useContext(CollapsibleContext)
  const combinedRef = useCombinedRefs(forwardedRef)

  const Trigger = asChild ? Child : Primitive.Button

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
      ref={combinedRef}
    >
      {children}
    </Trigger>
  )
}) as (props: CollapsibleTriggerProps) => JSX.Element

type CollapsibleContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof Primitive.Box>,
  'el'
> & {
  el?: React.ComponentPropsWithoutRef<typeof Primitive.Box>['el']
  asChild?: boolean
}

const CollapsibleContent = React.forwardRef(function CollapsibleContent(
  {el = 'div', asChild, children, ...props}: CollapsibleContentProps,
  forwardedRef
) {
  const combinedRef = useCombinedRefs(forwardedRef)
  const {value, idString} = React.useContext(CollapsibleContext)
  const Content = asChild ? Child : Primitive.Box

  return (
    <Content
      el={el}
      role="region"
      id={props['id'] || idString}
      hidden={!value}
      {...props}
      ref={combinedRef}
    >
      {children}
    </Content>
  )
}) as (props: CollapsibleContentProps) => JSX.Element

const CollapsibleNamespace = Object.assign(Collapsible, {
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent
})

export {CollapsibleNamespace as Collapsible}

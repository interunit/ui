import {useKeyboardNavigation} from '@interunit/a11y'
import {Child, P} from '@interunit/primitives'
import {
  type UseControlledStateParams,
  useCombinedRefs,
  useControlledState
} from '@interunit/toolbox'
import React from 'react'

type TabsProps = Omit<React.ComponentPropsWithoutRef<typeof P.BX>, 'el'> & {
  el?: React.ComponentPropsWithoutRef<typeof P.BX>['el']
  orientation?: 'horizontal' | 'vertical'
  asChild?: boolean
}

type TabsContextState<V> = {
  value: V
  setValue: (value: V) => void
}

const TabsContext = React.createContext<TabsContextState<any>>({
  value: undefined,
  setValue: () => {}
})

const Tabs = React.forwardRef(function Tabs<V>(
  {
    el = 'div',
    asChild,
    children,
    ...props
  }: TabsProps & UseControlledStateParams<V>,
  forwardedRef
) {
  const tabsContainerRef = React.useRef<typeof P.BX>(null)
  const combinedRefs = useCombinedRefs(tabsContainerRef, forwardedRef)
  const Box = asChild ? Child : P.BX

  const [value, setValue] = useControlledState({
    ...props
  } as UseControlledStateParams<V>)

  useKeyboardNavigation({
    // Force casting to HTMLElement because this
    // can only be used on web and not native
    ref: tabsContainerRef as unknown as React.RefObject<HTMLElement>,
    attribute: 'data-tab-trigger',
    onFocusChange: focusedElement => {
      const tabValue = focusedElement?.getAttribute('data-tab-value')
      if (tabValue) {
        setValue(tabValue as V)
      }
    }
  })

  return (
    <TabsContext.Provider value={{value, setValue} as TabsContextState<V>}>
      <Box el={el} {...props} ref={combinedRefs}>
        {children}
      </Box>
    </TabsContext.Provider>
  )
  // Need to cast so we can get the proper generic. React.forwardRef doesn't
  // allow for generics to be passed through without a hack like this.
}) as <V>(
  props: TabsProps & UseControlledStateParams<V>
) => React.ReactElement<TabsTriggerProps<V>>

type TabsTriggerListProps = Omit<
  React.ComponentPropsWithoutRef<typeof P.BX>,
  'el'
> & {
  el?: React.ComponentPropsWithoutRef<typeof P.BX>['el']
  asChild?: boolean
}

const TabsTriggerList = React.forwardRef(function TabsTriggerList(
  {el = 'div', asChild, children, ...props}: TabsTriggerListProps,
  forwardedRef: React.Ref<TabsTriggerListProps>
) {
  const TriggerList = asChild ? Child : P.BX
  return (
    <TriggerList el={el} role="tablist" ref={forwardedRef} {...props}>
      {children}
    </TriggerList>
  )
})

type TabsTriggerProps<V> = Omit<
  React.ComponentPropsWithoutRef<typeof P.BT>,
  'el' | 'value'
> & {
  el?: React.ComponentPropsWithoutRef<typeof P.BT>['el']
  // Would like to enforce this to be of the same type as the Tabs value
  // or check if it exists on a Tabs Content, but TS doesn't allow
  // for enforcing props on children in React as of now.
  //
  // See: https://github.com/microsoft/TypeScript/issues/21699
  value?: V
  asChild?: boolean
}

const TabsTrigger = React.forwardRef(function TabsTrigger<V>(
  {el = 'button', value, asChild, ...props}: TabsTriggerProps<V>,
  forwardedRef: React.Ref<TabsTriggerProps<V>>
) {
  const {value: currentValue, setValue} = React.useContext(TabsContext)
  const Button = asChild ? Child : P.BT

  return (
    <Button
      el={el}
      role="tab"
      data-tab-trigger
      data-tab-value={value}
      data-state={currentValue === value ? 'active' : 'inactive'}
      tabIndex={currentValue === value ? 0 : -1}
      aria-selected={currentValue === value}
      {...props}
      ref={forwardedRef}
      onClick={() => {
        setValue(value)
      }}
      onPress={() => {
        setValue(value)
      }}
    />
  )
})

type TabsContentProps<V> = Omit<
  React.ComponentPropsWithoutRef<typeof P.BX>,
  'el'
> & {
  // Would like to enforce this to be of the same type as the Tabs value
  // or check if it exists on a Tabs Trigger, but TS doesn't allow
  // for enforcing props on children in React as of now.
  //
  // See: https://github.com/microsoft/TypeScript/issues/21699
  value?: V
  el?: React.ComponentPropsWithoutRef<typeof P.BX>['el']
  asChild?: boolean
}

const TabsContent = React.forwardRef(function TabsContent<V>(
  {el = 'div', value, ...props}: TabsContentProps<V>,
  forwardedRef: React.Ref<TabsContentProps<V>>
) {
  const {value: currentValue, setValue} = React.useContext(TabsContext)
  const Content = props.asChild ? Child : P.BX

  return (
    <Content
      el={el}
      role="tabpanel"
      data-state={currentValue === value ? 'active' : 'inactive'}
      data-tab-content={value}
      hidden={currentValue !== value}
      {...props}
      ref={forwardedRef}
      tabIndex={0}
      onClick={() => {
        setValue(value)
      }}
    />
  )
})

const TabsNamespace = Object.assign(Tabs, {
  Trigger: TabsTrigger,
  TriggerList: TabsTriggerList,
  Content: TabsContent
})

export {TabsNamespace as Tabs}

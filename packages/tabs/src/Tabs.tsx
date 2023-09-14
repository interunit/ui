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
  value?: V
  setValue?: (value: V) => void
}

const TabsContext = React.createContext<TabsContextState<string>>({})

const Tabs = React.forwardRef(function Tabs(
  {
    el = 'div',
    asChild,
    children,
    ...props
  }: TabsProps & UseControlledStateParams<string>,
  forwardedRef
) {
  const tabsContainerRef = React.useRef<typeof P.BX>(null)
  const combinedRefs = useCombinedRefs(tabsContainerRef, forwardedRef)
  const Box = asChild ? Child : P.BX

  const [value, setValue] = useControlledState({
    value: props.value,
    defaultValue: props.defaultValue,
    onValueChange: props.onValueChange
  } as UseControlledStateParams<string>)

  useKeyboardNavigation({
    // Force casting to HTMLElement because this
    // can only be used on web and not native
    ref: tabsContainerRef as unknown as React.RefObject<HTMLElement>,
    attribute: 'data-tab-trigger',
    onFocusChange: focusedElement => {
      const tabValue = focusedElement?.getAttribute('data-tab-value')
      if (tabValue) {
        setValue && setValue(tabValue)
      }
    }
  })

  return (
    <TabsContext.Provider value={{value, setValue} as TabsContextState<string>}>
      <Box el={el} {...props} ref={combinedRefs}>
        {children}
      </Box>
    </TabsContext.Provider>
  )
})

type TabsTriggerListProps = Omit<
  React.ComponentPropsWithoutRef<typeof P.BX>,
  'el'
> & {
  el?: React.ComponentPropsWithoutRef<typeof P.BX>['el']
  asChild?: boolean
}

const TabsTriggerList = React.forwardRef(function TabsTriggerList(
  {el = 'div', asChild, ...props}: TabsTriggerListProps,
  forwardedRef: React.Ref<TabsTriggerListProps>
) {
  const TriggerList = asChild ? Child : P.BX
  return (
    <TriggerList el={el} role="tablist" ref={forwardedRef} {...props}>
      {props.children}
    </TriggerList>
  )
})

type TabsTriggerProps<V> = Omit<
  React.ComponentPropsWithoutRef<typeof P.BT>,
  'el' | 'value'
> & {
  el?: React.ComponentPropsWithoutRef<typeof P.BT>['el']
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
        setValue && setValue(value as string)
      }}
      onPress={() => {
        setValue && setValue(value as string)
      }}
    />
  )
})

type TabsContentProps<V> = Omit<
  React.ComponentPropsWithoutRef<typeof P.BX>,
  'el'
> & {
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
        setValue && setValue(value as string)
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

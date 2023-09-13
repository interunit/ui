import {useKeyboardNavigation} from '@interunit/a11y'
import {Child, P} from '@interunit/primitives'
import {
  type UseControlledStateParams,
  useControlledState
} from '@interunit/toolbox'
import React from 'react'

// Ideas:
// - Allow router to fully control state vs relying on controlled or uncotrolled state

type TabsProps<V> = Omit<React.ComponentPropsWithoutRef<typeof P.BX>, 'el'> &
  UseControlledStateParams<V> & {
    children?: React.ReactNode
    el?: React.ComponentPropsWithoutRef<typeof P.BX>['el']
    orientation?: 'horizontal' | 'vertical'
  }

type TabsContextState<V> = {
  value?: V
  setValue?: (value: V) => void
}

const TabsContext = React.createContext<TabsContextState<any>>({})

function combineRefs<T extends any>(...refs: Array<React.Ref<T>>) {
  return (value: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        ;(ref as React.MutableRefObject<T>).current = value
      }
    })
  }
}

const Tabs = React.forwardRef(function Tabs<V>(
  {el = 'div', children, ...props}: TabsProps<V>,
  forwardedRef: React.Ref<TabsProps<V>>
) {
  const tabsContainerRef = React.useRef<HTMLDivElement>(null)

  const [value, setValue] = useControlledState({
    value: props.value,
    defaultValue: props.defaultValue,
    onValueChange: props.onValueChange
  } as UseControlledStateParams<string>)

  useKeyboardNavigation({
    ref: tabsContainerRef,
    attribute: 'data-tab-trigger',
    onFocusChange: (focusedElement: HTMLElement) => {
      const tabValue = focusedElement.getAttribute('data-tab-value')
      if (tabValue) {
        setValue && setValue(tabValue as string)
      }
    }
  })

  return (
    <P.BX
      el={el}
      {...props}
      ref={combineRefs([tabsContainerRef, forwardedRef])}
      aria-orientation={props.orientation}
    >
      <TabsContext.Provider value={{value, setValue} as TabsContextState<V>}>
        {children}
      </TabsContext.Provider>
    </P.BX>
  )
})

type TabsTriggerListProps = Omit<
  React.ComponentPropsWithoutRef<typeof P.BX>,
  'el'
> & {
  el?: React.ComponentPropsWithoutRef<typeof P.BX>['el']
  children?: React.ReactNode
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
  children?: React.ReactNode
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
  children?: React.ReactNode
}

const TabsContent = React.forwardRef(function TabsContent<V>(
  {el = 'div', value, ...props}: TabsContentProps<V>,
  forwardedRef: React.Ref<TabsContentProps<V>>
): React.ReactElement<typeof P.BX> {
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

Tabs.Trigger = TabsTrigger
Tabs.TriggerList = TabsTriggerList
Tabs.Content = TabsContent

export {Tabs}

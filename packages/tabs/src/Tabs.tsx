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
    children: React.ReactNode
    el?: React.ComponentPropsWithoutRef<typeof P.BX>['el']
    orientation?: 'horizontal' | 'vertical'
  }

type TabsContextState<V> = {
  value?: V
  setValue?: (value: V) => void
}

const TabsContext = React.createContext<
  TabsContextState<any extends infer V ? V : never>
>({})

function Tabs<V>({el = 'div', ...props}: TabsProps<V>) {
  const tabsContainerRef = React.useRef<HTMLDivElement>(null)

  const [value, setValue] = useControlledState({
    value: props.value,
    defaultValue: props.defaultValue,
    onValueChange: props.onValueChange
  } as UseControlledStateParams<V>)

  useKeyboardNavigation({
    ref: tabsContainerRef,
    attribute: 'data-tab',
    onFocusChange: (focusedElement: HTMLElement) => {
      const tabValue = focusedElement.getAttribute('data-tab-value')
      if (tabValue) {
        setValue && setValue(tabValue as V)
      }
    }
  })

  return (
    <>
      <TabsContext.Provider value={{value, setValue} as TabsContextState<V>}>
        <P.BX
          el={el}
          {...props}
          ref={tabsContainerRef}
          aria-orientation={props.orientation}
        />
      </TabsContext.Provider>
    </>
  )
}

type TabsTriggerListProps = Omit<
  React.ComponentPropsWithoutRef<typeof P.BX>,
  'el'
> & {
  el?: React.ComponentPropsWithoutRef<typeof P.BX>['el']
  children?: React.ReactNode
  asChild?: boolean
}

const TabsTriggerList = React.forwardRef(function TabsTriggerList(
  props: TabsTriggerListProps,
  forwardedRef: React.Ref<TabsTriggerListProps>
) {
  const TriggerList = props.asChild ? Child : P.BX
  return (
    <TriggerList el="div" role="tablist" ref={forwardedRef} {...props}>
      {props.children}
    </TriggerList>
  )
})

type TabsTriggerProps<T> = Omit<
  React.ComponentPropsWithoutRef<typeof P.BT>,
  'el'
> & {
  el?: React.ComponentPropsWithoutRef<typeof P.BT>['el']
  value?: T
  children?: React.ReactNode
  asChild?: boolean
}

const TabsTrigger: React.FC<TabsTriggerProps<unknown>> = React.forwardRef(
  function TabsTrigger<V>(
    {el = 'button', value, ...props}: TabsTriggerProps<V>,
    forwardedRef: React.Ref<TabsTriggerProps<V>>
  ) {
    const {value: currentValue, setValue} = React.useContext(TabsContext)
    const Button = props.asChild ? Child : P.BT

    return (
      <Button
        el={el}
        role="tab"
        data-tab
        data-tab-value={value}
        data-state={currentValue === value ? 'active' : 'inactive'}
        aria-selected={currentValue === value}
        {...props}
        ref={forwardedRef}
        onClick={() => {
          setValue && setValue(value)
        }}
        onPress={() => {
          setValue && setValue(value)
        }}
      />
    )
  }
)

type TabsContentProps<T> = Omit<
  React.ComponentPropsWithoutRef<typeof P.BX>,
  'el'
> & {
  value?: T
  el?: React.ComponentPropsWithoutRef<typeof P.BX>['el']
  asChild?: boolean
  children?: React.ReactNode
}

const TabsContent: React.FC<TabsContentProps<unknown>> = React.forwardRef(
  function TabsContent<V>(
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
        onClick={() => {
          setValue && setValue(value)
        }}
      />
    )
  }
)

Tabs.Trigger = TabsTrigger
Tabs.TriggerList = TabsTriggerList
Tabs.Content = TabsContent

export {Tabs}

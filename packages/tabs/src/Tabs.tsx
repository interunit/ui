import {useKeyboardNavigation} from '@interunit/a11y'
import {Child, P} from '@interunit/primitives'
import {
  type UseControlledStateParams,
  useControlledState
} from '@interunit/toolbox'
import React from 'react'

// Ideas:
// - Allow router to fully control state vs relying on controlled or uncotrolled state

type TabsProps<V> = React.ComponentPropsWithoutRef<typeof P.BX> &
  UseControlledStateParams<V> & {
    children: React.ReactNode
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

type TabsTriggerProps<T> = React.ComponentPropsWithoutRef<typeof P.BT> & {
  value?: T
  children?: React.ReactNode
  asChild?: boolean
}

const TabsTrigger: React.FC<TabsTriggerProps<unknown>> = function TabsTrigger<
  V
>({el = 'button', value, ...props}: TabsTriggerProps<V>) {
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
      onClick={() => {
        setValue && setValue(value)
      }}
    />
  )
}

type TabsContentProps<T> = {
  value?: T
  asChild?: boolean
  children?: React.ReactNode
} & React.ComponentPropsWithoutRef<typeof P.BX>

const TabsContent: React.FC<TabsContentProps<unknown>> = function TabsContent<
  V
>({
  el = 'div',
  value,
  ...props
}: TabsContentProps<V>): React.ReactElement<typeof P.BX> {
  const {value: currentValue, setValue} = React.useContext(TabsContext)
  const Content = props.asChild ? Child : P.BX

  return (
    <Content
      el={el}
      role="tabpanel"
      data-state={currentValue === value ? 'active' : 'inactive'}
      hidden={currentValue !== value}
      {...props}
      onClick={() => {
        setValue && setValue(value)
      }}
    />
  )
}

Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent

export {Tabs}

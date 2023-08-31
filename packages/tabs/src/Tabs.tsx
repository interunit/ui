import {P} from '@interunit/primitives'
import {
  type UseControlledStateParams,
  useControlledState
} from '@interunit/toolbox'
import React from 'react'

// Ideas:
// - Allow router to fully control state vs relying on controlled or uncotrolled state
//
// Todo:
// - Add keyboard navigation
// - Add focus management
// - Add asChild support for Trigger and Content

type TabsProps<V> = React.ComponentPropsWithoutRef<typeof P.BX> &
  UseControlledStateParams<V> & {
    children: React.ReactNode
  }

type TabsContextState<V> = {
  value?: V
  setValue?: (value: V) => void
}

const TabsContext = React.createContext<
  TabsContextState<any extends infer V ? V : never>
>({})

function Tabs<V>({el = 'div', ...props}: TabsProps<V>) {
  const [value, setValue] = useControlledState({
    value: props.value,
    defaultValue: props.defaultValue,
    onValueChange: props.onValueChange
  } as UseControlledStateParams<V>)

  return (
    <>
      <TabsContext.Provider value={{value, setValue} as TabsContextState<V>}>
        <P.BX el={el} {...props} />
      </TabsContext.Provider>
    </>
  )
}

type TabsTriggerProps<T> = React.ComponentPropsWithoutRef<typeof P.BT> & {
  value?: T
  children?: React.ReactNode
}

function TabsTrigger<V>({el = 'button', value, ...props}: TabsTriggerProps<V>) {
  const {value: currentValue, setValue} = React.useContext(TabsContext)

  return (
    <P.BT
      el={el}
      role="tab"
      data-state={currentValue === value ? 'active' : 'inactive'}
      aria-selected={currentValue === value}
      {...props}
      onClick={() => {
        setValue && setValue(value)
      }}
    />
  )
}

type TabsContentProps<T> = React.ComponentPropsWithoutRef<typeof P.BX> & {
  value?: T
  children?: React.ReactNode
}

function TabsContent<V>({el = 'div', value, ...props}: TabsContentProps<V>) {
  const {value: currentValue, setValue} = React.useContext(TabsContext)
  console.log(value, currentValue)

  return (
    <P.BX
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

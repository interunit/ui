import {Popover} from '@interunit/popover'
import {Child, Primitive} from '@interunit/primitives'
import {
  type UseControlledStateParams,
  useCombinedRefs,
  useControlledState,
  useIdString
} from '@interunit/toolbox'
import React from 'react'

type ComboboxProps = Omit<
  React.ComponentPropsWithoutRef<typeof Popover>,
  'value' | 'onValueChange' | 'defaultValue'
> & {
  children: React.ReactNode
  defaultIsOpen?: boolean
}

type HandleVisualFocusChangeParams = {
  direction: 'up' | 'down'
}

type ComboboxContextState<V> = {
  value: V
  setValue: (value: V) => void
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  idString: string
  visuallyFocusedItem: string
  setVisuallyFocusedItem: (value: string) => void
  handleVisualFocusChange: (value: HandleVisualFocusChangeParams) => void
}

const ComboboxContext = React.createContext<ComboboxContextState<any>>({
  value: undefined,
  setValue: () => {},
  isOpen: false,
  setIsOpen: () => {},
  idString: '',
  visuallyFocusedItem: '',
  setVisuallyFocusedItem: () => {},
  handleVisualFocusChange: () => {}
})

const Combobox = React.forwardRef(function Combobox<V>(
  {
    value: propsValue,
    onValueChange,
    defaultValue,
    defaultIsOpen,
    children,
    ...props
  }: ComboboxProps & UseControlledStateParams<V>,
  forwardedRef
) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  const [value, setValue] = useControlledState({
    value: propsValue,
    defaultValue,
    onValueChange
  } as UseControlledStateParams<V>)

  const [visuallyFocusedItem, setVisuallyFocusedItem] = React.useState(
    value as string
  )

  const ref = useCombinedRefs(containerRef, forwardedRef)

  const [isOpen, setIsOpen] = useControlledState({
    defaultValue: !!defaultIsOpen,
    value: undefined,
    onValueChange: undefined
  }) as [boolean, (value: boolean) => void]

  const idString = useIdString()

  function handleVisualFocusChange({direction}: HandleVisualFocusChangeParams) {
    const items = containerRef.current?.querySelectorAll(`[data-combobox-item]`)

    if (!items) return

    const itemValues = Array.from(items).map(item =>
      item.getAttribute('data-combobox-item-value')
    )

    const indexOfFocusedItem = itemValues.indexOf(visuallyFocusedItem)

    if (direction === 'up') {
      const nextIndex =
        indexOfFocusedItem - 1 !== -1 ? indexOfFocusedItem - 1 : 0
      const nextItem = itemValues[nextIndex]

      if (nextItem) setVisuallyFocusedItem(nextItem)
    }

    if (direction === 'down') {
      const nextIndex =
        indexOfFocusedItem + 1 !== itemValues.length
          ? indexOfFocusedItem + 1
          : itemValues.length - 1
      const nextItem = itemValues[nextIndex]
      if (nextItem) setVisuallyFocusedItem(nextItem)
    }
  }

  return (
    <ComboboxContext.Provider
      value={{
        value,
        setValue,
        isOpen,
        setIsOpen,
        idString,
        visuallyFocusedItem,
        setVisuallyFocusedItem,
        handleVisualFocusChange
      }}
    >
      <Popover
        value={isOpen}
        onValueChange={setIsOpen}
        aria-orientation="vertical"
        {...props}
        ref={ref}
      >
        {children}
      </Popover>
    </ComboboxContext.Provider>
  )
})

type ComboboxTriggerProps = React.ComponentPropsWithRef<
  typeof Popover.Trigger
> & {
  asChild?: boolean
}

const ComoboxTrigger = React.forwardRef(function ComoboxTrigger(
  {...props}: ComboboxTriggerProps,
  forwardedRef
) {
  const ref = useCombinedRefs(forwardedRef)
  const {
    visuallyFocusedItem,
    setValue,
    idString,
    isOpen,
    setIsOpen,
    handleVisualFocusChange
  } = React.useContext(ComboboxContext)

  return (
    <Popover.Trigger
      ref={ref}
      onKeyDown={event => {
        if (isOpen && event.key === 'ArrowDown') {
          event.preventDefault()
          handleVisualFocusChange({direction: 'down'})
        }
        if (isOpen && event.key === 'ArrowUp') {
          event.preventDefault()
          handleVisualFocusChange({direction: 'up'})
        }

        if (!isOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
          event.preventDefault()
          setIsOpen(true)
        }

        if (isOpen && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault()
          setValue(visuallyFocusedItem)
          setIsOpen(false)
        }
      }}
      onBlur={() => {
        setIsOpen(false)
      }}
      aria-controls={idString}
      {...props}
    />
  )
})

type ComboboxContentProps = React.ComponentPropsWithRef<typeof Popover.Content>

const ComoboxContent = React.forwardRef(function ComoboxContent(
  props: ComboboxContentProps,
  forwardedRef
) {
  const ref = useCombinedRefs(forwardedRef)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return <Popover.Content role="listbox" {...props} ref={ref} />
})

type ComboboxLabelProps = Omit<
  React.ComponentPropsWithRef<typeof Primitive.Text<'label'>>,
  'el'
> & {
  asChild?: boolean
}

const ComboboxLabel = React.forwardRef(function ComboboxLabel(
  {asChild, ...props}: ComboboxLabelProps,
  forwardedRef
) {
  const {idString} = React.useContext(ComboboxContext)
  const Label = asChild ? Child : Primitive.Text
  const ref = useCombinedRefs(forwardedRef)
  return <Label el="label" htmlFor={idString} {...props} ref={ref} />
})

type ComboboxListProps = Omit<
  React.ComponentPropsWithRef<typeof Primitive.Box>,
  'el'
> & {
  el?: React.ComponentPropsWithRef<typeof Primitive.Box>['el']
}

const ComboboxList = React.forwardRef(function ComboboxList(
  {el = 'div', ...props}: ComboboxListProps,
  forwardedRef
) {
  const ref = useCombinedRefs(forwardedRef)
  return <Primitive.Box el={el} {...props} ref={ref} />
})

type ComboboxItemProps = Omit<
  React.ComponentPropsWithRef<typeof Primitive.Button>,
  'el'
> & {
  el?: React.ComponentPropsWithRef<typeof Primitive.Button>['el']
  asChild?: boolean
}

const ComboboxItem = React.forwardRef(function ComboboxItem(
  {asChild, ...props}: ComboboxItemProps,
  forwardedRef
) {
  const ref = useCombinedRefs(forwardedRef)
  const {
    visuallyFocusedItem,
    value,
    setValue,
    setIsOpen,
    setVisuallyFocusedItem
  } = React.useContext(ComboboxContext)
  const Item = asChild ? Child : Primitive.Button
  return (
    <Item
      ref={ref}
      data-combobox-item
      data-combobox-item-value={props.value}
      role="option"
      aria-focused={visuallyFocusedItem === props.value}
      aria-selected={value === props.value}
      tabIndex={-1}
      onMouseDown={() => {
        setValue(props.value)
        setVisuallyFocusedItem(props.value as string)
        setIsOpen(false)
      }}
      onPress={() => {
        setValue(props.value)
        setVisuallyFocusedItem(props.value as string)
        setIsOpen(false)
      }}
      {...props}
    />
  )
})

const ComboboxNamespace = Object.assign(Combobox, {
  Trigger: ComoboxTrigger,
  Content: ComoboxContent,
  Label: ComboboxLabel,
  List: ComboboxList,
  Item: ComboboxItem
})

export {ComboboxNamespace as Combobox}

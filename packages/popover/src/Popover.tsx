import {isTouchDevice, useOutsideClick} from '@interunit/a11y'
import {getEnvironmentName} from '@interunit/config'
import {platformCSSUnitTranslation} from '@interunit/crossplatform'
import {Modal} from '@interunit/modal'
import {Child, P} from '@interunit/primitives'
import {
  type UseControlledStateParams,
  useCombinedRefs, // useIdString
  useControlledState
} from '@interunit/toolbox'
import React from 'react'

import {
  type PopoverArrow,
  type PopoverPositioning,
  useContentPositioning
} from './hooks/useContentPositioning'

const ENVIRONMENT = getEnvironmentName()

type Dimensions = {
  x: number
  y: number
  height: number
  width: number
}

type PopoverContextState = {
  value?: boolean
  setValue: (value: boolean) => void
  focusType: 'none' | 'default'
  triggerRef?: React.ReactElement | null
  contentRef?: React.ReactElement | null
  setTriggerRef: ((trigger: React.ReactElement | null) => void) | null
  setContentRef: ((content: React.ReactElement | null) => void) | null
  triggerDimensions: Dimensions
  contentDimensions: Dimensions
  popoverDimensions: Dimensions
  setPopoverDimensions: (dimensions: Dimensions) => void
  setTriggerDimensions: (dimensions: Dimensions) => void
  setContentDimensions: (dimensions: Dimensions) => void
  triggerInteraction: 'click' | 'hover' | 'none'
  setTriggerInteraction: (type: 'click' | 'hover' | 'none') => void
  popoverRef: React.ReactElement | null
}

const PopoverContext = React.createContext<PopoverContextState>({
  value: false,
  setValue: () => {},
  focusType: 'none',
  triggerRef: null,
  contentRef: null,
  setTriggerRef: () => {},
  setContentRef: () => {},
  triggerDimensions: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  contentDimensions: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  popoverDimensions: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  setTriggerDimensions: () => {},
  setContentDimensions: () => {},
  setPopoverDimensions: () => {},
  triggerInteraction: 'click',
  setTriggerInteraction: () => {},
  popoverRef: null
})

type PopoverProps = Omit<
  React.ComponentPropsWithRef<typeof P.BX>,
  'el' | 'defaultValue' | 'value' | 'onValueChange'
> & {
  el?: React.ComponentPropsWithoutRef<typeof P.BX>['el']
  asChild?: boolean
  focusType?: 'none' | 'default'
  shouldCloseOnOutsideClick?: boolean
}

const Popover = React.forwardRef(function Popover(
  {
    el = 'div',
    focusType = 'none',
    value: propValue,
    defaultValue,
    onValueChange,
    asChild,
    shouldCloseOnOutsideClick = true,
    children,
    ...props
  }: PopoverProps & UseControlledStateParams<boolean>,
  forwardedRef
) {
  const [value, setValue] = useControlledState<boolean>({
    value: propValue,
    onValueChange,
    defaultValue
  } as UseControlledStateParams<boolean>)

  const [triggerRef, setTriggerRef] = React.useState<React.ReactElement | null>(
    null
  )
  const [contentRef, setContentRef] = React.useState<React.ReactElement | null>(
    null
  )
  const [popoverRef, setPopoverRef] = React.useState<React.ReactElement | null>(
    null
  )
  const [triggerInteraction, setTriggerInteraction] = React.useState<
    'click' | 'hover' | 'none'
  >('click')
  const [triggerDimensions, setTriggerDimensions] = React.useState<Dimensions>({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  })
  const [contentDimensions, setContentDimensions] = React.useState<Dimensions>({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  })
  const [popoverDimensions, setPopoverDimensions] = React.useState<Dimensions>({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  })

  const combinedRefs = useCombinedRefs(setPopoverRef, forwardedRef)

  useOutsideClick({
    ref: popoverRef,
    fn: () => setValue(false),
    isEnabled: shouldCloseOnOutsideClick
  })

  React.useEffect(() => {
    const PopoverElement = popoverRef as unknown as HTMLElement

    if (PopoverElement && ENVIRONMENT === 'web') {
      if (!PopoverElement?.getBoundingClientRect) return
      const clientRect = PopoverElement.getBoundingClientRect()
      const dimensions = {
        x: clientRect.x,
        y: clientRect.y,
        width: clientRect.width,
        height: clientRect.height
      }

      setPopoverDimensions(dimensions)
    }
  }, [popoverRef])

  const Box = asChild ? Child : P.BX

  return (
    <PopoverContext.Provider
      value={{
        value,
        setValue,
        focusType,
        triggerRef,
        setTriggerRef,
        contentRef,
        setContentRef,
        triggerDimensions,
        setTriggerDimensions,
        contentDimensions,
        setContentDimensions,
        popoverDimensions,
        setPopoverDimensions,
        popoverRef,
        triggerInteraction,
        setTriggerInteraction
      }}
    >
      <Box
        el={el}
        collapsable={false}
        {...props}
        ref={combinedRefs}
        onLayout={(e: {nativeEvent: {layout: Dimensions}}) => {
          if (e?.nativeEvent?.layout) {
            setPopoverDimensions(e.nativeEvent.layout)
          }
        }}
        onMouseLeave={() => {
          if (triggerInteraction === 'none') return

          if (triggerInteraction === 'hover' && ENVIRONMENT === 'web') {
            setValue(false)
          }
        }}
      >
        {children}
      </Box>
    </PopoverContext.Provider>
  )
}) as (
  props: PopoverProps & UseControlledStateParams<boolean>
) => React.ReactElement<PopoverProps>

type PopoverTriggerProps = Omit<
  React.ComponentPropsWithoutRef<typeof P.BT>,
  'el'
> & {
  el?: React.ComponentPropsWithoutRef<typeof P.BT>['el']
  interaction?: 'click' | 'hover' | 'none'
  asChild?: boolean
  children: (({value}: {value: boolean}) => React.ReactNode) | React.ReactNode
}

const PopoverTrigger = React.forwardRef(
  (
    {
      el = 'button',
      interaction = 'click',
      asChild,
      children,
      ...props
    }: PopoverTriggerProps,
    forwardedRef
  ) => {
    const Button = asChild ? Child : P.BT
    const {
      value,
      setValue,
      triggerRef,
      setTriggerRef,
      setTriggerDimensions,
      triggerInteraction,
      setTriggerInteraction
    } = React.useContext(PopoverContext)

    // TODO: Test this works
    const combinedRefs = useCombinedRefs(setTriggerRef, forwardedRef)

    // Better way to do this?
    React.useEffect(() => {
      setTriggerInteraction(interaction)
    }, [interaction])

    React.useEffect(() => {
      const TriggerElement = triggerRef as unknown as HTMLElement

      if (TriggerElement && ENVIRONMENT === 'web') {
        if (!TriggerElement?.getBoundingClientRect) return
        const clientRect = TriggerElement.getBoundingClientRect()
        const dimensions = {
          x: clientRect.x,
          y: clientRect.y,
          width: clientRect.width,
          height: clientRect.height
        }

        setTriggerDimensions(dimensions)
      }
    }, [triggerRef])

    return (
      <Button
        el={el}
        onPress={() => {
          setValue(!value)
        }}
        onClick={() => {
          if (triggerInteraction === 'none') return

          if (
            triggerInteraction === 'click' ||
            (triggerInteraction === 'hover' && isTouchDevice())
          ) {
            setValue(!value)
          }
        }}
        onMouseEnter={() => {
          if (triggerInteraction === 'none') return

          if (triggerInteraction === 'hover' && ENVIRONMENT === 'web') {
            setValue(true)
          }
        }}
        onKeyDown={event => {
          if (event.key === 'Escape') {
            setValue(false)
          }
        }}
        onLayout={(e: {nativeEvent: {layout: Dimensions}}) => {
          if (e?.nativeEvent?.layout) {
            setTriggerDimensions(e.nativeEvent.layout)
          }
        }}
        ref={combinedRefs}
        collapsable={false}
        data-popover-trigger
        data-popover-state={value}
        {...props}
      >
        {children}
      </Button>
    )
  }
)
type PopoverContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof P.BX<'div'>>,
  'el'
> & {
  el?: React.ComponentPropsWithoutRef<typeof P.BX<'div'>>['el']
  asChild?: boolean
  positioning?: PopoverPositioning
  arrow?: PopoverArrow
  children: (({value}: {value: boolean}) => React.ReactNode) | React.ReactNode
}

// Handle outside click passing here
const PopoverContent = React.forwardRef(
  (
    {
      el = 'div',
      asChild,
      positioning,
      arrow,
      children,
      className,
      ...props
    }: PopoverContentProps,
    forwardedRef
  ) => {
    const Box = asChild ? P.BX : Child
    const {
      value,
      triggerRef,
      contentRef,
      setContentRef,
      contentDimensions,
      setContentDimensions,
      triggerDimensions,
      popoverDimensions,
      focusType
    } = React.useContext(PopoverContext)

    const userDefinedArrowStyle = arrow?.style ?? {}

    const combinedRefs = useCombinedRefs(setContentRef, forwardedRef)

    const {positioningStyles, arrowStyles} = useContentPositioning({
      trigger: triggerRef,
      content: contentRef,
      positioning,
      arrow,
      nativeTriggerDimensions: triggerDimensions,
      nativeContentDimensions: contentDimensions,
      nativePopoverDimensions: popoverDimensions
    })

    return (
      <Modal
        ref={combinedRefs}
        style={{
          maxWidth: positioning?.maxWidth ?? 'auto',
          width:
            positioning?.width === 'trigger'
              ? `${triggerDimensions?.width}px`
              : positioning?.width
              ? positioning.width
              : 'auto',
          zIndex: positioning?.zIndex ?? 1,
          ...positioningStyles
        }}
        hidden={!value}
        className={`iu-popover-content ${className}`}
        focusType={focusType}
        onLayout={(e: {nativeEvent: {layout: Dimensions}}) => {
          if (e?.nativeEvent?.layout) {
            setContentDimensions(e.nativeEvent.layout)
          }
        }}
        data-popover-content
        data-popover-state={value}
        data-popover-side={positioning?.side}
        data-popover-align={positioning?.align}
        aria-hidden={!value}
        {...props}
      >
        <>
          {children}
          <Box
            el={el}
            className={`iu-popover-arrow ${arrow?.className}`}
            aria-hidden={true}
            style={{
              ...arrowStyles,
              ...(userDefinedArrowStyle as any)
            }}
          />
          {/* Hover Helper */}
          <P.BX
            el="span"
            style={{
              position: 'absolute',
              height: `${platformCSSUnitTranslation(
                positioning?.offset ?? 0,
                'native'
              )}px`,
              top: `-${platformCSSUnitTranslation(
                positioning?.offset ?? 0,
                'native'
              )}px`,

              width: '100%'
            }}
          />
        </>
      </Modal>
    )
  }
)

const PopoverNamespace = Object.assign(Popover, {
  Trigger: PopoverTrigger,
  Content: PopoverContent
})

export {PopoverNamespace as Popover}

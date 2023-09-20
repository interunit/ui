import {isTouchDevice, useOutsideClick} from '@interunit/a11y'
import {getEnvironmentName} from '@interunit/config'
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
  value: boolean
  setValue: (value: boolean) => void
  focusType: 'none' | 'default'
  triggerRef?: React.ReactElement | null
  contentRef?: React.ReactElement | null
  setTriggerRef: ((trigger: React.ReactElement | null) => void) | null
  setContentRef: ((content: React.ReactElement | null) => void) | null
  triggerDimensions: Dimensions
  contentDimensions: Dimensions
  setTriggerDimensions: (dimensions: Dimensions) => void
  setContentDimensions: (dimensions: Dimensions) => void
  triggerInteraction: 'click' | 'hover'
  setTriggerInteraction: (type: 'click' | 'hover') => void
  popoverRef: React.RefObject<typeof P.BX>
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
  setTriggerDimensions: () => {},
  setContentDimensions: () => {},
  triggerInteraction: 'click',
  setTriggerInteraction: () => {},
  popoverRef: React.createRef()
})

type PopoverProps = Omit<
  React.ComponentPropsWithoutRef<typeof P.BX>,
  'el' | 'defaultValue'
> & {
  el?: React.ComponentPropsWithoutRef<typeof P.BX>['el']
  asChild?: boolean
  focusType?: 'none' | 'default'
}

const Popover = React.forwardRef(function Popover(
  {
    el = 'div',
    focusType = 'none',
    asChild,
    children,
    ...props
  }: PopoverProps & UseControlledStateParams<boolean>,
  forwardedRef
) {
  const [value, setValue] = useControlledState<boolean>({...props})
  const popoverRef = React.useRef(null)
  const combinedRefs = useCombinedRefs(popoverRef, forwardedRef)

  const [triggerRef, setTriggerRef] = React.useState<React.ReactElement | null>(
    null
  )
  const [contentRef, setContentRef] = React.useState<React.ReactElement | null>(
    null
  )
  const [triggerInteraction, setTriggerInteraction] = React.useState<
    'click' | 'hover'
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

  useOutsideClick({
    ref: popoverRef,
    fn: () => setValue(false)
    // isEnabled: settings?.shouldCloseOnInteractOutside && value
  })

  const display = (ENVIRONMENT === 'web' ? 'inline-block' : 'flex') as 'flex'

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
        popoverRef,
        triggerInteraction,
        setTriggerInteraction
      }}
    >
      <Box
        el={el}
        style={{position: 'relative', overflow: 'visible', display}}
        collapsable={false}
        ref={combinedRefs}
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
  interaction?: 'click' | 'hover'
  asChild?: boolean
  children: (({value}: {value: boolean}) => React.ReactNode) | React.ReactNode
}

const PopoverTrigger = React.forwardRef(
  (
    {
      el = 'button',
      interaction = 'click',
      asChild,
      children
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
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          event.preventDefault()
          if (
            triggerInteraction === 'click' ||
            (triggerInteraction === 'hover' && isTouchDevice())
          ) {
            setValue(!value)
          }
        }}
        onMouseEnter={() => {
          if (triggerInteraction === 'hover' && ENVIRONMENT === 'web') {
            setValue(true)
          }
        }}
        onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
          if (event.key === 'Enter') {
            setValue(!value)
          }

          if (event.key === 'Escape') {
            setValue(false)
          }
        }}
        onLayout={(e: {nativeEvent: {layout: Dimensions}}) => {
          setTriggerDimensions(e.nativeEvent.layout)
        }}
        ref={combinedRefs}
        collapsable={false}
        data-popover-state={value}
      >
        {typeof children === 'function' ? children({value}) : children}
      </Button>
    )
  }
)
type PopoverContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof P.BX>,
  'el'
> & {
  el?: React.ComponentPropsWithoutRef<typeof P.BX>['el']
  asChild?: boolean
  positioning?: PopoverPositioning
  arrow?: PopoverArrow
  children: (({value}: {value: boolean}) => React.ReactNode) | React.ReactNode
}
// Handle outside click passing here
const PopoverContent = React.forwardRef(
  (
    {el = 'div', asChild, positioning, arrow, children}: PopoverContentProps,
    forwardedRef
  ) => {
    const Box = asChild ? P.BX : Child
    const {
      value,
      setValue,
      triggerRef,
      contentRef,
      setContentRef,
      contentDimensions,
      setContentDimensions,
      triggerDimensions,
      triggerInteraction,
      focusType
    } = React.useContext(PopoverContext)

    const userDefinedArrowStyle = arrow?.style || {}

    const combinedRefs = useCombinedRefs(setContentRef, forwardedRef)

    const {positioningStyles, arrowStyles} = useContentPositioning({
      trigger: triggerRef,
      content: contentRef,
      positioning,
      arrow,
      nativeTriggerDimensions: triggerDimensions,
      nativeContentDimensions: contentDimensions
    })

    if (value && triggerRef) {
      return (
        <Modal
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
          className="iu-popover-content"
          onMouseLeave={() => {
            if (triggerInteraction === 'hover' && ENVIRONMENT === 'web') {
              setValue(false)
            }
          }}
          onKeyDown={(_event: unknown) => {
            const event = _event as KeyboardEvent

            if (event.key === 'Escape') {
              setValue(false)
            }
          }}
          onClose={() => setValue(false)}
          focusType={focusType}
          onLayout={(e: {nativeEvent: {layout: Dimensions}}) => {
            setContentDimensions(e.nativeEvent.layout)
          }}
          data-popover-state={value}
          data-popover-side={positioning?.side}
          data-popover-align={positioning?.align}
          ref={combinedRefs}
        >
          <>
            {typeof children === 'function' ? children({value}) : children}
            <Box
              el={el}
              className={`iu-popover-arrow ${arrow?.className}`}
              aria-hidden={true}
              style={{
                ...arrowStyles,
                ...userDefinedArrowStyle
              }}
            />
          </>
        </Modal>
      )
    }

    return <></>
  }
)

const PopoverNamespace = Object.assign(Popover, {
  Trigger: PopoverTrigger,
  Content: PopoverContent
})

export {PopoverNamespace as Popover}

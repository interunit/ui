import {InterUnitInternals} from '@interunit/config'
import {type P} from '@interunit/primitives'
import {type WithRequired} from '@interunit/toolbox'
import React from 'react'

const ENVIRONMENT = InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT.NAME

type Dimensions = {
  x: number
  y: number
  width: number
  height: number
}

type PrimitiveBoxProps = WithRequired<
  React.ComponentProps<typeof P.BX>,
  'style'
>

export type PopoverPositioning = {
  side?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'end'
  offset?: number
  width?: 'trigger' | string | number
  maxWidth?: number | string
  zIndex?: number
  arrow?: {
    width?: number
    borderRadius?: number
    strokeColor?: string
    fillColor?: string
    strokeWidth?: number
    style?: PrimitiveBoxProps['style']
    className?: PrimitiveBoxProps['className']
  }
}

export const useContentPositioning = ({
  trigger,
  positioning: _positioning
}: {
  trigger: React.ReactElement | undefined | null
  positioning: PopoverPositioning | undefined
}) => {
  const positioning = {
    offset: 0,
    ..._positioning
  }
  const [arrowStyles, setArrowStyles] = React.useState<
    PrimitiveBoxProps['style']
  >({})

  const [positioningStyles, setPositioningStyles] = React.useState<
    PrimitiveBoxProps['style']
  >({})

  const getTriggerDimensions = ({trigger}: {trigger: React.ReactElement}) => {
    if (ENVIRONMENT === 'web') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!trigger?.getBoundingClientRect) return

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const clientRect = trigger.getBoundingClientRect()

      const dimensions = {
        x: clientRect.x,
        y: clientRect.y,
        width: clientRect.width,
        height: clientRect.height
      }

      return dimensions
    }

    // TODO: Get these on Native
  }

  const getPositioningStyles = ({
    triggerDimensions
  }: {
    triggerDimensions: Dimensions
  }) => {
    const styles: React.CSSProperties = {
      position: 'absolute',
      height: 'auto',
      zIndex: positioning.zIndex || 2,
      width:
        positioning.width === 'trigger'
          ? triggerDimensions.width
          : positioning.width || 'auto'
    }

    if (positioning.side === 'top') {
      styles.bottom = triggerDimensions.height + positioning.offset
    }

    if (positioning.side === 'bottom') {
      styles.top = triggerDimensions.height + positioning.offset
    }

    if (positioning.side === 'left') {
      styles.right = triggerDimensions.width + positioning.offset
      styles.top = 0
    }

    if (positioning.side === 'right') {
      styles.left = triggerDimensions.width + positioning.offset
      styles.top = 0
    }

    if (positioning.side === 'top' || positioning.side === 'bottom') {
      if (positioning.align === 'start') {
        styles.left = 0
      }

      if (positioning.align === 'end') {
        styles.right = 0
      }
    }

    if (positioning.side === 'left' || positioning.side === 'right') {
      if (positioning.align === 'start') {
        styles.top = 0
      }

      if (positioning.align === 'end') {
        styles.top = 'auto'
        styles.bottom = 0
      }
    }

    return styles
  }

  const getArrowStyles = ({
    triggerDimensions
  }: {
    triggerDimensions: Dimensions
  }) => {
    const DEFAULT_ARROW_WIDTH = 5
    const DEFAULT_ARROW_STROKE_WIDTH = 0
    const arrowWidth = positioning?.arrow?.width || DEFAULT_ARROW_WIDTH
    const arrowStrokeWidth =
      positioning?.arrow?.strokeWidth || DEFAULT_ARROW_STROKE_WIDTH

    const arrowStyles: PrimitiveBoxProps['style'] = {
      height: `${arrowWidth}px`,
      width: `${arrowWidth}px`,
      position: 'absolute',
      borderColor: positioning?.arrow?.strokeColor || 'transparent',
      backgroundColor: positioning?.arrow?.fillColor || 'transparent',
      borderWidth: `${arrowStrokeWidth}px`,
      borderStyle: 'solid',
      borderTopLeftRadius: positioning?.arrow?.borderRadius || 0,
      borderBottom: 'none',
      borderRight: 'none',
      transform: 'rotate(45deg)',
      zIndex: (positioning?.zIndex || 2) + 1
    }

    if (positioning.side === 'bottom') {
      arrowStyles.top = -(arrowWidth / 2)
      arrowStyles.left = (triggerDimensions.width - arrowWidth) / 2
    }
    if (positioning.side === 'top') {
      arrowStyles.bottom = -(arrowWidth / 2)
      arrowStyles.left = (triggerDimensions.width - arrowWidth) / 2
      arrowStyles.transform = 'rotate(225deg)'
    }

    if (positioning.side === 'left') {
      arrowStyles.right = -(arrowWidth / 2)
      arrowStyles.top = (triggerDimensions.height - arrowWidth) / 2
      arrowStyles.transform = 'rotate(135deg)'
    }

    if (positioning.side === 'right') {
      arrowStyles.left = -(arrowWidth / 2)
      arrowStyles.top = (triggerDimensions.height - arrowWidth) / 2
      arrowStyles.transform = 'rotate(315deg)'
    }

    if (positioning.side === 'top' || positioning.side === 'bottom') {
      if (positioning.align === 'start') {
        arrowStyles.left = (triggerDimensions.width - arrowWidth) / 2
      }

      if (positioning.align === 'end') {
        arrowStyles.right = (triggerDimensions.width - arrowWidth) / 2
        arrowStyles.left = 'auto'
      }
    }
    if (positioning.side === 'left' || positioning.side === 'right') {
      if (positioning.align === 'start') {
        arrowStyles.top = (triggerDimensions.height - arrowWidth) / 2
      }

      if (positioning.align === 'end') {
        arrowStyles.top = 'auto'
        arrowStyles.bottom = (triggerDimensions.height - arrowWidth) / 2
      }
    }

    return {arrowStyles}
  }

  React.useEffect(() => {
    if (trigger) {
      const triggerDimensions = getTriggerDimensions({trigger})
      if (triggerDimensions) {
        const styles = getPositioningStyles({triggerDimensions})
        setPositioningStyles(styles)

        if (positioning.arrow) {
          const {arrowStyles} = getArrowStyles({
            triggerDimensions
          })
          setArrowStyles(arrowStyles)
        }
      }
    }
  }, [trigger])

  return {positioningStyles, arrowStyles}
}

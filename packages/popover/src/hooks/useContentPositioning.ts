import {type CSSUnit, getEnvironmentName} from '@interunit/config'
import {platformCSSUnitTranslation} from '@interunit/crossplatform'
import {type P} from '@interunit/primitives'
import React from 'react'
import { type WithRequired } from '@interunit/toolbox'

const ENVIRONMENT = getEnvironmentName()

type Dimensions = {
  x: number
  y: number
  width: number
  height: number
}

type PrimitiveBoxProps = React.ComponentProps<typeof P.BX>
type PrimitiveBoxPropsStyle = WithRequired<PrimitiveBoxProps, 'style'>['style']

export type PopoverPositioning = Omit<PrimitiveBoxProps, 'el'> & {
  side?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'center' | 'end'
  offset?: CSSUnit
  width?: 'trigger' | CSSUnit
  maxWidth?: CSSUnit
  zIndex?: number
}

export type PopoverArrow = Omit<PrimitiveBoxProps, 'el'> & {
  width?: CSSUnit
  borderRadius?: CSSUnit
  strokeWidth?: CSSUnit
  strokeColor?: string
  fillColor?: string
}

export const useContentPositioning = ({
  trigger,
  positioning: _positioning,
  arrow: _arrow
}: {
  trigger: React.ReactElement | undefined | null
  positioning: PopoverPositioning | undefined
  arrow: PopoverArrow | undefined
}) => {
  const positioning = React.useMemo(() => {
    return {
      offset: 0,
      ..._positioning
    }
  }, [_positioning])

  const arrow = React.useMemo(() => {
    return {
      strokeWidth: 0,
      ..._arrow
    }
  }, [_arrow])

  const [arrowStyles, setArrowStyles] = React.useState<PopoverArrow['style']>(
    {}
  )

  const [positioningStyles, setPositioningStyles] = React.useState<
    PopoverPositioning['style']
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

    const offset = platformCSSUnitTranslation(
      positioning.offset,
      'native'
    ) as number

    if (positioning.side === 'top') {
      styles.bottom = triggerDimensions.height + offset
    }

    if (positioning.side === 'bottom') {
      styles.top = triggerDimensions.height + offset
    }

    if (positioning.side === 'left') {
      styles.right = triggerDimensions.width + offset
      styles.top = 0
    }

    if (positioning.side === 'right') {
      styles.left = triggerDimensions.width + offset
      styles.top = 0
    }

    if (positioning.side === 'top' || positioning.side === 'bottom') {
      if (positioning.align === 'start') {
        styles.left = 0
      }
      if (positioning.align === 'center') {
        styles.left = '50%'
        styles.transform = 'translateX(-50%)'
      }

      if (positioning.align === 'end') {
        styles.right = 0
      }
    }

    if (positioning.side === 'left' || positioning.side === 'right') {
      if (positioning.align === 'start') {
        styles.top = 0
      }

      if (positioning.align === 'center') {
        styles.top = '50%'
        styles.transform = 'translateY(-50%)'
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
    const arrowWidth =
      ((arrow?.width &&
        platformCSSUnitTranslation(arrow?.width, 'native')) as number) ||
      DEFAULT_ARROW_WIDTH
    const arrowStrokeWidth =
      (arrow?.strokeWidth &&
        platformCSSUnitTranslation(arrow?.strokeWidth, 'native')) ||
      DEFAULT_ARROW_STROKE_WIDTH

    const arrowStyles: PrimitiveBoxPropsStyle = {
      height: `${arrowWidth}px`,
      width: `${arrowWidth}px`,
      position: 'absolute',
      borderColor: arrow?.strokeColor || 'transparent',
      backgroundColor: arrow?.fillColor || 'transparent',
      borderWidth: `${arrowStrokeWidth}px`,
      borderStyle: 'solid',
      borderTopLeftRadius: arrow?.borderRadius || 0,
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

      if (positioning.align === 'center') {
        arrowStyles.left = '0'
        arrowStyles.right = '0'
        arrowStyles.marginLeft = 'auto'
        arrowStyles.marginRight = 'auto'
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

      if (positioning.align === 'center') {
        arrowStyles.top = '0'
        arrowStyles.bottom = '0'
        arrowStyles.marginTop = 'auto'
        arrowStyles.marginBottom = 'auto'
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

        if (arrow) {
          const {arrowStyles} = getArrowStyles({
            triggerDimensions
          })
          setArrowStyles(arrowStyles)
        }
      }
    }
  }, [trigger, positioning])

  return {positioningStyles, arrowStyles}
}

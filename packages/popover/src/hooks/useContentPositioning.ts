// TODO: This file needs some love
import {type CSSUnit, getEnvironmentName} from '@interunit/config'
import {platformCSSUnitTranslation} from '@interunit/crossplatform'
import {type Primitive} from '@interunit/primitives'
import {type WithRequired} from '@interunit/toolbox'
import React from 'react'

const ENVIRONMENT = getEnvironmentName()

type Dimensions = {
  x: number
  y: number
  width: number
  height: number
}

type PrimitiveBoxProps = React.ComponentProps<typeof Primitive.Box>
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
  size?: CSSUnit
  borderRadius?: CSSUnit
  strokeWidth?: CSSUnit
  strokeColor?: string
  fillColor?: string
}

export const useContentPositioning = ({
  trigger,
  content,
  positioning: _positioning,
  arrow: _arrow,
  nativeTriggerDimensions,
  nativeContentDimensions,
  nativePopoverDimensions
}: {
  trigger: React.ReactElement | undefined | null
  content: React.ReactElement | undefined | null
  positioning: PopoverPositioning | undefined
  arrow: PopoverArrow | undefined
  nativeTriggerDimensions: Dimensions | undefined
  nativeContentDimensions: Dimensions | undefined
  nativePopoverDimensions: Dimensions | undefined
}) => {
  const positioning = React.useMemo<PopoverPositioning>(() => {
    return {
      offset: 0,
      ..._positioning
    }
  }, [_positioning])

  const arrow = React.useMemo<PopoverArrow>(() => {
    return {
      strokeWidth: 0,
      ..._arrow
    }
  }, [_arrow])

  const [arrowStyles, setArrowStyles] = React.useState<React.CSSProperties>({})

  const [positioningStyles, setPositioningStyles] =
    React.useState<React.CSSProperties>({})

  const getDimensions = ({
    ref,
    nativeDimensions
  }: {
    ref: React.ReactElement | undefined | null
    nativeDimensions: Dimensions | undefined
  }) => {
    if (!ref) return
    if (ENVIRONMENT === 'web') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!ref?.getBoundingClientRect) return

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const clientRect = ref.getBoundingClientRect()

      const dimensions = {
        x: clientRect.x,
        y: clientRect.y,
        width: clientRect.width,
        height: clientRect.height
      }

      return dimensions
    }

    if (ENVIRONMENT === 'native') {
      return nativeDimensions
    }
  }

  const getPositioningStyles = ({
    triggerDimensions,
    contentDimensions,
    popoverDimensions
  }: {
    triggerDimensions: Dimensions
    contentDimensions: Dimensions | undefined
    popoverDimensions: Dimensions | undefined
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
      positioning.offset ?? 0,
      'native'
    ) as number

    if (positioning.side === 'top') {
      styles.bottom = triggerDimensions.height + offset + 'px'
    }

    if (positioning.side === 'bottom') {
      styles.top = `${(popoverDimensions?.height ?? 0) + offset}px`
    }

    if (positioning.side === 'left') {
      styles.right = `${triggerDimensions.width + offset}px`
      styles.top = 0 + 'px'
    }

    if (positioning.side === 'right') {
      styles.left = `${triggerDimensions.width + offset}px`
      styles.top = 0 + 'px'
    }

    if (positioning.side === 'top' || positioning.side === 'bottom') {
      if (positioning.align === 'start') {
        styles.left = 0 + 'px'
      }
      if (positioning.align === 'center') {
        if (ENVIRONMENT === 'native' && contentDimensions) {
          styles.left =
            (triggerDimensions.width - contentDimensions.width) / 2 + 'px'
        }
        if (ENVIRONMENT === 'web') {
          styles.left = '50%'
          styles.transform = 'translateX(-50%)'
        }
      }

      if (positioning.align === 'end') {
        styles.right = 0 + 'px'
      }
    }

    if (positioning.side === 'left' || positioning.side === 'right') {
      if (positioning.align === 'start') {
        styles.top = 0 + 'px'
      }

      if (positioning.align === 'center') {
        if (ENVIRONMENT === 'native' && contentDimensions) {
          styles.top =
            (triggerDimensions.height - contentDimensions.height) / 2 + 'px'
        }
        if (ENVIRONMENT === 'web') {
          styles.top = '50%'
          styles.transform = 'translateY(-50%)'
        }
      }
      if (positioning.align === 'end') {
        styles.top = 'auto'
        styles.bottom = 0 + 'px'
      }
    }

    return styles
  }

  const getArrowStyles = ({
    triggerDimensions,
    contentDimensions
  }: {
    triggerDimensions: Dimensions
    contentDimensions: Dimensions | undefined
  }) => {
    const DEFAULT_ARROW_WIDTH = 5
    const DEFAULT_ARROW_STROKE_WIDTH = 0
    const arrowWidth =
      ((arrow?.size &&
        platformCSSUnitTranslation(arrow?.size, 'native')) as number) ||
      DEFAULT_ARROW_WIDTH
    const arrowStrokeWidth =
      (arrow?.strokeWidth &&
        (platformCSSUnitTranslation(arrow?.strokeWidth, 'native') as number)) ||
      DEFAULT_ARROW_STROKE_WIDTH

    // TODO: make transform work properly with RN
    const rotate = (degree: string): any => {
      if (ENVIRONMENT === 'web') {
        return `rotate(${degree})`
      }
      if (ENVIRONMENT === 'native') {
        return [{rotate: degree}]
      }
    }

    const arrowStyles: PrimitiveBoxPropsStyle = {
      height: `${arrowWidth}px`,
      width: `${arrowWidth}px`,
      position: 'absolute',
      borderColor: arrow?.strokeColor || 'transparent',
      backgroundColor: arrow?.fillColor || 'transparent',
      borderWidth: arrowStrokeWidth,
      borderStyle: 'solid',
      borderTopLeftRadius: (arrow?.borderRadius as number) || 0,
      borderBottomWidth: 0,
      borderRightWidth: 0,
      transform: rotate('45deg'),
      zIndex: (positioning?.zIndex || 2) + 1
    }

    if (positioning.side === 'bottom') {
      arrowStyles.top = `${-(arrowWidth / 2)}px`
      arrowStyles.left = `${(triggerDimensions.width - arrowWidth) / 2}px`
    }
    if (positioning.side === 'top') {
      arrowStyles.bottom = -(arrowWidth / 2) + 'px'
      arrowStyles.left = (triggerDimensions.width - arrowWidth) / 2 + 'px'
      arrowStyles.transform = rotate('225deg')
    }

    if (positioning.side === 'left') {
      arrowStyles.right = -(arrowWidth / 2) + 'px'
      arrowStyles.top = (triggerDimensions.height - arrowWidth) / 2 + 'px'
      arrowStyles.transform = rotate('135deg')
    }

    if (positioning.side === 'right') {
      arrowStyles.left = -(arrowWidth / 2) + 'px'
      arrowStyles.top = (triggerDimensions.height - arrowWidth) / 2 + 'px'
      arrowStyles.transform = rotate('315deg')
    }

    if (positioning.side === 'top' || positioning.side === 'bottom') {
      if (positioning.align === 'start') {
        arrowStyles.left = (triggerDimensions.width - arrowWidth) / 2 + 'px'
      }

      if (positioning.align === 'center') {
        if (ENVIRONMENT === 'native' && contentDimensions) {
          arrowStyles.left = contentDimensions.width / 2 - arrowWidth / 2 + 'px'
        }
        if (ENVIRONMENT === 'web') {
          arrowStyles.left = 0 + 'px'
          arrowStyles.right = 0 + 'px'
          arrowStyles.margin = 'auto'
        }
      }
      if (positioning.align === 'end') {
        arrowStyles.right = (triggerDimensions.width - arrowWidth) / 2 + 'px'
        arrowStyles.left = 'auto'
      }
    }

    if (positioning.side === 'left' || positioning.side === 'right') {
      if (positioning.align === 'start') {
        arrowStyles.top = (triggerDimensions.height - arrowWidth) / 2 + 'px'
      }

      if (positioning.align === 'center') {
        if (ENVIRONMENT === 'native' && contentDimensions) {
          arrowStyles.top = contentDimensions.height / 2 - arrowWidth / 2 + 'px'
        }
        if (ENVIRONMENT === 'web') {
          arrowStyles.top = 0 + 'px'
          arrowStyles.bottom = 0 + 'px'
          arrowStyles.margin = 'auto'
        }
      }
      if (positioning.align === 'end') {
        arrowStyles.top = 'auto'
        arrowStyles.bottom = (triggerDimensions.height - arrowWidth) / 2 + 'px'
      }
    }
    return {arrowStyles}
  }

  React.useEffect(() => {
    if (trigger) {
      const triggerDimensions = getDimensions({
        ref: trigger,
        nativeDimensions: nativeTriggerDimensions
      })
      const contentDimensions = getDimensions({
        ref: content,
        nativeDimensions: nativeContentDimensions
      })
      if (triggerDimensions) {
        const styles = getPositioningStyles({
          triggerDimensions,
          contentDimensions,
          popoverDimensions: nativePopoverDimensions
        })
        // TODO: Need to figure why this is happening
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setPositioningStyles(styles)

        if (arrow) {
          const {arrowStyles} = getArrowStyles({
            triggerDimensions,
            contentDimensions
          })
          setArrowStyles(arrowStyles)
        }
      }
    }
  }, [
    trigger,
    positioning,
    nativeTriggerDimensions,
    nativeContentDimensions,
    nativePopoverDimensions
  ])

  return {positioningStyles, arrowStyles}
}

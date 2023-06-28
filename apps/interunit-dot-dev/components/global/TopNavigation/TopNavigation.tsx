'use client'
import React from 'react';

import {ButtonPrimitive} from '@/components/primitives/ButtonPrimitive'
import {TextPrimitive} from '@/components/primitives/TextPrimitive'
import {useTheme} from '@interunit/config'
import {Popover} from '@interunit/popover'
import {Primitive} from '@interunit/primitives'

import {
  NavigationList,
  NavigationListItem,
  NavigationListItemPopoverContent
} from './TopNavigation.styled'

// Change To Image Primitive

const TopNavigation = () => {
  const theme = useTheme()
  const [ isDocsMenuOpen, setIsDocsMenuOpen ] = React.useState(false)
  return (
    <Primitive.Box
      as="div"
      sp={{p: [0, 2]}}
      flx={{dir: 'x', ai: 'center', jc: 'space-between'}}
      bg={{c: theme?.color.background.primary}}
      bdr={{c: theme?.color.border.primary, w: [0, 0, 1, 0]}}
    >
      <Primitive.Box
        as="div"
        flx={{dir: 'x', ai: 'center', gp: 0.75}}
        sp={{p: [1, 0]}}
      >
        <Primitive.Image src="/interunit-logo.svg" alt="logo" sz={{w: 40}} />
        <TextPrimitive as="span" variation="lg">
          InterUnit
        </TextPrimitive>
      </Primitive.Box>
      <Primitive.Box as="div" flx={{dir: 'x', ai: 'center', gp: 0.75}}>
        <NavigationList>
          <NavigationListItem>
            <Popover
            onPopoverStateChange={(state: { isOpen: boolean}) => setIsDocsMenuOpen(state?.isOpen)}
              popoverPositioning={{
                placement: 'bottom-end',
                offset: 16,
                arrow: {
                  tipRadius: 2,
                  stroke: theme?.color.border.primary,
                  strokeWidth: 1,
                  fill: theme?.color.background.primary
                }
              }}
            >
              <Popover.Trigger>
                <ButtonPrimitive variation="md" intent="page" active={isDocsMenuOpen}>
                  <TextPrimitive as="span">Docs</TextPrimitive>
                </ButtonPrimitive>
              </Popover.Trigger>
              <Popover.Content>
                <NavigationListItemPopoverContent>
                  yoo
                </NavigationListItemPopoverContent>
              </Popover.Content>
            </Popover>
          </NavigationListItem>
          <NavigationListItem></NavigationListItem>
        </NavigationList>
      </Primitive.Box>
    </Primitive.Box>
  )
}

export {TopNavigation}

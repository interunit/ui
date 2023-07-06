import styled, {css} from 'styled-components'

import {Primitive} from '@/components/primitives'
import {Button, ButtonAnchor} from '@/components/system/Button'
import {mq} from '@interunit/responsive'

export const NavigationContainer = styled(Primitive.Box)`
  background-color: ${props => props.theme.color.background.primary};
  border-bottom: 1px solid ${props => props.theme.color.border.primary};
  height: 100%;

  & .iu-popover-arrow {
    fill: ${props => props.theme.color.background.primary};
  }

  ${props => mq(props.theme.breakpoint.large)`
    padding: 1rem;
    border-right: 1px solid ${props.theme.color.border.primary};
    border-bottom: none;
    position: relative;
  `}
`

export const ListContainer = styled(Primitive.Box)`
  left: 0;
  padding: 1rem;
  position: sticky;
  top: 1rem;
`

export const List = styled(Primitive.Box)`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin-left: 0;

  & ul {
    margin-left: 1rem;
  }
`

export const ListItem = styled(Primitive.Box)``

export const ListButtonAnchor = styled(ButtonAnchor)<{$active: boolean}>`
  margin-bottom: 0.5rem;
  ${props =>
    !props.$active &&
    css`
      &:not(:hover) {
        background: transparent;
      }
    `}
`

export const MenuButton = styled(Button)`
  display: block;
  margin: 1rem;

  ${props => mq(props.theme.breakpoint.large)`
      display: none;
      `}
`

export const NavigationPopover = styled(Primitive.Box)`
  align-items: stretch;
  background-color: ${props => props.theme.color.background.primary};
  border-color: ${props => props.theme.color.border.primary};
  border-radius: ${props => props.theme.border.radius.primary}px;
  border-radius: ${props => props.theme.border.radius.primary}px;
  border-style: solid;
  border-width: ${props => props.theme.border.width.primary}px;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  overflow-y: auto;
  padding: 0;
  width: calc(100vw - 2rem);
`

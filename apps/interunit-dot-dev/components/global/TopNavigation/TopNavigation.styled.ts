import Link from 'next/link'

import {styled} from '@interunit/config'
import {Primitive} from '@interunit/primitives'

export const Logo = styled(Primitive.Image)`
  max-width: 60px;
  transition: 0.3s ease-in-out;
  width: 100%;

  &:hover {
    rotate: 360deg;
  }

  @media (prefers-reduced-motion) {
    &:hover {
      rotate: 0deg;
    }
  }
`

export const NavigationList = styled(Primitive.Box).attrs({as: 'ul'})`
  align-items: center;
  display: flex;
  list-style: none;
  gap: 0.25rem;
  margin: 0;
`
export const NavigationListItem = styled(Primitive.Box).attrs({as: 'li'})`
  & .iu-popover-arrow {
    fill: ${props => props.theme.color.background.primary};
    transition: fill 0.3s ease-in-out;
  }
  &:has(.iu-popover-content .nav-popover-list-link:first-child:hover) {
    & .iu-popover-arrow {
      fill: ${props => props.theme.color.background.muted};
    }
  }
`

export const NavigationListLink = styled(Link)`
  &:hover,
  &:focus {
    text-decoration: none !important;
  }
  & > span {
    align-items: center;
    display: flex;
    border-radius: ${props => props.theme?.border.radius.primary}px;
    justify-content: center;
    padding: 1rem;
    &:hover {
      background-color: ${props => props.theme.color.background.muted};
      text-decoration: none;
    }
  }
`

export const NavigationListButton = styled(Primitive.Button).attrs({
  as: 'button'
})`
  appearance: none;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover,
  &:focus {
    text-decoration: none !important;
  }
  & > span {
    border-radius: ${props => props.theme?.border.radius.primary}px;
    padding: 1rem;
    &:hover {
      background-color: ${props => props.theme.color.background.muted};
      text-decoration: none;
    }
  }
`

export const NavigationListItemPopoverContent = styled(Primitive.Box).attrs({
  as: 'div'
})`
  align-items: stretch;
  flex-direction: column;
  gap: 1rem;
  background-color: ${props => props.theme.color.background.primary};
  border-color: ${props => props.theme.color.border.primary};
  border-radius: ${props => props.theme.border.radius.primary}px;
  border-style: solid;
  border-width: ${props => props.theme.border.width.primary}px;
  border-radius: ${props => props.theme.border.radius.primary}px;

  & * a:hover {
    text-decoration: none;
  }
`
export const NavigationPopoverSection = styled(Primitive.Box).attrs({
  as: 'section'
})`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.5rem;
`
export const NavigationPopoverList = styled(Primitive.Box).attrs({as: 'ul'})`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
export const NavigationPopoverListItem = styled(Primitive.Box).attrs({
  as: 'li'
})``

export const NavigationPopoverListLink = styled(Link)`
  display: flex;
  flex-direction: column;

  &:hover,
  &:focus {
    text-decoration: none !important;
  }
  & > section {
    border-color: ${props => props.theme.color.border.primary};
    border-width: 0 0 ${props => props.theme.border.width.primary}px 0;
    border-style: solid;
    padding: 1.5rem;
    transition: background-color 0.3s ease-in-out;

    &:hover,
    &:focus {
      background-color: ${props => props.theme.color.background.muted};
      text-decoration: none;
    }
  }

  &:first-child > section {
    border-radius: ${props => props.theme.border.radius.primary - 1}px
      ${props => props.theme.border.radius.primary - 1}px 0 0;
  }

  &:last-child > section {
    border-radius: 0 0 ${props => props.theme.border.radius.primary - 1}px
      ${props => props.theme.border.radius.primary - 1}px;
    border-bottom: none;
  }
`

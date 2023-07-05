import Link from 'next/link'
import {styled} from 'styled-components'

import {Primitive} from '@/components/primitives'

export const Logo = styled(Primitive.Image).attrs({as: 'img'})`
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
  margin: 0 0.5rem 0 0;
`
export const NavigationSecondaryList = styled(Primitive.Box).attrs({as: 'ul'})`
  align-items: center;
  display: flex;
  list-style: none;
  margin: 0;
`
export const NavigationListItem = styled(Primitive.Box).attrs({as: 'li'})`
  & .iu-popover-arrow {
    fill: ${props => props.theme.color.background.primary};
    transition: fill 0.3s ease-in-out;
  }
  &:has(.iu-popover-content .nav-popover-li:first-child:hover) {
    & .iu-popover-arrow {
      fill: ${props => props.theme.color.background.muted};
    }
  }
`

export const NavigationListLink = styled(Link)`
  display: inline-block;
  &:hover,
  &:focus {
    text-decoration: none !important;
  }
  & > span {
    align-items: center;
    border-radius: ${props => props.theme.border.radius.primary}px;
    display: flex;
    justify-content: center;
    padding: 1rem;
    &:hover {
      background-color: ${props => props.theme.color.background.muted};
      text-decoration: none;
    }
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
  align-items: stretch;
  flex-direction: column;
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
export const NavigationPopoverListItem = styled(Primitive.Box).attrs({
  as: 'li'
})`
  &:first-child section {
    border-radius: ${props => props.theme.border.radius.primary - 1}px
      ${props => props.theme.border.radius.primary - 1}px 0 0;
  }
  &:last-child section {
    border-radius: 0 0 ${props => props.theme.border.radius.primary - 1}px
      ${props => props.theme.border.radius.primary - 1}px;
    border-bottom: none;
  }
`

export const NavigationPopoverListLink = styled(Link)`
  display: flex;
  flex-direction: column;

  &:hover,
  &:focus {
    text-decoration: none !important;
  }
  & > section {
    border-color: ${props => props.theme.color.border.primary};
    border-style: solid;
    border-width: 0 0 ${props => props.theme.border.width.primary}px 0;
    padding: 1.5rem;
    transition: background-color 0.3s ease-in-out;

    &:hover,
    &:focus {
      background-color: ${props => props.theme.color.background.muted};
      text-decoration: none;
    }
  }
`

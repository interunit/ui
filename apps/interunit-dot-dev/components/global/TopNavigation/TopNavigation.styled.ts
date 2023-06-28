import {styled} from '@interunit/config'
import {Primitive} from '@interunit/primitives'

export const NavigationList = styled(Primitive.Box).attrs({as: 'ul'})`
  list-style: none;
  margin: 0;
`
export const NavigationListItem = styled(Primitive.Box).attrs({as: 'li'})``


export const NavigationListItemPopoverContent = styled(Primitive.Box).attrs({
  as: 'div'
})`
  background-color: ${props => props.theme.color.background.primary};
  border: 1px solid ${props => props.theme.color.border.primary};
  border-radius: 8px;
  padding: 2rem;
`

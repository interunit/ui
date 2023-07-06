import React from 'react'
import styled from 'styled-components'

import {TextInput as TextInputLib} from '@interunit/form'

type TextInputProps = React.ComponentPropsWithoutRef<typeof TextInputLib>
type TextInputStyledProps = React.ComponentPropsWithoutRef<typeof TextInputLib>
type TextInputRef = React.ElementRef<typeof TextInputLib>

const StyledTextInput = styled(TextInputLib)<TextInputStyledProps>`
  appearance: none;
  border: 1px solid ${props => props?.theme?.color?.border?.primary};
  border-radius: ${props => props.theme.border.radius.primary}px;
  font-size: 16px;
  padding: 0.75rem 1rem;
  width: 100%;

  &:focus-visible {
    outline: 2px solid ${props => props?.theme?.color?.outline?.primary};
    outline-offset: 0;
  }
`

const TextInput = React.forwardRef<TextInputRef, TextInputProps>(
  ({...props}, forwardedRef) => {
    return <StyledTextInput {...props} ref={forwardedRef} />
  }
)

export {TextInput}

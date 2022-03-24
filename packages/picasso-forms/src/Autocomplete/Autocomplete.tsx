import React from 'react'
import {
  Autocomplete as PicassoAutocomplete,
  AutocompleteProps
} from '@toptal/picasso'

import { FieldProps } from '../FieldWrapper'
import FieldLabel from '../FieldLabel'
import InputFieldWrapper from '../InputFieldWrapper'

export type Props = AutocompleteProps & FieldProps<AutocompleteProps['value']>

export const Autocomplete = (props: Props) => {
  const { label, titleCase, ...rest } = props

  return (
    <InputFieldWrapper<AutocompleteProps>
      {...rest}
      label={
        label ? (
          <FieldLabel
            name={props.name}
            required={props.required}
            label={label}
            titleCase={titleCase}
          />
        ) : null
      }
    >
      {(inputProps: AutocompleteProps) => {
        return <PicassoAutocomplete {...inputProps} />
      }}
    </InputFieldWrapper>
  )
}

Autocomplete.displayName = 'Autocomplete'

export default Autocomplete

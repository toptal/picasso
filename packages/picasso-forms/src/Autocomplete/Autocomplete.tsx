import React from 'react'
import {
  Autocomplete as PicassoAutocomplete,
  AutocompleteProps
} from '@toptal/picasso'

import { FieldProps } from '../FieldWrapper'
import FieldLabel from '../FieldLabel'
import InputFieldWrapper from '../InputFieldWrapper'

export type Props = AutocompleteProps & FieldProps<AutocompleteProps['value']>

export const Autocomplete = (props: Props) => (
  <InputFieldWrapper<AutocompleteProps>
    {...props}
    label={
      props.label ? (
        <FieldLabel
          id={props.id}
          required={props.required}
          label={props.label}
          titleCase={props.titleCase}
        />
      ) : null
    }
  >
    {(inputProps: AutocompleteProps) => {
      return <PicassoAutocomplete {...inputProps} />
    }}
  </InputFieldWrapper>
)

Autocomplete.displayName = 'Autocomplete'

export default Autocomplete

import React from 'react'
import {
  Autocomplete as PicassoAutocomplete,
  AutocompleteProps
} from '@toptal/picasso'

import { FieldProps } from '../FieldWrapper'
import InputFieldWrapper from '../InputFieldWrapper'

export type Props = AutocompleteProps & FieldProps<AutocompleteProps['value']>

export const Autocomplete = (props: Props) => (
  <InputFieldWrapper<AutocompleteProps> {...props}>
    {(inputProps: AutocompleteProps) => {
      return <PicassoAutocomplete {...inputProps} />
    }}
  </InputFieldWrapper>
)

Autocomplete.displayName = 'Autocomplete'

export default Autocomplete

import React from 'react'
import {
  Autocomplete as PicassoAutocomplete,
  AutocompleteProps
} from '@toptal/picasso'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = AutocompleteProps & FieldProps<AutocompleteProps['value']>

export const Autocomplete = (props: Props) => (
  <FieldWrapper<AutocompleteProps> {...props}>
    {(inputProps: AutocompleteProps) => {
      return <PicassoAutocomplete {...inputProps} />
    }}
  </FieldWrapper>
)

Autocomplete.displayName = 'Autocomplete'

export default Autocomplete

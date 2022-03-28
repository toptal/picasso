import React from 'react'
import {
  Autocomplete as PicassoAutocomplete,
  AutocompleteProps
} from '@toptal/picasso'

import { FieldProps } from '../Field'
import FieldLabel from '../FieldLabel'
import InputField from '../InputField'

export type Props = AutocompleteProps & FieldProps<AutocompleteProps['value']>

export const Autocomplete = (props: Props) => {
  const { label, titleCase, ...rest } = props

  return (
    <InputField<AutocompleteProps>
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
    </InputField>
  )
}

Autocomplete.displayName = 'Autocomplete'

export default Autocomplete

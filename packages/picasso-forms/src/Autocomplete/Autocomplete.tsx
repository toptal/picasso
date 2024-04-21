import React from 'react'
import type { AutocompleteProps } from '@toptal/picasso-autocomplete'
import { Autocomplete as PicassoAutocomplete } from '@toptal/picasso-autocomplete'

import type { FieldProps } from '../Field'
import type { Props as FieldLabelProps } from '../FieldLabel'
import FieldLabel from '../FieldLabel'
import InputField from '../InputField'

export type Props = AutocompleteProps &
  FieldProps<AutocompleteProps['value']> &
  FieldLabelProps

export const Autocomplete = (props: Props) => {
  const { label, labelEndAdornment, titleCase, ...rest } = props

  return (
    <InputField<AutocompleteProps>
      {...rest}
      label={
        label ? (
          <FieldLabel
            name={props.name}
            required={props.required}
            label={label}
            labelEndAdornment={labelEndAdornment}
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

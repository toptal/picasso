import React from 'react'
import {
  Autocomplete as PicassoAutocomplete,
  AutocompleteProps,
  AutocompleteItem
} from '@toptal/picasso'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type FormAutocompleteProps = Omit<
  AutocompleteProps,
  'onChange' | 'value' | 'classes'
> & {
  onInputChange?: AutocompleteProps['onChange']
} & { onChange?: AutocompleteProps['onSelect']; value?: AutocompleteItem }
export type Props = FormAutocompleteProps &
  FieldProps<AutocompleteItem | undefined>

export const Autocomplete = (props: Props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <FieldWrapper<FormAutocompleteProps> {...props}>
    {(inputProps: FormAutocompleteProps) => {
      const {
        getDisplayValue,
        value,
        onChange,
        onInputChange,
        ...rest
      } = inputProps
      return (
        <PicassoAutocomplete
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
          onSelect={onChange}
          value={getDisplayValue?.(value || null) || value?.text || ''}
          onChange={(newInputValue, changeOptions) => {
            onInputChange?.(newInputValue, changeOptions)
            onChange?.({ text: newInputValue })
          }}
        />
      )
    }}
  </FieldWrapper>
)

Autocomplete.defaultProps = {}

Autocomplete.displayName = 'Autocomplete'

export default Autocomplete

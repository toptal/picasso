import React from 'react'
import { Autocomplete as PicassoAutocomplete } from '@toptal/picasso'
import { Props as AutocompleteProps, Item } from '@toptal/picasso/Autocomplete'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type FormAutocompleteProps = Omit<
  AutocompleteProps,
  'onChange' | 'value'
> & {
  onInputChange?: AutocompleteProps['onChange']
} & { onChange?: AutocompleteProps['onSelect']; value?: Item }
export type Props = FormAutocompleteProps & FieldProps<Item | undefined>

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
          onSelect={onChange}
          value={getDisplayValue?.(value || null) || value?.text || ''}
          onChange={(newInputValue, changeOptions) => {
            onInputChange?.(newInputValue, changeOptions)
            onChange?.({ text: newInputValue })
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
        />
      )
    }}
  </FieldWrapper>
)

Autocomplete.defaultProps = {}

Autocomplete.displayName = 'Autocomplete'

export default Autocomplete

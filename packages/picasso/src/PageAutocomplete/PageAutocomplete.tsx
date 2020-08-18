import React from 'react'

import Autocomplete, { AutocompleteProps } from '../Autocomplete'

export interface Props extends AutocompleteProps {
  /** The variant to use */
  variant?: 'light' | 'dark'
}

export const PageAutocomplete = ({ variant, ...rest }: Props) => (
  <Autocomplete
    inputProps={{
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      variant: variant!
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
  />
)

PageAutocomplete.displayName = 'PageAutocomplete'

PageAutocomplete.defaultProps = {
  variant: 'dark'
}

export default PageAutocomplete

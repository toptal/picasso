import React from 'react'

import Autocomplete, { AutocompleteProps } from '../Autocomplete'

export interface Props extends AutocompleteProps {
  /** The variant to use */
  variant?: 'light' | 'dark'
  testIds?: AutocompleteProps['testIds']
}

export const PageAutocomplete = ({ variant, testIds, ...rest }: Props) => (
  <Autocomplete
    inputProps={{
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      variant: variant!
    }}
    testIds={testIds}
    {...rest}
  />
)

PageAutocomplete.displayName = 'PageAutocomplete'

PageAutocomplete.defaultProps = {
  variant: 'dark'
}

export default PageAutocomplete

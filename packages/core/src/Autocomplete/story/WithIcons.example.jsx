import React from 'react'
import { Afternoon16, Autocomplete } from '@toptal/picasso'

const AutocompleteIconsExample = () => (
  <div>
    <Autocomplete
      icon={<Afternoon16 />}
      placeholder='This is autocomplete input with icon...'
      value=''
    />
  </div>
)

export default AutocompleteIconsExample

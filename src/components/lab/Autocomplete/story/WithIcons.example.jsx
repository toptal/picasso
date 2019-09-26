import React from 'react'
import { Autocomplete } from '@toptal/picasso/lab'
import { Afternoon16 } from '@toptal/picasso'

const AutocompleteIconsExample = () => (
  <div>
    <Autocomplete
      icon={<Afternoon16 />}
      placeholder='This is autocomplete input with icon...'
    />
  </div>
)

export default AutocompleteIconsExample

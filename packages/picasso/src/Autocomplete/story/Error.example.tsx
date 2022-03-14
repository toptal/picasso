import React from 'react'
import { Autocomplete } from '@toptal/picasso'

const Example = () => (
  <div>
    <Autocomplete
      validateStatus='error'
      placeholder='Error input...'
      value=''
    />
  </div>
)

export default Example

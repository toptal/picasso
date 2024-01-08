import React from 'react'
import { Autocomplete, BankWire16, Globe16 } from '@toptal/picasso'

const Example = () => (
  <div>
    <Autocomplete
      placeholder='Autocomplete with icon...'
      value=''
      startAdornment={<Globe16 />}
      endAdornment={<BankWire16 />}
    />
  </div>
)

export default Example

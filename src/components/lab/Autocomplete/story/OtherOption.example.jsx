import React, { useState } from 'react'
import { Autocomplete } from '@toptal/picasso/lab'

const options = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' }
]

const AutocompleteOtherOptionExample = () => {
  const [value, setValue] = useState('')

  return (
    <div>
      <Autocomplete
        value={value}
        showOtherOption
        placeholder='Start typing country...'
        options={options}
        onSelect={item => console.log('onSelect value:', item)}
        onOtherOptionSelect={item =>
          console.log('onOtherOptionSelect value:', item)
        }
        onChange={value => {
          console.log('onChange value:', value)
          setValue(value)
        }}
      />
    </div>
  )
}

export default AutocompleteOtherOptionExample
